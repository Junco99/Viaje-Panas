// Componente: Tab de Vuelos
function FlightsTab({ destination, realPrices, loadingPrices }) {
    const deals = destination.flightData.deals;
    const kiwiUrl = `https://www.kiwi.com/es/search/results/madrid-espana/${destination.name.toLowerCase().replace(/\s+/g, '-')}/2026-08-05/2026-08-09/`;

    const realFlightsData = realPrices[destination.id];
    const isRealData = realFlightsData && realFlightsData.source === 'serpapi';
    const flightsToShow = isRealData && realFlightsData.flights ? realFlightsData.flights.slice(0, 3) : null;
    const isLoading = loadingPrices[destination.id];

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Cargando precios reales...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-6xl mb-4">✈️</div>
                <h3 className="text-4xl font-bold mb-3">Opciones de Vuelo</h3>
                <p className="text-xl">
                    Madrid ({destination.flightData.iataOrigin}) → {destination.name} ({destination.flightData.iataDestination})
                </p>


                {isRealData && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 border border-green-300 px-4 py-2 rounded-lg text-sm">
                        <span>✅</span>
                        <span>Precios en tiempo real de Google Flights</span>
                    </div>
                )}
            </div>

            {/* Flight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(isRealData && flightsToShow ? flightsToShow : deals).map((item, index) => {
                    const isReal = isRealData && flightsToShow;
                    const flight = isReal ? item : null;
                    const deal = isReal ? null : item;

                    return (
                        <div
                            key={index}
                            className={`info-card bg-white rounded-2xl shadow-lg p-6 border-2 ${index === 0 && isReal ? 'border-green-500' : 'border-gray-200'}`}
                        >
                            {index === 0 && isReal && (
                                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                                    ⭐ MEJOR PRECIO REAL
                                </div>
                            )}

                            {/* Times or Dates */}
                            <div className="text-center mb-4">
                                {isReal && <div className="text-sm text-gray-500 mb-2">HORARIO IDA</div>}
                                {isReal && (
                                    <div className="font-bold mb-2">
                                        {flight.departure} → {flight.arrival}
                                    </div>
                                )}
                                {!isReal && <div className="text-sm text-gray-500 mb-2">FECHAS</div>}
                                {!isReal && <div className="font-bold mb-2">{deal.date}</div>}
                            </div>

                            {/* Price */}
                            <div className="text-center mb-4">
                                <div className="text-4xl font-black text-green-600">
                                    {isReal ? flight.price : deal.price}
                                </div>
                                <div className="text-xs text-gray-500">por persona ida y vuelta</div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">✈️ Aerolínea:</span>
                                    <span className="font-semibold">
                                        {isReal ? flight.airline.name : destination.flightData.airline}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">⏱️ Duración:</span>
                                    <span className="font-semibold">
                                        {(isReal ? flight.duration : destination.flightData.duration) || 'Consultar'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">🔄 Escalas:</span>
                                    <span className={`font-semibold ${(isReal && flight.stops === 0) || (!isReal && deal.stops === 'Directo') ? 'text-green-600' : 'text-blue-600'}`}>
                                        {isReal ? flight.stopsText : deal.stops}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="text-center">
                <p className="text-gray-600 mb-4">
                    {isRealData ? '¿Quieres reservar estos vuelos o ver más opciones?' : '¿Quieres ver precios actualizados en tiempo real?'}
                </p>
                <a
                    href={kiwiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-xl hover:scale-105 transition-all"
                >
                    {isRealData ? '✈️ Reservar en Kiwi.com →' : '🔍 Ver todos los vuelos en Kiwi.com →'}
                </a>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-600">
                <p className="font-semibold mb-2">⚠️ Información importante:</p>
                <ul className="list-disc list-inside space-y-1">
                    {isRealData ? (
                        <li>Precios obtenidos en tiempo real de Google Flights</li>
                    ) : (
                        <li>Precios orientativos basados en búsquedas recientes</li>
                    )}
                    <li>Los precios finales pueden variar según disponibilidad</li>
                    <li>Recomendamos reservar con antelación para mejores tarifas</li>
                    <li>Haz clic en el botón de arriba para ver opciones actualizadas</li>
                </ul>
            </div>
        </div>
    );
}

window.FlightsTab = FlightsTab;
