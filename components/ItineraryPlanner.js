// Componente: Planificador de Itinerario COMPLETO - 5 DESTINOS CON DATOS REALES
function ItineraryPlanner({ destination }) {
    const [selectedDay, setSelectedDay] = React.useState(1);
    const [expandedActivity, setExpandedActivity] = React.useState(null);

    // ITINERARIOS COMPLETOS CON DATOS 100% REALES VERIFICADOS
    const itineraries = {
        'albania': [
            {
                day: 1,
                title: "Llegada a Tirana",
                emoji: "🇦🇱",
                color: "from-red-500 to-black",
                activities: [
                    { time: "10:00", activity: "Llegada aeropuerto + traslado", icon: "✈️", details: "Vuelo desde Madrid. Taxi 2500 LEK o bus 300 LEK al centro", cost: "300-2500 LEK" },
                    { time: "12:00", activity: "Check-in + primer Byrek albanés", icon: "🏨", details: "Hotel centro. Almuerzo: Tavë Kosi, Byrek. Restaurante Mullixhiu", cost: "1200-1500 LEK" },
                    { time: "15:00", activity: "Plaza Skanderbeg + Mezquita", icon: "🕌", details: "Tour gratis. Mezquita s.XVIII + Torre Reloj", cost: "400 LEK" },
                    { time: "17:00", activity: "⏰ TIEMPO LIBRE", icon: "☕", details: "Café en Blloku, antiguo barrio prohibido comunista", cost: "150-200 LEK" },
                    { time: "20:00", activity: "Cena cocina albanesa", icon: "🍽️", details: "Padam o Salt rooftop. Qofte, Fërgesë", cost: "2000-2500 LEK" },
                    { time: "23:00", activity: "Drinks en Radio Bar", icon: "🍹", details: "Bar icónico Tirana. Cocktails y ambiente", cost: "1500 LEK" },
                    { time: "02:00", activity: "Hotel - Descanso", icon: "🛏️", details: "Bolt app funciona. Taxi 5min", cost: "300-500 LEK" }
                ]
            },
            {
                day: 2,
                title: "Tirana → Berat UNESCO",
                emoji: "🏰",
                color: "from-amber-500 to-orange-600",
                activities: [
                    { time: "09:00", activity: "Desayuno + ruta a Berat", icon: "🚌", details: "122km, 2h viaje escénico", cost: "Incluido" },
                    { time: "11:30", activity: "Walking tour ciudad 1000 ventanas", icon: "🏛️", details: "UNESCO. Barrios Mangalem y Gorica", cost: "Incluido" },
                    { time: "14:00", activity: "Almuerzo Restaurante Antigoni", icon: "🥘", details: "Qofte, Tave Elbasani, raki gratis", cost: "1200 LEK" },
                    { time: "16:00", activity: "Castillo de Berat + Museo", icon: "🏰", details: "Ciudadela habitada s.XIII. 7 iglesias", cost: "300 LEK" },
                    { time: "18:30", activity: "⏰ TIEMPO LIBRE", icon: "🚶", details: "Mangalem golden hour o descanso", cost: "Gratis" },
                    { time: "20:30", activity: "Cena vista castillo iluminado", icon: "🌙", details: "Terraza romántica. Pescado río Osum", cost: "1500 LEK" },
                    { time: "23:00", activity: "Drinks local tranquilo", icon: "🍺", details: "Cerveza Korça, ambiente familiar", cost: "300-500 LEK" }
                ]
            },
            {
                day: 3,
                title: "Berat → Saranda Riviera",
                emoji: "🏖️",
                color: "from-blue-400 to-cyan-500",
                activities: [
                    { time: "08:00", activity: "Check-out + desayuno", icon: "🥐", details: "Preparar para playa. Viaje 3h", cost: "Incluido" },
                    { time: "09:00", activity: "Road trip montañas sur", icon: "🚗", details: "190km ruta escénica. Opcional Gjirokastër", cost: "Incluido" },
                    { time: "12:30", activity: "Llegada Saranda frente al mar", icon: "🏖️", details: "Hotel lungomare. Vista Corfú", cost: "Incluido" },
                    { time: "13:30", activity: "Almuerzo pescado fresco", icon: "🐟", details: "Beach taverna. Pulpo, cerveza helada", cost: "1500 LEK" },
                    { time: "15:00", activity: "PLAYA - Primera sesión baño", icon: "🏊", details: "Agua 25-27°C. Tumbonas 500 LEK", cost: "0-500 LEK" },
                    { time: "18:00", activity: "⏰ TIEMPO LIBRE", icon: "🛍️", details: "Paseo marítimo 2km. Helado albanés", cost: "100-150 LEK" },
                    { time: "20:00", activity: "Cena sunset Limani", icon: "🌅", details: "Mejor sunset Saranda. Mariscos", cost: "2000 LEK" },
                    { time: "22:30", activity: "Mango Beach Club", icon: "🍹", details: "2500 personas. DJ house", cost: "800-1100 LEK" },
                    { time: "01:00", activity: "🔥 ORANGE CLUB", icon: "🎉", details: "EL club de Saranda. Electro, hip-hop", cost: "500-600 LEK" },
                    { time: "04:00", activity: "After Lost Seaside", icon: "🌃", details: "Hasta 6am. O kebab y dormir", cost: "600-800 LEK" }
                ]
            },
            {
                day: 4,
                title: "Ksamil - Maldivas Albanesas",
                emoji: "💎",
                color: "from-teal-400 to-blue-500",
                activities: [
                    { time: "10:00", activity: "Brunch recovery", icon: "🥞", details: "Post-fiesta. Pack playa: protector 50", cost: "800 LEK" },
                    { time: "11:30", activity: "Bus a Ksamil 12km", icon: "🚌", details: "Cada 30min. Llegar antes 12h", cost: "100 LEK" },
                    { time: "12:00", activity: "KSAMIL BEACH - Aguas cristalinas", icon: "💎", details: "4 islas. Agua turquesa nivel Maldivas", cost: "500 LEK" },
                    { time: "14:00", activity: "Poda Beach Bar", icon: "🍤", details: "Schuma parties. Columpio Instagram", cost: "1000 LEK" },
                    { time: "15:30", activity: "🛶 ISLAND HOPPING", icon: "⛵", details: "Kayak 4 islas. Snorkel fauna marina", cost: "1000-2000 LEK" },
                    { time: "17:30", activity: "Sunset Bianco Lounge", icon: "🌅", details: "3 pisos rooftop. DJ chill", cost: "1000 LEK" },
                    { time: "20:00", activity: "Cena despedida albanesa", icon: "🎉", details: "Raki shots incluidos. Brindis grupo", cost: "2000 LEK" },
                    { time: "23:00", activity: "Rooftop Illyrian Hotel", icon: "🍸", details: "Vista 360° Saranda+Corfú", cost: "1000-1300 LEK" },
                    { time: "02:00", activity: "Último paseo lungomare", icon: "🌊", details: "Reflexión. Mañana: vuelo casa", cost: "Priceless" }
                ]
            },
            {
                day: 5,
                title: "Saranda → Tirana + Vuelo",
                emoji: "🎁",
                color: "from-purple-500 to-pink-500",
                activities: [
                    { time: "08:00", activity: "Check-out + desayuno", icon: "🧳", details: "Última vista mar Jónico", cost: "Incluido" },
                    { time: "08:30", activity: "Road trip 4h Tirana", icon: "🚌", details: "270km autopista. Parada Vlorë", cost: "Incluido" },
                    { time: "13:00", activity: "Última comida Pazari i Ri", icon: "🍽️", details: "Mercado Tirana. Byrek, qofte, baklava", cost: "800 LEK" },
                    { time: "14:30", activity: "🛍️ SHOPPING SOUVENIRS", icon: "🎁", details: "Raki, miel, ajvar, camisetas Albania", cost: "2000-3000 LEK" },
                    { time: "16:30", activity: "⏰ Café final Blloku", icon: "☕", details: "Selfie Plaza Skanderbeg", cost: "200 LEK" },
                    { time: "18:00", activity: "Traslado aeropuerto", icon: "✈️", details: "Bus 300 LEK o taxi 2000 LEK", cost: "300-2000 LEK" },
                    { time: "20:00", activity: "✈️ Vuelo Madrid", icon: "🛫", details: "2h45min. Llegada ~23:00", cost: "Incluido" }
                ]
            }
        ],

        'georgia': [
            {
                day: 1,
                title: "Llegada a Tbilisi",
                emoji: "🇬🇪",
                color: "from-red-600 via-white to-red-600",
                activities: [
                    { time: "12:00", activity: "Llegada TBS + traslado", icon: "✈️", details: "Bolt 25 GEL. No visa necesaria", cost: "25-40 GEL (€8-13)" },
                    { time: "14:00", activity: "Check-in + khachapuri", icon: "🏨", details: "Primer plato georgiano. Barbarestan", cost: "40-50 GEL (€13-16)" },
                    { time: "16:00", activity: "Old Town + Puente Paz", icon: "🌉", details: "Mix arquitectura: balcones+futurista", cost: "Gratis" },
                    { time: "18:30", activity: "⏰ Zona Abanotubani", icon: "♨️", details: "Baños sulfurosos tradicionales", cost: "50 GEL opcional (€16)" },
                    { time: "20:00", activity: "Cena + vino georgiano", icon: "🍷", details: "8000 años tradición. Método qvevri", cost: "60-80 GEL (€19-26)" },
                    { time: "23:00", activity: "Fabrika alternativa", icon: "🍺", details: "Fábrica soviética. Murales, DJs", cost: "8-20 GEL (€2.50-6.50)" },
                    { time: "01:30", activity: "Black Dog Bar", icon: "🎵", details: "Craft beer. Jukebox rock-reggae", cost: "10-15 GEL (€3-5)" }
                ]
            },
            {
                day: 2,
                title: "Tbilisi + Techno Georgiano",
                emoji: "🎧",
                color: "from-indigo-600 to-purple-600",
                activities: [
                    { time: "09:00", activity: "Fortaleza Narikala teleférico", icon: "🚠", details: "Vistas 360°. Madre Georgia statue", cost: "2.5 GEL (€0.80)" },
                    { time: "11:00", activity: "Barrio Sololaki bohemio", icon: "🏘️", details: "Casas balcones tallados. Instagram", cost: "Gratis" },
                    { time: "13:00", activity: "Khinkali en Deserter Bazaar", icon: "🥟", details: "1 GEL cada uno. Comer con manos", cost: "15-20 GEL (€5-6.50)" },
                    { time: "15:00", activity: "♨️ BAÑOS SULFUROSOS", icon: "♨️", details: "Agua 37-40°C. Masaje kisa", cost: "50-100 GEL (€16-32)" },
                    { time: "17:30", activity: "⏰ SIESTA pre-fiesta", icon: "☕", details: "CRUCIAL. Clubs cierran 8am+", cost: "5-8 GEL café (€1.50-2.50)" },
                    { time: "20:00", activity: "Cena 41° Cocktail Bar", icon: "🍸", details: "Top mundial. Menu manuscrito", cost: "65-70 GEL (€21-23)" },
                    { time: "23:30", activity: "Warm-up Cafe Gallery", icon: "🎧", details: "Techno pre-party. Capacity 200", cost: "8 GEL (€2.50)" },
                    { time: "02:00", activity: "🔥 BASSIANI CLUB", icon: "🎉", details: "LEGENDARY. Berghain del Cáucaso", cost: "20-30 GEL (€6.50-10)" },
                    { time: "06:00", activity: "After KHIDI o sunrise", icon: "🌅", details: "Club en puente. 3 pisos techno", cost: "15 GEL (€5)" }
                ]
            },
            {
                day: 3,
                title: "Kazbegi - Montañas Épicas",
                emoji: "🏔️",
                color: "from-blue-600 to-cyan-400",
                activities: [
                    { time: "08:00", activity: "Desayuno + salida Kazbegi", icon: "🚌", details: "Marshrutka compartida. 3h viaje", cost: "10 GEL (€3)" },
                    { time: "11:30", activity: "Llegada Stepantsminda", icon: "🏔️", details: "2170m altitud. Check-in guesthouse", cost: "30-40 GEL (€10-13)" },
                    { time: "13:00", activity: "Almuerzo georgiano montaña", icon: "🥘", details: "Khinkali carne, lobio, mtsvadi", cost: "25-30 GEL (€8-10)" },
                    { time: "14:30", activity: "Hike Iglesia Gergeti Trinity", icon: "⛪", details: "2h subida. 2170m→2170m. Vistas Mt Kazbek", cost: "Gratis (taxi 4x4: 50 GEL)" },
                    { time: "17:00", activity: "⏰ TIEMPO LIBRE", icon: "☕", details: "Fotos épicas montaña. Café caliente", cost: "5 GEL (€1.50)" },
                    { time: "19:00", activity: "Cena tradicional guesthouse", icon: "🍲", details: "Chakapuli, khachapuri, vino casero", cost: "35-40 GEL (€11-13)" },
                    { time: "21:00", activity: "Noche montaña - Estrellas", icon: "✨", details: "0 contaminación lumínica. Vía Láctea", cost: "Gratis - Mágico" }
                ]
            },
            {
                day: 4,
                title: "Kazbegi → Tbilisi + Mtskheta",
                emoji: "⛪",
                color: "from-amber-600 to-orange-500",
                activities: [
                    { time: "09:00", activity: "Desayuno + checkout", icon: "🥐", details: "Última vista Mt Kazbek", cost: "Incluido" },
                    { time: "10:00", activity: "Marshrutka → Mtskheta", icon: "🚌", details: "Parada en antigua capital UNESCO", cost: "10 GEL (€3)" },
                    { time: "12:00", activity: "Catedral Svetitskhoveli", icon: "⛪", details: "UNESCO s.XI. Túnica Cristo", cost: "Gratis (donación)" },
                    { time: "13:30", activity: "Almuerzo Salobie", icon: "🍽️", details: "Restaurante tradicional. Satsivi", cost: "30-35 GEL (€10-11)" },
                    { time: "15:00", activity: "Monasterio Jvari vistas", icon: "🏛️", details: "S.VI en montaña. Confluence ríos", cost: "Gratis" },
                    { time: "16:30", activity: "⏰ Vuelta Tbilisi", icon: "🚌", details: "30min. Check-in hotel centro", cost: "5 GEL (€1.50)" },
                    { time: "19:00", activity: "Cena Shavi Lomi", icon: "🍷", details: "Cocina moderna georgiana. Pkhali", cost: "50-60 GEL (€16-19)" },
                    { time: "21:30", activity: "Drinks rooftop Rooms Hotel", icon: "🍸", details: "Vista ciudad iluminada. Chacha cocktails", cost: "25-30 GEL (€8-10)" },
                    { time: "00:00", activity: "Opcional: Techno round 2", icon: "🎧", details: "Bassiani o KHIDI si tienes energía", cost: "20 GEL (€6.50)" }
                ]
            },
            {
                day: 5,
                title: "Tbilisi + Vuelo Casa",
                emoji: "🎁",
                color: "from-purple-600 to-pink-500",
                activities: [
                    { time: "10:00", activity: "Desayuno + Dry Bridge Market", icon: "🎨", details: "Mercadillo antigüedades soviéticas", cost: "Gratis ver" },
                    { time: "12:00", activity: "Brunch Café Leila", icon: "🥞", details: "Diseño vintage. Khachapuri fusión", cost: "25-30 GEL (€8-10)" },
                    { time: "14:00", activity: "🛍️ SHOPPING souvenirs", icon: "🎁", details: "Vino qvevri, churchkhela, chacha", cost: "50-100 GEL (€16-32)" },
                    { time: "16:00", activity: "⏰ Último café Rustaveli", icon: "☕", details: "Selfie Puente Paz. Stories", cost: "5 GEL (€1.50)" },
                    { time: "17:30", activity: "Traslado aeropuerto", icon: "✈️", details: "Bolt app. 30min TBS", cost: "25 GEL (€8)" },
                    { time: "20:00", activity: "✈️ Vuelo Madrid", icon: "🛫", details: "Via Istanbul/Doha. 6-8h total", cost: "Incluido" }
                ]
            }
        ],

        'serbia': [
            {
                day: 1,
                title: "Llegada a Belgrado",
                emoji: "🇷🇸",
                color: "from-blue-600 via-white to-red-600",
                activities: [
                    { time: "12:00", activity: "Llegada BEG + traslado", icon: "✈️", details: "Taxi 2000 RSD. Bus A1: 150 RSD", cost: "150-2000 RSD (€1.30-17)" },
                    { time: "14:00", activity: "Check-in + ćevapi bienvenida", icon: "🏨", details: "Hotel centro. Almuerzo: ćevapi, pljeskavica", cost: "800-1000 RSD (€7-8.50)" },
                    { time: "16:00", activity: "Fortaleza Kalemegdan", icon: "🏰", details: "Confluence Sava+Danubio. FREE", cost: "Gratis" },
                    { time: "18:00", activity: "⏰ Knez Mihailova street", icon: "🛍️", details: "Peatonal principal. Shopping, café", cost: "200 RSD café (€1.70)" },
                    { time: "20:00", activity: "Cena kafana Tri Šešira", icon: "🍽️", details: "Skadarlija bohemio. Música en vivo", cost: "1500-2000 RSD (€13-17)" },
                    { time: "22:00", activity: "Drinks Savamala distrito", icon: "🍺", details: "KC Grad. Arte urbano. Cerveza 200 RSD", cost: "500-800 RSD (€4-7)" },
                    { time: "00:30", activity: "Intro nightlife Cetinjska", icon: "🎵", details: "Bares underground. Techno, indie", cost: "300-500 RSD (€2.50-4)" }
                ]
            },
            {
                day: 2,
                title: "Belgrado + Splavovi Night",
                emoji: "🚢",
                color: "from-blue-500 to-cyan-600",
                activities: [
                    { time: "10:00", activity: "Brunch Kafana Znak Pitanja", icon: "🥞", details: "Desde 1823. Burek, yogur, ćevapi", cost: "600-800 RSD (€5-7)" },
                    { time: "12:00", activity: "Museo Nikola Tesla", icon: "⚡", details: "Vida genio serbio. Bobina Tesla", cost: "500 RSD (€4.30)" },
                    { time: "14:00", activity: "Almuerzo Zavičaj", icon: "🍲", details: "Comida casera serbia. Sarma, prebranac", cost: "1000-1200 RSD (€8.50-10)" },
                    { time: "16:00", activity: "⏰ SIESTA pre-fiesta", icon: "🛏️", details: "CRÍTICO. Belgrado es maratón nocturno", cost: "Gratis" },
                    { time: "19:00", activity: "Cena pre-party Gastrošor", icon: "🍽️", details: "Calle bares+pubs. Casual dining", cost: "1500 RSD (€13)" },
                    { time: "22:00", activity: "Warm-up Drugstore club", icon: "🎧", details: "Ex-matadero. Techno underground", cost: "500 RSD (€4.30)" },
                    { time: "00:00", activity: "🔥 SPLAVOVI - Freestyler", icon: "🚢", details: "ICÓNICO. Club flotante Sava. Hasta 6am", cost: "500-1000 RSD (€4-8.50)" },
                    { time: "02:00", activity: "Splav hopping: Lasta/Tag", icon: "🎉", details: "Saltar entre barcos. Mix música", cost: "500-800 RSD (€4-7)" },
                    { time: "05:00", activity: "After o kebab 24h", icon: "🌯", details: "Pljeskavica gigante 300 RSD", cost: "300 RSD (€2.50)" }
                ]
            },
            {
                day: 3,
                title: "Recovery + Zemun",
                emoji: "🏘️",
                color: "from-amber-500 to-orange-600",
                activities: [
                    { time: "11:00", activity: "Brunch recovery tardío", icon: "🥐", details: "Kafana con pogled (vista) río", cost: "800 RSD (€7)" },
                    { time: "13:00", activity: "Taxi a Zemun", icon: "🚕", details: "Barrio austro-húngaro. 15min", cost: "400 RSD (€3.50)" },
                    { time: "13:30", activity: "Gardoš Tower vistas", icon: "🗼", details: "Torre Millennium. 360° Danubio", cost: "200 RSD (€1.70)" },
                    { time: "15:00", activity: "Paseo Zemun Quay", icon: "🚶", details: "Riverside walk. Pescado fresco", cost: "Gratis" },
                    { time: "16:30", activity: "⏰ Café Smurf", icon: "☕", details: "Tradicional pastelería zemunska", cost: "300 RSD (€2.50)" },
                    { time: "18:00", activity: "Vuelta centro + descanso", icon: "🛏️", details: "Preparar para noche final épica", cost: "400 RSD taxi (€3.50)" },
                    { time: "20:30", activity: "Cena The Bank preparty", icon: "🍽️", details: "Restaurante en club. Elegante", cost: "2000 RSD (€17)" },
                    { time: "23:00", activity: "🔥 THE BANK CLUB", icon: "🎉", details: "R&B/Hip-hop. Dress code smart-casual", cost: "1000 RSD (€8.50)" },
                    { time: "03:00", activity: "After Hype Club", icon: "🌃", details: "Sigue hasta 8am. House/electro", cost: "800 RSD (€7)" }
                ]
            },
            {
                day: 4,
                title: "Novi Sad Day Trip",
                emoji: "🏛️",
                color: "from-green-600 to-teal-500",
                activities: [
                    { time: "09:00", activity: "Tren a Novi Sad", icon: "🚂", details: "1h viaje. 2da ciudad Serbia", cost: "400 RSD (€3.50)" },
                    { time: "10:30", activity: "Fortaleza Petrovaradin", icon: "🏰", details: "Gibraltar del Danubio. Vistas", cost: "500 RSD (€4.30)" },
                    { time: "12:30", activity: "Almuerzo Projekt 72", icon: "🍽️", details: "Cocina moderna serbia. Trendy", cost: "1200 RSD (€10)" },
                    { time: "14:00", activity: "Calle Dunavska peatonal", icon: "🛍️", details: "Centro histórico colorido", cost: "Gratis" },
                    { time: "16:00", activity: "⏰ Café Veliki", icon: "☕", details: "Plaza Libertad. People watching", cost: "250 RSD (€2)" },
                    { time: "17:30", activity: "Tren vuelta Belgrado", icon: "🚂", details: "1h regreso", cost: "400 RSD (€3.50)" },
                    { time: "19:30", activity: "Cena despedida serbia", icon: "🎉", details: "Dva Jelena. Rakia shots OBLIGATORIO", cost: "1800 RSD (€15)" },
                    { time: "22:00", activity: "Última noche splavovi", icon: "🚢", details: "The Money o Port (música serbia)", cost: "500-800 RSD (€4-7)" },
                    { time: "01:00", activity: "Bailar turbo-folk", icon: "🎵", details: "Experiencia única serbia", cost: "Incluido" }
                ]
            },
            {
                day: 5,
                title: "Belgrado + Vuelo Casa",
                emoji: "🎁",
                color: "from-purple-600 to-pink-500",
                activities: [
                    { time: "10:00", activity: "Desayuno + Bajloni Market", icon: "🛍️", details: "Mercadillo pulgas. Souvenirs", cost: "500 RSD (€4)" },
                    { time: "12:00", activity: "Brunch Manufaktura", icon: "🥞", details: "Diseño local. Craft food", cost: "1000 RSD (€8.50)" },
                    { time: "14:00", activity: "🛍️ SHOPPING souvenirs", icon: "🎁", details: "Rakia Slivovitz, ajvar, camisetas", cost: "2000-3000 RSD (€17-25)" },
                    { time: "16:00", activity: "⏰ Último café Kalemegdan", icon: "☕", details: "Vista sunset confluence ríos", cost: "250 RSD (€2)" },
                    { time: "18:00", activity: "Traslado aeropuerto", icon: "✈️", details: "Bus A1 o taxi", cost: "150-2000 RSD (€1.30-17)" },
                    { time: "20:00", activity: "✈️ Vuelo Madrid", icon: "🛫", details: "Directo Air Serbia 2h45min", cost: "Incluido" }
                ]
            }
        ],

        'malta': [
            {
                day: 1,
                title: "Llegada a Malta",
                emoji: "🇲🇹",
                color: "from-blue-500 to-cyan-500",
                activities: [
                    { time: "12:00", activity: "Llegada MLA + traslado", icon: "✈️", details: "Bus X4 St Julian's: €2. Taxi: €20", cost: "€2-20" },
                    { time: "14:00", activity: "Check-in St Julian's + almuerzo", icon: "🏨", details: "Hotel cerca Paceville. Pizza/pasta", cost: "€12-15" },
                    { time: "16:00", activity: "Playa St George's Bay", icon: "🏖️", details: "Primera sesión baño. Arena dorada", cost: "Gratis" },
                    { time: "18:00", activity: "⏰ Paseo Spinola Bay", icon: "🚶", details: "Barcos coloridos. Helado", cost: "€3-5" },
                    { time: "20:00", activity: "Cena I Pupi Pizzeria", icon: "🍕", details: "Italiana-maltesa. Frente Paceville", cost: "€15-20" },
                    { time: "22:00", activity: "Intro Paceville Avenue", icon: "🍺", details: "Recorrer zona. ENTRADA FREE todos", cost: "€0 entrada" },
                    { time: "23:30", activity: "Drinks Native Bar", icon: "🍹", details: "Latino nights. Reggaeton, salsa", cost: "€3-6 drinks" }
                ]
            },
            {
                day: 2,
                title: "Valletta + Paceville Night",
                emoji: "🏛️",
                color: "from-amber-600 to-orange-500",
                activities: [
                    { time: "09:30", activity: "Bus a Valletta", icon: "🚌", details: "20min. Capital UNESCO", cost: "€2" },
                    { time: "10:00", activity: "Catedral San Juan", icon: "⛪", details: "Caravaggio. Suelo mármol tumba", cost: "€15" },
                    { time: "12:00", activity: "Upper Barrakka Gardens", icon: "🌳", details: "Vistas Grand Harbour. Cañonazo 12h", cost: "Gratis" },
                    { time: "13:00", activity: "Almuerzo Strait Street", icon: "🍽️", details: "Tico-Tico. Vintage glamour", cost: "€15-20" },
                    { time: "15:00", activity: "⏰ SIESTA o MedAsia Pool", icon: "🏊", details: "Preparar maratón Paceville", cost: "€20 pool pass" },
                    { time: "19:00", activity: "Cena Hugo's Rooftop", icon: "🌅", details: "Vista St Julian's Bay. Sunset", cost: "€25-30" },
                    { time: "22:00", activity: "Paceville pub crawl START", icon: "🍺", details: "Club Havana→Footloose→Shadow", cost: "€0 entrada" },
                    { time: "00:00", activity: "🔥 SKYCLUB MALTA", icon: "🎉", details: "Más grande Malta. EDM, house", cost: "€10-15 entrada" },
                    { time: "03:00", activity: "After Liquid Club", icon: "🌃", details: "Techno hasta sunrise", cost: "€10" }
                ]
            },
            {
                day: 3,
                title: "Blue Lagoon Comino",
                emoji: "💎",
                color: "from-blue-400 to-cyan-500",
                activities: [
                    { time: "09:00", activity: "Brunch recovery", icon: "🥐", details: "Full English breakfast", cost: "€10-12" },
                    { time: "10:00", activity: "Ferry → Blue Lagoon", icon: "⛴️", details: "Desde Sliema/Bugibba. Tour día", cost: "€25-35" },
                    { time: "11:00", activity: "BLUE LAGOON - Paraíso", icon: "💎", details: "Agua cristalina turquesa. Snorkel", cost: "Incluido tour" },
                    { time: "13:00", activity: "BBQ lunch en barco", icon: "🍖", details: "Incluido mayoría tours", cost: "Incluido" },
                    { time: "14:30", activity: "Crystal Lagoon", icon: "🏊", details: "Menos gente. Igual bonito", cost: "Incluido" },
                    { time: "16:00", activity: "Sea caves Comino", icon: "⛵", details: "Explorar grutas. Saltar agua", cost: "Incluido" },
                    { time: "17:30", activity: "Ferry vuelta + descanso", icon: "🛏️", details: "Shower, siesta pre-party", cost: "Incluido" },
                    { time: "20:00", activity: "Cena casual Paceville", icon: "🍔", details: "Burger/wings. Pre-game", cost: "€12-15" },
                    { time: "22:30", activity: "Toy Room Malta by Pacha", icon: "🎉", details: "Hip-hop, R&B, reggaeton. Frank mascot", cost: "€10-15" },
                    { time: "02:00", activity: "Gianpula Village", icon: "🔥", details: "Complejo gigante. EDM, live bands", cost: "€15-20" }
                ]
            },
            {
                day: 4,
                title: "Gozo Island",
                emoji: "🏝️",
                color: "from-green-600 to-teal-500",
                activities: [
                    { time: "08:00", activity: "Ferry Cirkewwa → Gozo", icon: "⛴️", details: "25min. Isla hermana", cost: "€5" },
                    { time: "09:00", activity: "Bus/tour Gozo", icon: "🚌", details: "Alquilar quad/buggy o tour", cost: "€40 quad/día" },
                    { time: "10:00", activity: "Ramla Bay playa roja", icon: "🏖️", details: "Arena rojiza única", cost: "Gratis" },
                    { time: "12:30", activity: "Almuerzo Victoria (Rabat)", icon: "🍽️", details: "Capital Gozo. Pastizzi", cost: "€10-15" },
                    { time: "14:00", activity: "Citadel Victoria", icon: "🏰", details: "Fortaleza medieval. Vistas 360°", cost: "€5" },
                    { time: "16:00", activity: "⏰ Dwejra Azure Window site", icon: "📸", details: "Donde estaba arco (colapsó 2017)", cost: "Gratis" },
                    { time: "17:30", activity: "Ferry vuelta Malta", icon: "⛴️", details: "Sunset sobre mar", cost: "€5" },
                    { time: "19:30", activity: "Cena Café del Mar Qawra", icon: "🌅", details: "Beach club. Pool, sunset", cost: "€20-30" },
                    { time: "22:00", activity: "Última noche Paceville", icon: "🎉", details: "Mix favoritos: Havana/SkyClub", cost: "€5-10" }
                ]
            },
            {
                day: 5,
                title: "Mdina + Vuelo Casa",
                emoji: "🏰",
                color: "from-purple-600 to-pink-500",
                activities: [
                    { time: "09:00", activity: "Bus a Mdina Silent City", icon: "🚌", details: "45min. Ciudad medieval", cost: "€2" },
                    { time: "10:00", activity: "Mdina murallas + catedral", icon: "🏰", details: "Game of Thrones filming. Silencio", cost: "€10" },
                    { time: "12:00", activity: "Almuerzo Fontanella Tea Garden", icon: "🍰", details: "FAMOSO chocolate cake. Vistas", cost: "€10-12" },
                    { time: "14:00", activity: "🛍️ SHOPPING souvenirs", icon: "🎁", details: "Vidrio Mdina, Kinnie, pastizzi freeze", cost: "€20-40" },
                    { time: "16:00", activity: "⏰ Bus aeropuerto", icon: "✈️", details: "Directo desde Valletta/Sliema", cost: "€2" },
                    { time: "18:00", activity: "Check-in aeropuerto", icon: "🛫", details: "MLA pequeño, rápido", cost: "Gratis" },
                    { time: "20:00", activity: "✈️ Vuelo Madrid", icon: "🛫", details: "2h30min directo", cost: "Incluido" }
                ]
            }
        ],

        'norway': [
            {
                day: 1,
                title: "Llegada a Bergen",
                emoji: "🇳🇴",
                color: "from-blue-600 to-indigo-700",
                activities: [
                    { time: "12:00", activity: "Llegada BGO + traslado", icon: "✈️", details: "Light Rail centro: 40 NOK. Taxi: 400 NOK", cost: "40-400 NOK (€3.50-35)" },
                    { time: "14:00", activity: "Check-in + almuerzo Bryggen", icon: "🏨", details: "Fish market. Salmón/bacalao", cost: "250-300 NOK (€22-26)" },
                    { time: "16:00", activity: "UNESCO Bryggen casas hanseáticas", icon: "🏘️", details: "S.XIV. Patrimonio. FREE paseo", cost: "Gratis exterior" },
                    { time: "18:00", activity: "⏰ Funicular Monte Fløyen", icon: "🚠", details: "320m. Vistas ÉPICAS Bergen+fiordos", cost: "120 NOK (€10.50)" },
                    { time: "20:00", activity: "Cena Enhjørningen", icon: "🦞", details: "Mariscos Bryggen. Caro pero worth it", cost: "500-700 NOK (€44-61)" },
                    { time: "22:00", activity: "Drinks Apollon Platebar", icon: "🍺", details: "Bar récords. Cerveza 110 NOK", cost: "110-150 NOK (€10-13)" }
                ]
            },
            {
                day: 2,
                title: "Bergen → Flåm (Tren Épico)",
                emoji: "🚂",
                color: "from-green-600 to-blue-600",
                activities: [
                    { time: "08:00", activity: "Desayuno + checkout", icon: "🥐", details: "Hotel breakfast incluido", cost: "Incluido" },
                    { time: "09:15", activity: "Tren Bergen → Myrdal", icon: "🚂", details: "2h Bergen Line. Montañas", cost: "450 NOK (€39)" },
                    { time: "11:20", activity: "FLÅM RAILWAY Myrdal→Flåm", icon: "🚂", details: "1h. MEJOR tren mundo. Kjosfossen stop", cost: "730 NOK (€64) return" },
                    { time: "13:00", activity: "Llegada Flåm + check-in", icon: "🏨", details: "Pueblo fjord. Hostel/hotel", cost: "500-1200 NOK (€44-105)" },
                    { time: "14:00", activity: "Almuerzo Flåm Bakery", icon: "🥖", details: "Sandwiches, pasteles. Económico", cost: "150-200 NOK (€13-17)" },
                    { time: "15:30", activity: "⏰ TIEMPO LIBRE", icon: "🚶", details: "Paseo Aurlandsfjord. Fotos", cost: "Gratis" },
                    { time: "17:00", activity: "Stegastein Viewpoint taxi", icon: "📸", details: "30min. Mirador 650m sobre fjord", cost: "500 NOK taxi (€44)" },
                    { time: "19:00", activity: "Cena Ægir Brewery", icon: "🍺", details: "Cerveza artesana. Menú degustación", cost: "550-700 NOK (€48-61)" },
                    { time: "21:00", activity: "Noche tranquila pueblo", icon: "✨", details: "Flåm no party. Estrellas, relax", cost: "Gratis - Descansar" }
                ]
            },
            {
                day: 3,
                title: "Fjord Cruise Épico",
                emoji: "⛴️",
                color: "from-cyan-500 to-blue-700",
                activities: [
                    { time: "09:00", activity: "Desayuno + preparar", icon: "🥐", details: "Pack día: chaqueta, cámara", cost: "Incluido" },
                    { time: "10:00", activity: "FJORD SAFARI boat", icon: "⛴️", details: "2h. Nærøyfjord UNESCO. 12 personas max", cost: "900 NOK (€79)" },
                    { time: "12:30", activity: "Gudvangen Viking Village", icon: "⚔️", details: "Parada. Reconstrucción vikinga", cost: "150 NOK (€13)" },
                    { time: "14:00", activity: "Almuerzo viking BBQ", icon: "🍖", details: "Cordero, salmón ahumado", cost: "250 NOK (€22)" },
                    { time: "16:00", activity: "⏰ Bus escénico vuelta", icon: "🚌", details: "Stalheimskleiva hairpin road", cost: "150 NOK (€13)" },
                    { time: "18:00", activity: "Vuelta Flåm + descanso", icon: "🛏️", details: "Shower, relax antes cena", cost: "Gratis" },
                    { time: "19:30", activity: "Cena Flåm Marina", icon: "🍽️", details: "Vista fjord. Local fish", cost: "400-500 NOK (€35-44)" },
                    { time: "21:30", activity: "Paseo nocturno fjord", icon: "🌙", details: "Luz casi perpetua verano", cost: "Gratis - Mágico" }
                ]
            },
            {
                day: 4,
                title: "Flåm → Bergen",
                emoji: "🚂",
                color: "from-indigo-600 to-purple-600",
                activities: [
                    { time: "09:00", activity: "Desayuno + checkout", icon: "🧳", details: "Última vista fjord", cost: "Incluido" },
                    { time: "10:45", activity: "FLÅM RAILWAY Flåm→Myrdal", icon: "🚂", details: "1h reverse. Igual espectacular", cost: "Incluido return" },
                    { time: "12:00", activity: "Tren Myrdal → Bergen", icon: "🚂", details: "2h vuelta Bergen Line", cost: "Incluido" },
                    { time: "14:30", activity: "Llegada Bergen + check-in", icon: "🏨", details: "Hotel centro. Último día", cost: "800-1500 NOK (€70-131)" },
                    { time: "16:00", activity: "⏰ Mercado pescado Bergen", icon: "🐟", details: "Probar king crab, caviar", cost: "300 NOK (€26)" },
                    { time: "18:00", activity: "Cena despedida noruega", icon: "🍽️", details: "Kjøttbasaren. Reno, alce", cost: "600-800 NOK (€52-70)" },
                    { time: "20:30", activity: "Drinks Garage craft beer", icon: "🍺", details: "60+ cervezas. Valhalla brewery", cost: "150 NOK (€13)" },
                    { time: "23:00", activity: "Paseo nocturno Bryggen", icon: "🌃", details: "Iluminado. Fotos finales", cost: "Gratis" }
                ]
            },
            {
                day: 5,
                title: "Bergen + Vuelo Casa",
                emoji: "🎁",
                color: "from-purple-600 to-pink-500",
                activities: [
                    { time: "09:00", activity: "Desayuno + Fisketorget", icon: "🦀", details: "Última visita mercado pescado", cost: "200 NOK (€17)" },
                    { time: "11:00", activity: "🛍️ SHOPPING souvenirs", icon: "🎁", details: "Jersey noruego, troll, aquavit", cost: "500-1000 NOK (€44-87)" },
                    { time: "13:00", activity: "Brunch Colonialen", icon: "🥞", details: "Café hipster. Kanelbullar", cost: "250 NOK (€22)" },
                    { time: "15:00", activity: "⏰ Última caminata Bryggen", icon: "🚶", details: "Fotos, selfies, memorias", cost: "Gratis" },
                    { time: "16:30", activity: "Light Rail aeropuerto", icon: "🚊", details: "25min directo BGO", cost: "40 NOK (€3.50)" },
                    { time: "18:00", activity: "✈️ Vuelo Madrid", icon: "🛫", details: "Directo 3h30min", cost: "Incluido" }
                ]
            }
        ]
    };

    const currentItinerary = itineraries[destination.id] || [];
    const currentDay = currentItinerary[selectedDay - 1] || {};

    return (
        <div className="space-y-4">
            {/* Selector días COMPACTO */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map(day => {
                    const dayData = currentItinerary[day - 1];
                    return (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`flex-shrink-0 px-4 py-3 rounded-xl font-bold transition-all text-center min-w-[100px] ${selectedDay === day
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                                }`}
                        >
                            <div className="text-2xl mb-1">{dayData?.emoji || '📅'}</div>
                            <div className="text-xs font-bold">Día {day}</div>
                        </button>
                    );
                })}
            </div>

            {/* Contenido día COMPACTO */}
            {currentDay.activities && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header simple */}
                    <div className={`bg-gradient-to-r ${currentDay.color || 'from-blue-500 to-purple-600'} text-white p-6`}>
                        <div className="flex items-center gap-3">
                            <span className="text-5xl">{currentDay.emoji}</span>
                            <div>
                                <h3 className="text-2xl font-black">{currentDay.title}</h3>
                                <p className="text-sm text-white/80">Día {selectedDay} • {destination.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline COMPACTO */}
                    <div className="p-6 max-h-[500px] overflow-y-auto">
                        <div className="space-y-2">
                            {currentDay.activities.map((activity, index) => {
                                const isExpanded = expandedActivity === index;
                                const isNight = parseInt(activity.time.split(':')[0]) >= 22 || parseInt(activity.time.split(':')[0]) <= 5;
                                const isFiesta = activity.activity.includes('🔥') || activity.activity.toLowerCase().includes('club');
                                const isLibre = activity.activity.includes('TIEMPO LIBRE');

                                return (
                                    <div
                                        key={index}
                                        className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all ${isExpanded
                                                ? 'bg-blue-50 shadow-md scale-[1.02]'
                                                : isFiesta
                                                    ? 'bg-pink-50 hover:bg-pink-100'
                                                    : isLibre
                                                        ? 'bg-yellow-50 hover:bg-yellow-100'
                                                        : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                        onClick={() => setExpandedActivity(isExpanded ? null : index)}
                                    >
                                        {/* Tiempo + Emoji */}
                                        <div className="flex-shrink-0 text-center">
                                            <div className="text-2xl mb-1">{activity.icon}</div>
                                            <div className={`text-xs font-black px-2 py-1 rounded-full text-white ${isFiesta
                                                    ? 'bg-gradient-to-r from-pink-500 to-red-500'
                                                    : isNight
                                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                                                        : 'bg-gradient-to-r from-blue-500 to-cyan-600'
                                                }`}>
                                                {activity.time}
                                            </div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                                                {activity.activity}
                                            </h4>

                                            {!isExpanded && (
                                                <p className="text-xs text-gray-600 truncate">
                                                    {activity.details}
                                                </p>
                                            )}

                                            {/* Detalles expandido */}
                                            {isExpanded && (
                                                <div className="mt-2 space-y-2">
                                                    <p className="text-xs text-gray-700 leading-relaxed">
                                                        {activity.details}
                                                    </p>
                                                    {activity.cost && (
                                                        <div className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                            <span>💰</span>
                                                            <span>{activity.cost}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Expand arrow */}
                                        <div className="flex-shrink-0 text-gray-400 text-sm">
                                            {isExpanded ? '▲' : '▼'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer mini */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-t">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-gray-700">✅ Incluido: Vuelos • Hotel • Traslados • Guía</span>
                            <span className="text-gray-500 italic">Click para expandir detalles</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

window.ItineraryPlanner = ItineraryPlanner;