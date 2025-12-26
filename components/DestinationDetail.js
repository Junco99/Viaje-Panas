// Componente: Vista Detallada del Destino - REORGANIZADO
function DestinationDetail({ destination, onBack, realPrices, loadingPrices, onLoadPrices }) {
    const [activeTab, setActiveTab] = React.useState('overview');

    // Cargar precios cuando se entra en tab vuelos
    React.useEffect(() => {
        if (activeTab === 'flights' && destination.id) {
            onLoadPrices(destination.id);
        }
    }, [activeTab, destination.id]);

    return (
        <div className="min-h-screen bg-slate-900 overflow-x-hidden">
            {/* Header Hero - RESPONSIVE */}
            <div className="relative h-96 hero-mobile hero-tablet overflow-hidden">
                <div
                    className="absolute inset-x-0 top-0 h-full"
                    style={{
                        backgroundImage: `url(${destination.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(30px) brightness(0.3)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>

                <div className="relative container-responsive hero-content-mobile h-full flex flex-col justify-center">
                    <div className="text-white">
                        <div className="flex flex-wrap gap-3 mt-6">
                            <button
                                onClick={() => onBack()}
                                className="px-6 py-2 rounded-full border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                ← Volver
                            </button>
                            <a
                                href={`https://wa.me/?text=¡Mirad este destino para el viaje! 🌴 *${destination.name}* %0A%0A${destination.description}%0A%0A💸 Precio estimado: ${destination.price}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#128C7E] transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                            >
                                <span>📱</span> Compartir en Grupo
                            </a>
                        </div>

                        {/* Mobile: Stack flag and content, Desktop: Side by side */}
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                            <span className="text-4xl md:text-6xl mx-auto md:mx-0">{destination.flag}</span>
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl md:text-5xl font-black mb-2 hero-title-mobile">{destination.name}</h1>
                                <p className="text-lg md:text-2xl text-gray-200 hero-subtitle-mobile">{destination.tagline}</p>
                            </div>
                        </div>

                        <p className="text-base md:text-xl text-gray-100 mb-6 max-w-2xl mx-auto md:mx-0 text-center md:text-left hero-description-mobile">{destination.description}</p>

                        <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                            {destination.bestFor && destination.bestFor.map(tag => (
                                <span key={tag} className="glass-effect-enhanced px-3 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price Box - Responsive positioning */}
                <div className="absolute top-6 right-6 hide-mobile">
                    <div className="glass-effect-enhanced backdrop-blur-md px-6 py-4 rounded-2xl text-center border-2 border-white/30">
                        <div className="text-sm text-gray-200 mb-1">Desde</div>
                        <div className="text-4xl font-black text-white">{destination.price.split('-')[0]}</div>
                        <div className="text-xs text-gray-300 mt-1">por persona</div>
                    </div>
                </div>

                {/* Price Box Mobile - At bottom */}
                <div className="show-mobile price-box-mobile">
                    <div className="glass-effect-enhanced backdrop-blur-md p-4 rounded-2xl text-center border-2 border-white/30">
                        <div className="text-sm text-gray-200 mb-1">Desde</div>
                        <div className="text-2xl font-black text-white">{destination.price.split('-')[0]}</div>
                        <div className="text-xs text-gray-300 mt-1">por persona</div>
                    </div>
                </div>
            </div>

            {/* Content - RESPONSIVE */}
            <div className="container-responsive py-8 md:py-12">

                {/* 🔥 1. ITINERARIO PRINCIPAL - MEJORADO Y RESPONSIVE */}
                <div className="mb-8 md:mb-12 relative itinerary-mobile itinerary-tablet">
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-4 md:p-8 border border-slate-200">
                        {/* Header del itinerario */}
                        <div className="text-center mb-6 md:mb-8">
                            <div className="inline-block bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-bold mb-4 tracking-widest uppercase">
                                Itinerario Recomendado
                            </div>
                            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 md:mb-3 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
                                <span>{destination.flag}</span>
                                <span className="text-center">Plan de 5 Días</span>
                            </h2>
                            <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto">
                                Una ruta optimizada para descubrir lo mejor de {destination.name}
                            </p>
                        </div>

                        {/* Componente itinerario */}
                        <ItineraryPlanner destination={destination} />

                        {/* Footer info itinerario */}
                        <div className="mt-6 md:mt-8 bg-slate-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-200">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-start md:items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">i</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm md:text-base">Horarios flexibles</h4>
                                        <p className="text-xs md:text-sm text-slate-500">Este plan es una propuesta personalizable según tus preferencias.</p>
                                    </div>
                                </div>
                                <div className="text-indigo-600 font-bold text-xs md:text-sm text-center uppercase tracking-widest">
                                    Ruta Verificada
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 md:mb-12 px-2 md:px-0">
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Información Esencial</h2>
                        <p className="text-slate-300 text-sm md:text-base opacity-80">Datos clave para tu planificación</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 cards-grid-mobile cards-grid-tablet">
                        {/* Card Clima - RESPONSIVE */}
                        <div className="card-enhanced bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all card-mobile">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                                <span>🌡️</span>
                                <span className="text-mobile-base">Clima en Agosto</span>
                            </h3>
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800 text-sm md:text-base font-medium">Temperatura:</span>
                                    <span className="font-bold text-base md:text-lg text-gray-900">{destination.weather.temp}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800 text-sm md:text-base font-medium">Sol:</span>
                                    <span className="font-bold text-sm md:text-base text-gray-900">{destination.weather.sun}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800 text-sm md:text-base font-medium">Lluvia:</span>
                                    <span className="font-bold text-sm md:text-base text-gray-900">{destination.weather.rain}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Presupuesto - RESPONSIVE */}
                        <div className="card-enhanced bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all card-mobile">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                                <span>💰</span>
                                <span className="text-mobile-base">Presupuesto Total</span>
                            </h3>
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800 text-sm md:text-base font-medium">Vuelos:</span>
                                    <span className="font-bold text-sm md:text-base text-gray-900">{destination.flightData.price}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800 text-sm md:text-base font-medium">Estancia (5 días):</span>
                                    <span className="font-bold text-sm md:text-base text-gray-900">{destination.price}</span>
                                </div>
                                <div className="pt-2 md:pt-3 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-900 font-bold text-sm md:text-base">Total estimado:</span>
                                        <span className="font-black text-lg md:text-xl text-blue-600">
                                            {destination.flightData.price.split('-')[0]}-{destination.price.split('-')[1]}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-700 mt-2 md:mt-3 font-medium">* Precios por persona, vuelo + estancia</div>
                        </div>

                        {/* Card Vibe - RESPONSIVE */}
                        <div className="bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6 border border-white/10 card-mobile">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 uppercase tracking-widest text-[11px] opacity-60">Atmósfera</h3>
                            <p className="text-slate-300 leading-relaxed mb-3 md:mb-4 text-sm md:text-base italic">
                                "{destination.description}"
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {destination.bestFor && destination.bestFor.map(tag => (
                                    <span key={tag} className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded text-[10px] font-bold uppercase border border-indigo-500/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TABS - COMPLETAMENTE RESPONSIVE */}
                <div className="mb-6 md:mb-8 px-2 md:px-0">
                    <div className="text-center mb-4 md:mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center justify-center gap-2 md:gap-3">
                            <span>🎯</span>
                            <span>Más Sobre {destination.name}</span>
                        </h2>
                        <p className="text-indigo-300/60 text-sm md:text-base font-medium">Explora fotos, videos y más info</p>
                    </div>

                    {/* Tabs navegación - RESPONSIVE */}
                    {/* Tabs navegación - ARREGLADO para móvil */}
                    <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                        <div className="flex gap-2 min-w-max px-2">
                            {[
                                ['overview', 'Info', '🌟'],
                                ['tiktok', 'TikTok', '🎵'],
                                ['highlights', 'Destacados', '✨'],
                                ['images', 'Fotos', '📸'],
                                ['flights', 'Vuelos', '✈️']
                            ].map(([id, label, icon]) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`pb-3 px-3 text-sm font-bold transition-all whitespace-nowrap ${activeTab === id
                                        ? 'text-blue-400 border-b-4 border-blue-400'
                                        : 'text-slate-400 hover:text-white border-b-4 border-transparent'
                                        }`}
                                >
                                    <span className="block sm:hidden">{icon}</span>
                                    <span className="hidden sm:block">{icon} {label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content - RESPONSIVE */}
                    <div className="card-enhanced bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 tab-content-mobile tab-content-tablet">{activeTab === 'overview' && (
                        <div className="space-y-4 md:space-y-6">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg md:rounded-xl p-4 md:p-6">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                                    Por qué {destination.name} es perfecto para ti
                                </h3>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                    {destination.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="bg-green-50 rounded-lg md:rounded-xl p-4 md:p-6">
                                    <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2 text-sm md:text-base">
                                        <span>✅</span>
                                        Lo mejor del destino
                                    </h4>
                                    <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                                        {destination.highlights && destination.highlights.slice(0, 3).map((h, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span>{h.icon}</span>
                                                <span><strong>{h.title}:</strong> {h.desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-blue-50 rounded-lg md:rounded-xl p-4 md:p-6">
                                    <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm md:text-base">
                                        <span>📌</span>
                                        Tags del viaje
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {destination.bestFor && destination.bestFor.map(tag => (
                                            <span key={tag} className="bg-white text-gray-700 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-sm">
                                                ✨ {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                        {activeTab === 'highlights' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {destination.highlights.map((highlight, index) => (
                                    <div key={index} className="bg-gradient-to-br from-white to-blue-50 rounded-lg md:rounded-xl shadow-md p-4 md:p-6 text-center hover:shadow-xl transition-all">
                                        <div className="text-3xl md:text-5xl mb-3 md:mb-4">{highlight.icon}</div>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                                        <p className="text-gray-600 text-sm md:text-base">{highlight.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'images' && (
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                                    <span>📸</span>
                                    Fotos Reales de {destination.name}
                                </h3>
                                <ImageGallery destination={destination} />
                                <p className="text-gray-600 text-xs md:text-sm mt-3 md:mt-4 text-center">
                                    * Imágenes reales de viajeros y fuentes de turismo confiables
                                </p>
                            </div>
                        )}

                        {activeTab === 'tiktok' && (
                            <div className="-m-4 md:-m-6">
                                <TikTokFeed destination={destination} />
                            </div>
                        )}

                        {activeTab === 'flights' && (
                            <FlightsTab
                                destination={destination}
                                realPrices={realPrices}
                                loadingPrices={loadingPrices}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.DestinationDetail = DestinationDetail;