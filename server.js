const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001; // Cambio a puerto 3001

// ============================================
// CONFIGURACIÓN SERPAPI (Vuelos reales)
// ============================================
const SERPAPI_KEY = 'e82b214fc0f08ed8715317c6a8c60ad421ed438a7b6e84df2a80bc5205973464'; // 👈 PON TU KEY AQUÍ
let monthlySearchCount = 0;
const MAX_MONTHLY_SEARCHES = 95; // Límite de seguridad (100 gratis - 5 de margen)

// ============================================
// RATE LIMITING MOCK (Simple implementation)
// ============================================
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 30;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];

  // Clean old requests
  const recentRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    log(`🚫 Rate limit alcanzado para IP: ${ip}`, 'warning');
    return res.status(429).json({ error: 'Demasiadas peticiones. Inténtalo de nuevo en un minuto.' });
  }

  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  next();
};

// ============================================
// LOGGER
// ============================================
const log = (message, level = 'info') => {
  const timestamp = new Date().toISOString();
  const emoji = {
    'info': '📘',
    'success': '✅',
    'warning': '⚠️',
    'error': '❌'
  }[level] || 'ℹ️';

  console.log(`${emoji} [${timestamp}] ${message}`);
};

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());

// Basic security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.youtube.com https://www.tiktok.com;");
  next();
});

// Proteger archivos sensibles y servir estáticos
app.use((req, res, next) => {
  // Proteger archivos que empiezan por punto o el propio server.js
  const forbidden = ['.git', '.env', 'package.json', 'package-lock.json', 'server.js'];
  if (req.url.split('/').some(part => forbidden.includes(part) || part.startsWith('.'))) {
    log(`🛡️ Intento de acceso bloqueado: ${req.url}`, 'warning');
    return res.status(403).send('Acceso denegado');
  }
  next();
});

// Aplicar rate limiting a la API
app.use('/api/', rateLimiter);

app.use(express.static(path.join(__dirname)));

// ============================================
// RUTA PRINCIPAL: Servir el HTML
// ============================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// ENDPOINT: Health check
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    searchCount: monthlySearchCount,
    maxSearches: MAX_MONTHLY_SEARCHES,
    remaining: MAX_MONTHLY_SEARCHES - monthlySearchCount,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ENDPOINT: Obtener precios de vuelos REALES
