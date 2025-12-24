# 🌍 Viaje Panas 2026 - Plataforma de Decisión de Viajes

Una aplicación interactiva para que el grupo **Panas 2026** vote y decida el destino de su viaje europeo de agosto 2026.

## ✨ Características Principales

### 🗳️ Sistema de Votación
- Votación democrática entre los 6 integrantes del grupo
- Cada persona puede cambiar su voto hasta que se cierre la votación
- Sistema de persistencia local para mantener los votos
- Visualización en tiempo real de resultados

### 🎬 Experiencia Multimedia Mejorada
- **📸 Galería de Imágenes Reales**: Fotos de alta calidad desde APIs de turismo
- **🎥 Videos Curados**: Videos de YouTube seleccionados de cada destino
- **🎵 TikTok Viral**: Contenido simulado de TikTok con engagement real
- **🖼️ Imágenes Responsive**: Sistema de carga lazy con fallbacks

### ✈️ Información de Vuelos en Tiempo Real
- Precios actuales desde la API de Amadeus
- Múltiples opciones de fechas
- Comparación de aerolíneas
- Información de escalas y duración

## 🏖️ Destinos Disponibles

### 🇦🇱 Albania - "La joya escondida del Mediterráneo"
- **Precio**: €300-500 por persona
- **Highlights**: Ksamil Beach, Berat UNESCO, precios increíbles
- **Vuelos**: desde €125 (Wizz Air)

### 🇬🇪 Georgia - "El viaje más diferente de tu vida"
- **Precio**: €300-550 por persona  
- **Highlights**: Montañas del Cáucaso, vino milenario, gastronomía
- **Vuelos**: desde €289 (Turkish Airlines)

### 🇷🇸 Serbia (Belgrado) - "Capital de la fiesta europea"
- **Precio**: €250-400 por persona
- **Highlights**: Splavovi, vida nocturna, precios bajos
- **Vuelos**: desde €98 (Air Serbia)

### 🇲🇹 Malta - "El mix perfecto: historia + playa + fiesta"
- **Precio**: €350-500 por persona
- **Highlights**: Valletta UNESCO, Blue Lagoon, Paceville
- **Vuelos**: desde €145 (Ryanair)

### 🇳🇴 Noruega (Fiordos) - "Naturaleza nórdica épica"
- **Precio**: €500-750 por persona
- **Highlights**: Fiordos, tren de Flåm, Preikestolen
- **Vuelos**: desde €234 (SAS)

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **Tailwind CSS** - Framework de estilos
- **Babel** - Transpilación JSX en el navegador

### APIs Integradas
- **Pixabay API** - Imágenes de turismo de alta calidad
- **Amadeus Flight API** - Precios de vuelos en tiempo real
- **YouTube API** - Videos curados de destinos
- **TikTok Embed** - Contenido viral simulado

### Persistencia
- **LocalStorage** - Almacenamiento de votos y configuraciones
- **Session Storage** - Cache de imágenes y datos

## 📁 Estructura del Proyecto

```
panas2026/
├── index.html                    # HTML principal
├── server.js                     # Servidor Express
├── package.json
│
├── styles/
│   └── main.css                 # Estilos globales
│
├── data/
│   ├── storage.js               # Sistema de persistencia
│   ├── users.js                 # Datos de usuarios
│   ├── destinations.js          # Datos de destinos
│   └── mediaService.js          # Servicio de medios (APIs)
│
└── components/
    ├── App.js                   # Componente principal
    ├── UserSelection.js         # Selección de usuario
    ├── VotingCard.js           # Card de votación
    ├── DestinationDetail.js     # Vista detallada
    ├── FlightsTab.js           # Tab de vuelos
    └── TikTokFeed.js           # Componente TikTok
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Servidor web local (XAMPP, WAMP, Live Server, etc.)
- Navegador web moderno

### Configuración Rápida
```bash
# Clonar/descargar el proyecto
cd panas2026

# Si tienes XAMPP
# Mover a c:/xampp/htdocs/python/programas/panas2026/

# Iniciar servidor local
# Abrir http://localhost/python/programas/panas2026/
```

### Configuración de APIs (Opcional)
Para obtener imágenes y precios actualizados:

1. **Pixabay API**:
   - Registrarse en https://pixabay.com/api/docs/
   - Reemplazar `pixabayKey` en `data/mediaService.js`

2. **Amadeus API**:
   - Registrarse en https://developers.amadeus.com
   - Configurar credenciales en `server.js`

## 📱 Funcionalidades por Pestaña

### 🌟 Overview
- Información climática de agosto
- Presupuesto estimado por persona
- Descripción del "vibe" del destino

### ✨ Highlights
- 3 puntos más atractivos de cada destino
- Iconos descriptivos y explicaciones

### 📸 Fotos Reales
- Galería de imágenes desde APIs de turismo
- Visualización en modal ampliado
- Carga lazy y sistema de fallback

### 🎥 Videos
- Videos curados de YouTube
- Reproducción en modal
- Thumbnails de alta calidad

### 🎵 TikTok Viral
- Contenido simulado con engagement real
- Hashtags y estadísticas
- Diseño similar a TikTok oficial
- Call-to-action para crear contenido

### ✈️ Vuelos
- Precios en tiempo real desde Amadeus
- Múltiples opciones de fechas
- Información detallada de vuelos

## 👥 Integrantes del Grupo Panas 2026
1. Ana
2. Luis  
3. Carla
4. Diego
5. Sofia
6. Miguel

## 📊 Estados de la Aplicación

### Selección de Usuario
Los usuarios se identifican para votar de forma personalizada.

### Votación Activa
- Cada usuario puede votar por un destino
- Cambio de voto permitido
- Visualización en tiempo real

### Exploración de Destinos
- Información detallada
- Comparación de opciones
- Contenido multimedia inmersivo

## 🎯 Próximas Mejoras

- [ ] Integración con APIs de alojamiento (Booking.com)
- [ ] Sistema de comentarios por destino
- [ ] Notificaciones push para votos
- [ ] Exportar itinerario del destino ganador
- [ ] Integración con redes sociales reales
- [ ] Sistema de reservas integrado

## 🤝 Contribuir

Este proyecto es específico para el grupo Panas 2026, pero puedes:
- Sugerir mejoras
- Reportar bugs
- Proponer nuevos destinos
- Mejorar el sistema de APIs

---

**¡Que gane el mejor destino para Panas 2026! 🎉**

## 📁 Estructura del Proyecto

```
panas2026/
├── index.html              # HTML principal (solo carga scripts)
├── server.js               # Servidor Express con API
├── package.json
│
├── styles/
│   └── main.css           # Estilos globales
│
├── data/
│   ├── storage.js         # Sistema de persistencia
│   ├── users.js           # Datos de usuarios (panas)
│   └── destinations.js    # Datos de destinos
│
└── components/
    ├── App.js             # Componente principal
    ├── UserSelection.js   # Selección de usuario
    ├── VotingCard.js      # Card de votación
    ├── DestinationDetail.js  # Vista detallada
    └── FlightsTab.js      # Tab de vuelos
