// Componente: TikTok Feed
function TikTokFeed({ destination }) {
    const [activeHashtag, setActiveHashtag] = React.useState(0);

    // Data específica por destino
    const getHashtagsForDestination = (destinationId) => {
        const hashtagData = {
            'albania': [
                { displayName: '#Albania', tag: 'albania', count: '2.4M' },
                { displayName: '#Ksamil', tag: 'ksamil', count: '847K' },
                { displayName: '#Saranda', tag: 'saranda', count: '543K' },
                { displayName: '#Tirana', tag: 'tirana', count: '1.1M' },
                { displayName: '#Riviera', tag: 'albanianriviera', count: '234K' }
            ],
            'georgia': [
                { displayName: '#Georgia', tag: 'georgia', count: '3.2M' },
                { displayName: '#Tbilisi', tag: 'tbilisi', count: '1.8M' },
                { displayName: '#Kazbegi', tag: 'kazbegi', count: '456K' },
                { displayName: '#Batumi', tag: 'batumi', count: '678K' },
                { displayName: '#Wine', tag: 'georgianwine', count: '234K' }
            ],
            'serbia': [
                { displayName: '#Belgrade', tag: 'belgrade', count: '4.1M' },
                { displayName: '#Splavovi', tag: 'splavovi', count: '1.2M' },
                { displayName: '#Serbia', tag: 'serbia', count: '2.7M' },
                { displayName: '#Nightlife', tag: 'belgradenightlife', count: '890K' },
                { displayName: '#Balkan', tag: 'balkanparty', count: '445K' }
            ],
            'malta': [
                { displayName: '#Malta', tag: 'malta', count: '5.3M' },
                { displayName: '#BlueLagoon', tag: 'bluelagoon', count: '2.1M' },
                { displayName: '#Valletta', tag: 'valletta', count: '678K' },
                { displayName: '#Gozo', tag: 'gozo', count: '543K' },
                { displayName: '#Comino', tag: 'comino', count: '789K' }
            ],
            'norway': [
                { displayName: '#Norway', tag: 'norway', count: '8.7M' },
                { displayName: '#Fjords', tag: 'norwayfjords', count: '3.4M' },
                { displayName: '#Lofoten', tag: 'lofoten', count: '2.1M' },
                { displayName: '#Bergen', tag: 'bergen', count: '1.5M' },
                { displayName: '#NorthernLights', tag: 'northernlightsnorway', count: '4.2M' }
            ]
        };
        return hashtagData[destinationId] || [];
    };

    const hashtags = getHashtagsForDestination(destination.id);

    // URLs reales de TikTok
    const getTikTokUrls = (destinationId) => {
        const urlMap = {
            'albania': [
                'https://www.tiktok.com/tag/albania?lang=es',
                'https://www.tiktok.com/tag/ksamil?lang=es',
                'https://www.tiktok.com/tag/tirana?lang=es'
            ],
            'georgia': [
                'https://www.tiktok.com/tag/georgia?lang=es',
                'https://www.tiktok.com/tag/tbilisi?lang=es',
                'https://www.tiktok.com/tag/kazbegi?lang=es'
            ],
            'serbia': [
                'https://www.tiktok.com/tag/belgrade?lang=es',
                'https://www.tiktok.com/tag/splavovi?lang=es',
                'https://www.tiktok.com/tag/serbia?lang=es'
            ],
            'malta': [
                'https://www.tiktok.com/tag/malta?lang=es',
                'https://www.tiktok.com/tag/bluelagoon?lang=es',
                'https://www.tiktok.com/tag/valletta?lang=es'
            ],
            'norway': [
                'https://www.tiktok.com/tag/norway?lang=es',
                'https://www.tiktok.com/tag/fjords?lang=es',
                'https://www.tiktok.com/tag/lofoten?lang=es'
            ]
        };
        return urlMap[destinationId] || [];
    };

    const tiktokUrls = getTikTokUrls(destination.id);

    return (
        <div className="bg-black text-white min-h-screen p-4 md:p-6">
            {/* Header Importante */}
            <div className="text-center mb-6 md:mb-8">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-xl md:text-2xl">
                        🎵
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                        TikTok Intel: {destination.name}
                    </h2>
                </div>
                <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto px-2">
                    <strong>🔥 LA FUENTE MÁS IMPORTANTE DE INFORMACIÓN</strong><br />
                    Aquí descubres la vida real: fiestas, lugares secretos, comida, precios y todo lo que NO te cuentan las guías
                </p>
            </div>

            {/* Navegación de Hashtags */}
            <div className="bg-gray-900 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                    📊 Hashtags con más Intel sobre {destination.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3">
                    {hashtags.map((hashtag, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveHashtag(index)}
                            className={`p-3 md:p-4 rounded-xl transition-all text-left ${activeHashtag === index
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 transform scale-105'
                                    : 'bg-gray-800 hover:bg-gray-700'
                                }`}
                        >
                            <div className="font-bold text-base md:text-lg">{hashtag.displayName}</div>
                            <div className="text-xs md:text-sm text-gray-300">{hashtag.count} posts</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenido TikTok REAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                {/* Panel Izquierdo - Enlaces Directos */}
                <div className="bg-gray-900 rounded-2xl p-4 md:p-6">
                    <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                        🎯 Explorar en TikTok REAL
                    </h4>
                    <div className="space-y-3 md:space-y-4">
                        {tiktokUrls.map((url, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-3 md:p-4">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
                                    <div className="flex-1">
                                        <div className="font-semibold text-pink-400 text-sm md:text-base">
                                            #{hashtags[index]?.tag || `${destination.name.toLowerCase()}${index + 1}`}
                                        </div>
                                        <div className="text-xs md:text-sm text-gray-400">
                                            Ver videos reales de {destination.name}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => window.open(url, '_blank')}
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-semibold hover:opacity-90 transition-opacity w-full md:w-auto"
                                    >
                                        Ver TikToks →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Panel Derecho - Guía de Búsqueda */}
                <div className="bg-gray-900 rounded-2xl p-4 md:p-6">
                    <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                        🔍 Qué Buscar para Sacar Intel
                    </h4>

                    {destination.id === 'albania' && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-pink-900/30 p-3 rounded">
                                <strong>🏖️ Playas secretas:</strong> #albaniabeaches #ksamil #saranda
                            </div>
                            <div className="bg-purple-900/30 p-3 rounded">
                                <strong>💰 Precios reales:</strong> #albaniacheap #budgetalbania #tiranaprices
                            </div>
                            <div className="bg-blue-900/30 p-3 rounded">
                                <strong>🍽️ Comida local:</strong> #albanianfood #tiranafood #localalbania
                            </div>
                        </div>
                    )}

                    {destination.id === 'serbia' && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-pink-900/30 p-3 rounded">
                                <strong>🚢 Splavovi:</strong> #splavovi #belgradenightlife #danubeparty
                            </div>
                            <div className="bg-purple-900/30 p-3 rounded">
                                <strong>🍻 Vida nocturna:</strong> #belgradelife #serbianights #balkanparty
                            </div>
                            <div className="bg-blue-900/30 p-3 rounded">
                                <strong>💰 Precios:</strong> #belgradecheap #serbiabudget #cheapbelgrade
                            </div>
                        </div>
                    )}

                    {destination.id === 'georgia' && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-pink-900/30 p-3 rounded">
                                <strong>🍷 Vino georgiano:</strong> #georgianwine #tbilisiwine #winetasting
                            </div>
                            <div className="bg-purple-900/30 p-3 rounded">
                                <strong>🏔️ Montañas:</strong> #kazbegi #georgianmountains #caucasus
                            </div>
                            <div className="bg-blue-900/30 p-3 rounded">
                                <strong>🥟 Gastronomía:</strong> #georgianfood #khachapuri #tbilisifood
                            </div>
                        </div>
                    )}

                    {destination.id === 'malta' && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-pink-900/30 p-3 rounded">
                                <strong>🏝️ Islas:</strong> #comino #bluelagoon #gozo #maltatravel
                            </div>
                            <div className="bg-purple-900/30 p-3 rounded">
                                <strong>🎉 Fiesta:</strong> #paceville #maltanightlife #julians
                            </div>
                            <div className="bg-blue-900/30 p-3 rounded">
                                <strong>🏛️ Historia:</strong> #valletta #mdina #maltatourism
                            </div>
                        </div>
                    )}

                    {destination.id === 'norway' && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-pink-900/30 p-3 rounded">
                                <strong>🏔️ Fiordos:</strong> #norwayfjords #lofoten #preikestolen
                            </div>
                            <div className="bg-purple-900/30 p-3 rounded">
                                <strong>🚂 Transportes:</strong> #flamtrain #norwaytrain #bergen
                            </div>
                            <div className="bg-blue-900/30 p-3 rounded">
                                <strong>💸 Costos:</strong> #norwayexpensive #norwaytips #budgetnorway
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Call-to-Action Principal */}
            <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-center">
                <h3 className="text-3xl font-black mb-4">🎯 TU MISIÓN: INVESTIGAR EN TIKTOK</h3>
                <p className="text-lg mb-6 text-white/90">
                    TikTok es donde está la información REAL. Los influencers locales, los precios actuales, las fiestas secretas, los lugares que están de moda AHORA.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">📱</div>
                        <div className="font-semibold">Busca por hashtags</div>
                        <div className="text-sm text-white/80">#{destination.name.toLowerCase()}, #{hashtags[0]?.tag}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">👥</div>
                        <div className="font-semibold">Sigue influencers locales</div>
                        <div className="text-sm text-white/80">Gente que vive allí</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="font-semibold">Precios REALES</div>
                        <div className="text-sm text-white/80">No los de las guías</div>
                    </div>
                </div>

                <button
                    onClick={() => window.open(`https://www.tiktok.com/tag/${hashtags[activeHashtag]?.tag || destination.name.toLowerCase()}?lang=es`, '_blank')}
                    className="bg-black text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-900 transition-colors inline-flex items-center gap-3"
                >
                    🚀 EXPLORAR TIKTOK DE {destination.name.toUpperCase()}
                </button>
            </div>
        </div>
    );
}

window.TikTokFeed = TikTokFeed;