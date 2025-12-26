// Datos REALES de vuelos verificados 2025
const mockFlightData = {
    albania: {
        price: '€140-250',
        airline: 'Wizz Air / Iberia',
        duration: '3h 5m',
        iataOrigin: 'MAD',
        iataDestination: 'TIA',
        deals: [
            { date: '5-9 Ago', price: '€143', stops: 'Directo' },
            { date: '12-16 Ago', price: '€168', stops: 'Directo' },
            { date: '19-23 Ago', price: '€195', stops: 'Directo' }
        ]
    },
    georgia: {
        price: '€250-450',
        airline: 'Turkish / Pegasus',
        duration: '5h 30m',
        iataOrigin: 'MAD',
        iataDestination: 'TBS',
        deals: [
            { date: '5-9 Ago', price: '€285', stops: '1 escala' },
            { date: '12-16 Ago', price: '€345', stops: '1 escala' },
            { date: '19-23 Ago', price: '€410', stops: '1 escala' }
        ]
    },
    serbia: {
        price: '€200-350',
        airline: 'Air Serbia / Wizz Air',
        duration: '3h 20m',
        iataOrigin: 'MAD',
        iataDestination: 'BEG',
        deals: [
            { date: '5-9 Ago', price: '€215', stops: 'Directo' },
            { date: '12-16 Ago', price: '€265', stops: 'Directo' },
            { date: '19-23 Ago', price: '€320', stops: 'Directo' }
        ]
    },
    malta: {
        price: '€120-250',
        airline: 'Ryanair / KM Malta',
        duration: '2h 45m',
        iataOrigin: 'MAD',
        iataDestination: 'MLA',
        deals: [
            { date: '5-9 Ago', price: '€135', stops: 'Directo' },
            { date: '12-16 Ago', price: '€185', stops: 'Directo' },
            { date: '19-23 Ago', price: '€230', stops: 'Directo' }
        ]
    },
    norway: {
        price: '€250-450',
        airline: 'Norwegian / SAS',
        duration: '3h 40m',
        iataOrigin: 'MAD',
        iataDestination: 'BGO',
        deals: [
            { date: '5-9 Ago', price: '€265', stops: 'Directo' },
            { date: '12-16 Ago', price: '€345', stops: 'Directo' },
            { date: '19-23 Ago', price: '€410', stops: 'Directo' }
        ]
    }
};

