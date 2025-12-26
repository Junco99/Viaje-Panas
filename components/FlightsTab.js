// Componente: Tab de Vuelos
function FlightsTab({ destination, realPrices, loadingPrices }) {
    const deals = destination.flightData.deals;
    const kiwiUrl = `https://www.kiwi.com/es/search/results/madrid-espana/${destination.kiwiSlug || destination.id}/2026-08-05/2026-08-09/`;

    const realFlightsData = realPrices[destination.id];
    const isRealData = realFlightsData && realFlightsData.source === 'serpapi';
    const flightsToShow = isRealData && realFlightsData.flights ? realFlightsData.flights.slice(0, 3) : null;
    const isLoading = loadingPrices[destination.id];

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-4"></div>
                <p className="text-slate-400 font-medium">Cargando precios reales...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-slate-900 text-white rounded-2xl shadow-sm p-8 text-center border border-slate-800">
                <h3 className="text-3xl font-extrabold mb-2 tracking-tight">Opciones de Vuelo</h3>
                <p className="text-slate-400 font-medium">
                    {destination.flightData.iataOrigin} — {destination.flightData.iataDestination} • Agosto 2026
                </p>

                {isRealData && (
                    <div className="mt-6 inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/30 px-3 py-1.5 rounded-full text-[11px] font-bold text-indigo-300 uppercase tracking-widest">
                        <span>Verificado por Google Flights</span>
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
                            className={`bg-white rounded-2xl shadow-sm p-6 border ${index === 0 && isReal ? 'border-indigo-500 ring-1 ring-indigo-500/20' : 'border-slate-200'}`}
                        >
                            {index === 0 && isReal && (
                                <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold mb-4 inline-block tracking-widest uppercase">
                                    Mejor Oferta
                                </div>
                            )}

                            {/* Times or Dates */}
                            <div className="mb-6 space-y-4">
                                {isReal && (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center group">
                                            <div className="text-left">
                                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Ida</div>
                                                <div className="text-xl font-bold text-slate-900 font-display">
                                                    {flight.departure}
                                                </div>
                                            </div>
                                            <div className="flex-1 border-t border-dashed border-slate-200 mx-4 mt-4"></div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Llegada</div>
                                                <div className="text-xl font-bold text-slate-900 font-display">
                                                    {flight.arrival}
                                                </div>
                                            </div>
                                        </div>

                                        {flight.returnDeparture && (
                                            <div className="flex justify-between items-center pt-4 border-t border-slate-50 group">
                                                <div className="text-left">
                                                    <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Vuelta</div>
                                                    <div className="text-xl font-bold text-slate-900 font-display">
                                                        {flight.returnDeparture}
                                                    </div>
                                                </div>
                                                <div className="flex-1 border-t border-dashed border-slate-200 mx-4 mt-4"></div>
                                                <div className="text-right">
                                                    <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Llegada</div>
                                                    <div className="text-xl font-bold text-slate-900 font-display">
                                                        {flight.returnArrival}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {!flight.returnDeparture && (
                                            <div className="text-[10px] text-slate-400 font-medium">
                                                * Incluye trayecto de regreso
                                            </div>
                                        )}
                                    </div>
                                )}
                                {!isReal && (
                                    <div className="text-center">
                                        <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">Fechas</div>
                                        <div className="text-lg font-bold text-slate-900">{deal.date}</div>
                                    </div>
                                )}
                            </div>

                            {/* Price */}
                            <div className="text-center mb-6 bg-slate-50 rounded-xl py-4 border border-slate-100">
                                <div className="text-3xl font-extrabold text-indigo-600 font-display">
                                    {isReal ? flight.price : deal.price}
                                </div>
                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Precio total ida y vuelta</div>
                            </div>

                            {/* Action */}
                            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3">
                                {isReal && flight.bookingUrl && (
                                    <a
                                        href={flight.bookingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                                    >
                                        Reservar Vuelo
                                    </a>
                                )}
                                {!isReal && (
                                    <a
                                        href={kiwiUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                                    >
                                        Ver en Kiwi.com
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA - Solo si estamos en modo mock (sin precios reales) */}
            {!isRealData && (
                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        ¿Quieres ver precios actualizados en tiempo real?
                    </p>
                    <a
                        href={kiwiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-xl hover:scale-105 transition-all"
                    >
                        🔍 Ver todos los vuelos en Kiwi.com →
                    </a>
                </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500">
                <p className="font-bold uppercase tracking-widest text-slate-400 mb-3">Información de Reserva</p>
                <ul className="space-y-2 list-none">
                    <li className="flex gap-2">
                        <span className="text-slate-300">•</span>
                        <span>{isRealData ? 'Precios obtenidos en tiempo real de Google Flights.' : 'Precios orientativos basados en búsquedas recientes.'}</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-slate-300">•</span>
                        <span>Los precios finales pueden variar según la disponibilidad de la aerolínea.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-slate-300">•</span>
                        <span>Se recomienda realizar la reserva con el suficiente margen de tiempo.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

window.FlightsTab = FlightsTab;