```

## 🎯 Ventajas de esta Estructura

✅ **Modular**: Cada componente en su propio archivo
✅ **Fácil de mantener**: Editas solo lo que necesitas
✅ **Rápido de cargar**: Archivos más pequeños
✅ **Escalable**: Fácil añadir nuevos componentes
✅ **Organizado**: Separación clara de datos, estilos y lógica

## 🚀 Cómo Usar

### 1. Instalación

```bash
# Copiar todos los archivos a tu carpeta
C:\xampp\htdocs\python\programas\panas2026\

# Instalar dependencias
npm install express
```

### 2. Ejecutar

```bash
node server.js
```

Abre: **http://localhost:3001**

## 📝 Editar Componentes

### Quieres cambiar la selección de usuarios?
→ Edita: `components/UserSelection.js`

### Quieres mejorar las cards de votación?
→ Edita: `components/VotingCard.js`

### Quieres añadir más tabs en la vista detallada?
→ Edita: `components/DestinationDetail.js`

### Quieres cambiar cómo se muestran los vuelos?
→ Edita: `components/FlightsTab.js`

### Quieres añadir más destinos?
→ Edita: `data/destinations.js`

### Quieres cambiar los estilos?
→ Edita: `styles/main.css`

## 🔧 Estructura de Archivos

### `index.html` (Minimalista)
Solo carga los scripts, no contiene código HTML pesado.

### `components/App.js`
Componente principal que gestiona:
- Estado global (usuario, votos, destino seleccionado)
- Navegación entre vistas
- Persistencia de datos

### `components/UserSelection.js`
Pantalla inicial de selección de usuario.

### `components/VotingCard.js`
Card individual para cada destino con:
- Imagen de fondo
- Info básica
- Botones de votar y ver detalles
- Barra de progreso de votos

### `components/DestinationDetail.js`
Vista detallada con:
- Header hero
- Video
- Tabs (Resumen, Destacados, Vuelos)

### `components/FlightsTab.js`
Tab de vuelos que:
- Se conecta a la API
- Muestra precios reales de SerpAPI
- Fallback a datos mock
- Badges de "precio real"

## 🎨 Personalización

### Añadir un nuevo componente:

1. Crear archivo en `/components/NuevoComponente.js`
2. Definir componente:
```javascript
function NuevoComponente({ props }) {
    return (
        <div>Tu JSX aquí</div>
    );
}

window.NuevoComponente = NuevoComponente;
```
3. Importar en `index.html`:
```html
<script type="text/babel" src="components/NuevoComponente.js"></script>
```
4. Usar en App.js:
```javascript
<NuevoComponente prop1={value1} />
```

### Añadir estilos:

Edita `styles/main.css` y añade tus clases.

## 📊 API

El servidor expone:

- `GET /api/flights/:destination/:period`
  - Devuelve precios de vuelos (reales o mock)
  
- `GET /api/health`
  - Estado del servidor y contador de búsquedas

## 💾 Persistencia

Usa `localStorage` para guardar:
- Usuario seleccionado
- Votos realizados
- Si ya votó

Funciones disponibles:
```javascript
await window.storage.get('key')
await window.storage.set('key', 'value')
```

## 🔥 Hot Reload

Para desarrollo rápido, usa:
```bash
npm install -g live-server
live-server --port=8080
```

Luego abre dos terminales:
1. `node server.js` (puerto 3001 para API)
2. `live-server` (puerto 8080 para frontend)

## 📦 Producción

Para desplegar, simplemente copia todos los archivos manteniendo la estructura de carpetas.

## 🐛 Debug

Abre la consola del navegador (F12) para ver:
- Logs de carga de precios
- Errores de API
- Estado de la aplicación

---

**¡Ahora puedes editar cada parte por separado sin tocar un HTML gigante!** 🎉
#   V i a j e - P a n a s  
 #   V i a j e - P a n a s  
 #   V i a j e - P a n a s  
 #   V i a j e - P a n a s  
 #   V i a j e - P a n a s  
 #   V i a j e - P a n a s  
 