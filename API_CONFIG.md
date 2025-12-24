# 🔧 Configuración de APIs - Panas 2026

Este archivo explica cómo configurar las APIs externas para obtener **imágenes reales**, **videos actualizados** y **precios de vuelos en tiempo real**.

## 📸 API de Pixabay (Imágenes)

### ¿Para qué sirve?
- Obtener imágenes reales y de alta calidad de destinos turísticos
- Reemplazar las imágenes estáticas por contenido dinámico
- Acceso a millones de fotos de viajes y turismo

### Configuración:

1. **Regístrate gratis en Pixabay**:
   - Ve a: https://pixabay.com/api/docs/
   - Crea una cuenta gratuita
   - Obtén tu clave API (gratuita: 5000 requests/mes)

2. **Configura la clave**:
   ```javascript
   // En data/mediaService.js línea 5
   this.pixabayKey = 'TU_CLAVE_PIXABAY_AQUI';
   ```

3. **Términos de búsqueda personalizados**:
   ```javascript
   // Puedes modificar los términos de búsqueda por destino
   const searchMap = {
       'albania': 'albania beach ksamil mediterranean paradise',
       'georgia': 'georgia caucasus tbilisi mountain wine country',
       // ... etc
   };
   ```

## ✈️ API de Amadeus (Vuelos)

### ¿Para qué sirve?
- Precios de vuelos **en tiempo real**
- Comparación de aerolíneas y rutas
- Fechas y disponibilidad actualizada

### Configuración:

1. **Regístrate en Amadeus**:
   - Ve a: https://developers.amadeus.com
   - Crea una cuenta gratuita (Test mode: 10,000 calls/mes)
   - Obtén tus credenciales API

2. **Configura las credenciales**:
   ```javascript
   // En server.js (si usas servidor)
   const amadeus = new Amadeus({
     clientId: 'TU_CLIENT_ID',
     clientSecret: 'TU_CLIENT_SECRET'
   });
   ```

3. **Endpoints disponibles**:
   - Flight Offers Search
   - Flight Cheapest Date Search
   - Airport & City Search

## 🎥 YouTube API (Videos)

### ¿Para qué sirve?
- Videos curados y actualizados de destinos
- Contenido de viajeros reales
- Integración con reproductor YouTube

### Configuración:

1. **Google Cloud Console**:
   - Ve a: https://console.cloud.google.com/
   - Crea un proyecto
   - Habilita YouTube Data API v3
   - Obtén clave API

2. **Configura la clave**:
   ```javascript
   // En data/mediaService.js
   this.youtubeKey = 'TU_YOUTUBE_API_KEY';
   
   // Función para buscar videos automáticamente
   async searchYouTubeVideos(destination, query = 'travel guide') {
       const response = await fetch(
           `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${destination}+${query}&key=${this.youtubeKey}`
       );
       // ... procesamiento
   }
   ```

## 🎵 TikTok Integration

### ¿Para qué sirve?
- Contenido viral y actual sobre destinos
- Engagement de la comunidad viajera
- Tendencias y hashtags populares

### Opciones de integración:

1. **TikTok Embed (Actual)**:
   ```html
   <blockquote class="tiktok-embed" cite="URL_DEL_TIKTOK">
   <script async src="https://www.tiktok.com/embed.js"></script>
   ```

2. **TikTok Research API** (Para desarrolladores):
   - Regístrate en TikTok for Developers
   - Solicita acceso a Research API
   - Obtén contenido real por hashtags

3. **Simulación Actual** (Como está implementado):
   - Contenido simulado pero realista
   - Engagement stats ficticias pero creíbles
   - Enlaces a TikTok real

## 🌐 APIs Adicionales Recomendadas

### Unsplash API (Alternativa a Pixabay)
- **URL**: https://unsplash.com/developers
- **Ventajas**: Fotos de mayor calidad artística
- **Límite gratuito**: 5000 requests/hora

```javascript
// Configuración Unsplash
this.unsplashAccessKey = 'TU_UNSPLASH_ACCESS_KEY';

async getUnsplashImages(query) {
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${this.unsplashAccessKey}`
    );
}
```

### OpenWeather API (Clima)
- **URL**: https://openweathermap.org/api
- **Para**: Información climática en tiempo real
- **Gratuito**: 1000 calls/día

### Booking.com API (Alojamiento)
- **URL**: https://developers.booking.com/
- **Para**: Precios de hoteles y disponibilidad
- **Nota**: Requiere aprobación

## 🚀 Configuración Rápida (Solo con Pixabay)

Si quieres empezar rápido, configura solo Pixabay:

1. **Regístrate**: https://pixabay.com/accounts/register/
2. **Obtén tu clave**: https://pixabay.com/api/docs/
3. **Reemplaza en `data/mediaService.js`**:
   ```javascript
   this.pixabayKey = 'TU_CLAVE_AQUI'; // línea 5
   ```
4. **¡Listo!** Las imágenes serán reales y de alta calidad

## 💡 Tips y Mejores Prácticas

### Caching
```javascript
// Guarda las imágenes en localStorage para no hacer requests repetidos
localStorage.setItem(`images_${destination}`, JSON.stringify(images));
```

### Error Handling
```javascript
// Siempre ten imágenes de fallback
try {
    const images = await this.getPixabayImages(destination);
    return images.length > 0 ? images : this.getFallbackImages(destination);
} catch (error) {
    console.error('Error:', error);
    return this.getFallbackImages(destination);
}
```

### Rate Limiting
```javascript
// No hagas demasiadas requests seguidas
await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
```

## 🔐 Seguridad

⚠️ **IMPORTANTE**: 
- Nunca expongas las claves API en el frontend
- Usa variables de entorno para claves sensibles
- Considera un backend/proxy para APIs sensibles

```javascript
// ❌ MAL - Clave expuesta
const apiKey = 'abc123key';

// ✅ BIEN - Usar servidor proxy
const response = await fetch('/api/images/' + destination);
```

## 📊 Límites de APIs Gratuitas

| API | Límite Gratuito | Costo Extra |
|-----|----------------|-------------|
| Pixabay | 5,000/mes | - |
| Amadeus | 10,000/mes | $€0.01/call |
| YouTube | 10,000/día | $€0.0001/call |
| Unsplash | 5,000/hora | - |

## 🆘 Troubleshooting

### "Images not loading"
1. Verifica la clave API
2. Comprueba los límites de rate
3. Revisa la consola del navegador
4. Confirma que el destino tiene imágenes disponibles

### "CORS Error"
- Las APIs externas pueden tener restricciones CORS
- Usa un proxy/servidor backend
- O configura el dominio en la configuración de la API

### "Quota Exceeded"
- Has superado el límite gratuito
- Espera al reset del período
- Considera upgrade a plan de pago

---

## 🎯 Resultado Final

Con todas las APIs configuradas tendrás:
- ✅ **Imágenes reales** de cada destino
- ✅ **Videos actualizados** de viajeros
- ✅ **Precios de vuelos** en tiempo real
- ✅ **Contenido TikTok** viral
- ✅ **Experiencia** completamente inmersiva

¡La aplicación pasará de tener contenido estático a ser una **plataforma de viajes dinámica y actualizada**! 🚀