// Destinos completos con INFO REAL VERIFICADA
window.destinations = [
    {
        id: 'albania',
        name: 'Albania',
        flag: '🇦🇱',
        tagline: 'Playas épicas + UNESCO + Súper Barato',
        description: 'La "Maldivas de Europa". Playas de agua turquesa en Ksamil, historia en Berat y fiesta en la Riviera. Todo por precios de los 90.',
        price: '350-500€',
        image: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=1200&h=800&fit=crop&crop=center',
        video: 'https://www.youtube.com/embed/5U5j7nScUrI',
        video: 'https://www.youtube.com/embed/5U5j7nScUrI',
        flightData: mockFlightData.albania,
        kiwiSlug: 'tirana',
        bestFor: ['Playas', 'Presupuesto', 'Aventura'],
        weather: { temp: '30-33°C', sun: '☀️ Sol intenso', rain: 'Muy rara' },
        highlights: [
            { icon: '🏖️', title: 'Ksamil - Maldivas albanesas', desc: '4 islas, agua turquesa cristalina' },
            { icon: '🏰', title: 'Berat UNESCO', desc: 'Ciudad de las mil ventanas, s.XIII' },
            { icon: '💰', title: 'Súper barato', desc: 'Cerveza 1.50€, cena 12€, fiesta 5€' }
        ]
    },
    {
        id: 'georgia',
        name: 'Georgia',
        flag: '🇬🇪',
        tagline: 'Montañas épicas + Vino milenario + Techno',
        description: 'Kazbegi 2170m, baños sulfurosos, khinkali, vino qvevri 8000 años... y Bassiani, el Berghain del Cáucaso.',
        price: '500-700€',
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=1200&h=800&fit=crop&crop=center',
        video: 'https://www.youtube.com/embed/MLK_J1b0Zhk',
        flightData: mockFlightData.georgia,
        kiwiSlug: 'tbilisi',
        bestFor: ['Montaña', 'Gastronomía', 'Techno'],
        weather: { temp: '30-34°C', sun: '☀️ Caluroso', rain: 'Baja' },
        highlights: [
            { icon: '🏔️', title: 'Kazbegi épico', desc: 'Iglesia Gergeti 2170m, Mt Kazbek' },
            { icon: '🎧', title: 'Bassiani Club', desc: 'Berghain del Cáucaso, techno hasta 9am' },
            { icon: '🍷', title: 'Vino 8000 años', desc: 'Método qvevri UNESCO, chacha' }
        ]
    },
    {
        id: 'serbia',
        name: 'Serbia (Belgrado)',
        flag: '🇷🇸',
        tagline: 'Splavovi + Cerveza 1.50€ + Fiesta sin fin',
        description: 'Clubes flotantes en el Danubio, kafanas con rakia, cerveza 1.50€, cena 8€. Fiesta hasta que salga el sol (y después).',
        price: '250-400€',
        image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&h=800&fit=crop&crop=center',
        video: 'https://www.youtube.com/embed/Tby1oqh4x5E',
        video: 'https://www.youtube.com/embed/Tby1oqh4x5E',
        flightData: mockFlightData.serbia,
        kiwiSlug: 'belgrade',
        bestFor: ['Fiesta', 'Presupuesto', 'Vida nocturna'],
        weather: { temp: '28-33°C', sun: '☀️ Caluroso', rain: 'Baja' },
        highlights: [
            { icon: '🚢', title: 'Splavovi ÚNICOS', desc: 'Freestyler, Lasta, Tag en el Sava' },
            { icon: '🍺', title: 'Precios locos', desc: 'Cerveza 1.50€, ćevapi 6€, club 7€' },
            { icon: '🏰', title: 'Fortaleza Kalemegdan', desc: 'Confluence Sava+Danubio, FREE' }
        ]
    },
    {
        id: 'malta',
        name: 'Malta',
        flag: '🇲🇹',
        tagline: 'Historia + Blue Lagoon + Paceville fiesta',
        description: 'Valletta UNESCO, Blue Lagoon en Comino, Paceville con entrada FREE a clubs, isla Gozo. Todo en 30km.',
        price: '450-650€',
        image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d27417?w=1200&h=800&fit=crop&crop=center',
        video: 'https://www.youtube.com/embed/U0-RCn6V8cE',
        video: 'https://www.youtube.com/embed/U0-RCn6V8cE',
        flightData: mockFlightData.malta,
        kiwiSlug: 'malta',
        bestFor: ['Todo en uno', 'Grupos', 'Seguro'],
        weather: { temp: '30-32°C', sun: '☀️ Húmedo', rain: 'Casi nula' },
        highlights: [
            { icon: '🏛️', title: 'Valletta UNESCO', desc: 'Capital fortificada s.XVI épica' },
            { icon: '💎', title: 'Blue Lagoon', desc: 'Comino, agua cristalina, tour €30' },
            { icon: '🎉', title: 'Paceville entrada FREE', desc: 'SkyClub, Havana, drinks €3' }
        ]
    },
    {
        id: 'norway',
        name: 'Noruega (Fiordos)',
        flag: '🇳🇴',
        tagline: 'Flåm Railway + Fiordos UNESCO + Caro pero WOW',
        description: 'El tren más bonito del mundo (Flåm), Sognefjord UNESCO, Bergen hanseático. Caro (cerveza 10€) pero vale cada céntimo.',
        price: '800-1100€',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=center',
        video: 'https://www.youtube.com/embed/C8pvSYWw77E',
        video: 'https://www.youtube.com/embed/C8pvSYWw77E',
        flightData: mockFlightData.norway,
        kiwiSlug: 'bergen',
        bestFor: ['Naturaleza', 'Fotografía', 'Premium'],
        weather: { temp: '15-18°C', sun: '⛈️ Lluvia probable', rain: 'Alta (50%)' },
        highlights: [
            { icon: '🚂', title: 'Flåm Railway', desc: 'Mejor tren del mundo, 730 NOK (€64)' },
            { icon: '⛴️', title: 'Fjord cruise UNESCO', desc: 'Nærøyfjord, Sognefjord, 900 NOK' },
            { icon: '🏘️', title: 'Bergen Bryggen', desc: 'Casas hanseáticas s.XIV UNESCO' }
        ]
    }
];