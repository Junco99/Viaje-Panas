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
  
  log(`🔍 Solicitando vuelos para ${destination} (${period})`, 'info');
  
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
    log(`📊 Búsquedas este mes: ${monthlySearchCount}/${MAX_MONTHLY_SEARCHES}`, 'info');
    
    // Llamar a SerpAPI
    const serpUrl = `https://serpapi.com/search.json?engine=google_flights&departure_id=MAD&arrival_id=${iataCode}&outbound_date=${dates.outbound}&return_date=${dates.return}&currency=EUR&hl=es&gl=es&adults=1&api_key=${SERPAPI_KEY}`;
    
    log(`🌐 Consultando SerpAPI...`, 'info');
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
      const firstLeg = flight.flights[0];
      const lastLeg = flight.flights[flight.flights.length - 1];
      
      return {
        id: `serp_${destination}_${period}_${index}`,
        price: `€${flight.price}`,
        priceNumeric: flight.price,
        airline: {
          name: firstLeg.airline || 'Aerolínea',
          code: firstLeg.airline_logo ? firstLeg.airline.substring(0, 2).toUpperCase() : 'XX',
          logo: firstLeg.airline_logo
        },
        departure: firstLeg.departure_airport.time,
        arrival: lastLeg.arrival_airport.time,
        duration: formatDuration(flight.duration),
        durationMinutes: flight.duration,
        stops: flight.layovers ? flight.layovers.length : 0,
        stopsText: flight.layovers && flight.layovers.length > 0 
          ? `${flight.layovers.length} escala${flight.layovers.length > 1 ? 's' : ''}${flight.layovers[0]?.name ? ' · ' + flight.layovers[0].name : ''}`
          : 'Directo',
        stopoverCity: flight.layovers && flight.layovers[0] ? flight.layovers[0].name : '',
        originAirport: 'MAD',
        destAirport: iataCode,
        carbonEmissions: flight.carbon_emissions?.this_flight || 0,
        bookingUrl: `https://www.google.com/travel/flights`,
        scraped: true,
        source: 'serpapi',
        scrapedAt: new Date().toISOString()
      };
    });
    
    log(`✅ ${flights.length} vuelos obtenidos de SerpAPI`, 'success');
    
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
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Obtener datos mock como fallback
function getMockFlightData(destination) {
  const mockPrices = {
    'albania': { base: 125, airline: 'Wizz Air', duration: 135, iata: 'TIA' },
    'georgia': { base: 289, airline: 'Turkish Airlines', duration: 390, iata: 'TBS' },
    'serbia': { base: 98, airline: 'Air Serbia', duration: 165, iata: 'BEG' },
    'malta': { base: 145, airline: 'Ryanair', duration: 150, iata: 'MLA' },
    'norway': { base: 234, airline: 'SAS', duration: 165, iata: 'BGO' }
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
        bookingUrl: `https://www.kiwi.com/es/search/results/madrid-espana/${destination}/2026-08-05/2026-08-09/`,
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
        bookingUrl: `https://www.kiwi.com/es/search/results/madrid-espana/${destination}/2026-08-05/2026-08-09/`,
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
        bookingUrl: `https://www.kiwi.com/es/search/results/madrid-espana/${destination}/2026-08-05/2026-08-09/`,
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