// ============================================
app.get('/api/flights/:destination/:period', async (req, res) => {
  const { destination, period } = req.params;

  // Mapeo de destinos a códigos IATA
  const destCodes = {
    'albania': 'TIA',
    'georgia': 'TBS',
    'serbia': 'BEG',
    'malta': 'MLA',
    'norway': 'BGO'
  };

  // Mapeo de periodos a fechas
  const periodDates = {
    '5al9': { outbound: '2026-08-05', return: '2026-08-09' },
    '12al16': { outbound: '2026-08-12', return: '2026-08-16' },
    '19al23': { outbound: '2026-08-19', return: '2026-08-23' }
  };

  const iataCode = destCodes[destination];
  const dates = periodDates[period] || periodDates['5al9'];

  if (!iataCode) {
    log(`❌ Destino no válido: ${destination}`, 'error');
    return res.status(400).json({ error: 'Destino no válido' });
  }

  // PROTECCIÓN: Verificar límite mensual
  if (monthlySearchCount >= MAX_MONTHLY_SEARCHES) {
    log(`⚠️ Límite mensual alcanzado (${monthlySearchCount}/${MAX_MONTHLY_SEARCHES}). Usando datos mock.`, 'warning');
    return res.json(getMockFlightData(destination));
  }

  try {
    // Incrementar contador
    monthlySearchCount++;

    // Llamar a SerpAPI
    const serpUrl = `https://serpapi.com/search.json?engine=google_flights&departure_id=MAD&arrival_id=${iataCode}&outbound_date=${dates.outbound}&return_date=${dates.return}&currency=EUR&hl=es&gl=es&adults=1&type=1&api_key=${SERPAPI_KEY}`;

    const response = await fetch(serpUrl);

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Verificar si hay error en la respuesta
    if (data.error) {
      throw new Error(`SerpAPI error: ${data.error}`);
    }

    // Verificar si hay resultados
    if (!data.best_flights || data.best_flights.length === 0) {
      log(`⚠️ No se encontraron vuelos en SerpAPI, usando mock`, 'warning');
      monthlySearchCount--; // Revertir contador
      return res.json(getMockFlightData(destination));
    }

    // Formatear resultados para nuestro frontend
    const flights = data.best_flights.slice(0, 8).map((flight, index) => {
      // SerpAPI flatten segments in 'flights'. We need to split them by origin/destination.
      const segments = flight.flights;

      // Basic heuristic: the outbound leg ends when we reach the iataCode destination
      let outboundSegments = [];
      let returnSegments = [];
      let foundReturn = false;

      segments.forEach((seg, i) => {
        if (!foundReturn) {
          outboundSegments.push(seg);
          // If this segment arrives at our destination airport, the next one (if any) starts return
          if (seg.arrival_airport.id === iataCode) {
            foundReturn = true;
          }
        } else {
          returnSegments.push(seg);
        }
      });

      // Validations and fallbacks
      const firstOutbound = outboundSegments[0];
      const lastOutbound = outboundSegments[outboundSegments.length - 1];
      const firstReturn = returnSegments.length > 0 ? returnSegments[0] : null;
      const lastReturn = returnSegments.length > 0 ? returnSegments[returnSegments.length - 1] : null;

      return {
        id: `serp_${destination}_${period}_${index}`,
        price: `€${flight.price}`,
        priceNumeric: flight.price,
        airline: {
          name: firstOutbound.airline || 'Aerolínea',
          code: firstOutbound.airline ? firstOutbound.airline.substring(0, 2).toUpperCase() : 'XX',
          logo: firstOutbound.airline_logo
        },
        // Ida
        departure: firstOutbound.departure_airport.time,
        arrival: lastOutbound.arrival_airport.time,
        // Vuelta
        returnDeparture: firstReturn ? firstReturn.departure_airport.time : null,
        returnArrival: lastReturn ? lastReturn.arrival_airport.time : null,

        durationMinutes: parseInt(flight.total_duration || flight.duration) || 0,
        duration: formatDuration(flight.total_duration || flight.duration || 0),
        stops: flight.layovers ? flight.layovers.length : 0,
        stopsText: flight.layovers && flight.layovers.length > 0
          ? `${flight.layovers.length} escala${flight.layovers.length > 1 ? 's' : ''}`
          : 'Directo',
        originAirport: 'MAD',
        destAirport: iataCode,
        bookingUrl: `https://www.google.com/travel/flights?tfs=${flight.token || ''}&q=Flights%20to%20${iataCode}%20from%20MAD%20on%20${dates.outbound}%20through%20${dates.return}`,
        scraped: true,
        source: 'serpapi',
        scrapedAt: new Date().toISOString()
      };
    });

    res.json({
      flights: flights,
      source: 'serpapi',
      searchCount: monthlySearchCount,
      remaining: MAX_MONTHLY_SEARCHES - monthlySearchCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    log(`❌ Error consultando SerpAPI: ${error.message}`, 'error');
    monthlySearchCount--; // Revertir contador si falló

    // Fallback a datos mock
    log(`🎭 Usando datos mock como fallback`, 'info');
    res.json(getMockFlightData(destination));
  }
});

// ============================================
// HELPERS
// ============================================

// Formatear duración de minutos a "Xh Ym"
function formatDuration(minutes) {
  const mins = parseInt(minutes);
  if (isNaN(mins) || mins <= 0) return 'Vuelo';

  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  if (hours === 0) return `${remainingMins}m`;
  return `${hours}h ${remainingMins}m`;
}

// Obtener datos mock como fallback
function getMockFlightData(destination) {
  const mockPrices = {
    'albania': { base: 63, airline: 'Wizz Air', duration: 185, iata: 'TIA' },
    'georgia': { base: 225, airline: 'Turkish Airlines', duration: 330, iata: 'TBS' },
    'serbia': { base: 81, airline: 'Air Serbia', duration: 200, iata: 'BEG' },
    'malta': { base: 55, airline: 'Ryanair', duration: 150, iata: 'MLA' },
    'norway': { base: 185, airline: 'SAS', duration: 210, iata: 'BGO' }
  };

  const mock = mockPrices[destination] || mockPrices['albania'];

  return {
    flights: [
      {
        id: `mock_${destination}_1`,
        price: `€${mock.base}`,
        priceNumeric: mock.base,
        airline: { name: mock.airline, code: mock.airline.substring(0, 2) },
        departure: '09:30',
        arrival: '13:45',
        duration: formatDuration(mock.duration),
        durationMinutes: mock.duration,
        stops: 0,
        stopsText: 'Directo',
        originAirport: 'MAD',
        destAirport: mock.iata,
        bookingUrl: `https://www.google.com/travel/flights?q=Flights%20to%20${mock.iata}%20from%20MAD%20on%202026-08-05%20through%202026-08-09`,
        scraped: false,
        source: 'mock'
      },
      {
        id: `mock_${destination}_2`,
        price: `€${mock.base + 50}`,
        priceNumeric: mock.base + 50,
        airline: { name: 'Iberia', code: 'IB' },
        departure: '14:20',
        arrival: '18:35',
        duration: formatDuration(mock.duration + 30),
        durationMinutes: mock.duration + 30,
        stops: 1,
        stopsText: '1 escala',
        originAirport: 'MAD',
        destAirport: mock.iata,
        bookingUrl: `https://www.google.com/travel/flights?q=Flights%20to%20${mock.iata}%20from%20MAD%20on%202026-08-05%20through%202026-08-09`,
        scraped: false,
        source: 'mock'
      },
      {
        id: `mock_${destination}_3`,
        price: `€${mock.base + 80}`,
        priceNumeric: mock.base + 80,
        airline: { name: 'Lufthansa', code: 'LH' },
        departure: '17:00',
        arrival: '21:50',
        duration: formatDuration(mock.duration + 60),
        durationMinutes: mock.duration + 60,
        stops: 1,
        stopsText: '1 escala · Frankfurt',
        originAirport: 'MAD',
        destAirport: mock.iata,
        bookingUrl: `https://www.google.com/travel/flights?q=Flights%20to%20${mock.iata}%20from%20MAD%20on%202026-08-05%20through%202026-08-09`,
        scraped: false,
        source: 'mock'
      }
    ],
    source: 'mock',
    timestamp: new Date().toISOString()
  };
}

// ============================================
// SERVIDOR
// ============================================
app.listen(PORT, () => {
  log(`🚀 Servidor corriendo en http://localhost:${PORT}`, 'success');
  log(`📊 Límite mensual: ${MAX_MONTHLY_SEARCHES} búsquedas`, 'info');
  log(`🔑 API Key configurada: ${SERPAPI_KEY === 'e82b214fc0f08ed8715317c6a8c60ad421ed438a7b6e84df2a80bc5205973464' ? '❌ NO' : '✅ SÍ'}`,
    SERPAPI_KEY === 'e82b214fc0f08ed8715317c6a8c60ad421ed438a7b6e84df2a80bc5205973464' ? 'warning' : 'success');
});