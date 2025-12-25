// Componente: Clasificación de Votos
function VotingRanking({ votes, onBack }) {
    const destinations = window.destinations;

    // Calcular ranking
    const ranking = destinations
        .map(dest => ({
            ...dest,
            votesCount: votes[dest.id] || 0
        }))
        .sort((a, b) => b.votesCount - a.votesCount);

    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

    return (
        <div className="min-h-screen gradient-bg p-4 md:p-12 text-slate-200">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={onBack}
                    className="mb-10 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                >
                    ← Volver
                </button>

                <div className="glass-effect-enhanced rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
                    <h2 className="text-3xl font-black text-white mb-2 text-center tracking-tight">Clasificación</h2>
                    <p className="text-slate-400 text-center mb-12 text-[10px] uppercase tracking-[0.2em] font-bold">
                        {totalVotes} votos registrados
                    </p>

                    <div className="space-y-6">
                        {ranking.map((dest, index) => {
                            const percentage = totalVotes > 0 ? (dest.votesCount / totalVotes) * 100 : 0;
                            const isWinner = index === 0 && dest.votesCount > 0;

                            return (
                                <div
                                    key={dest.id}
                                    className={`relative p-4 rounded-2xl transition-all ${isWinner ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-white/5 border border-white/10'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isWinner ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                            {index + 1}
                                        </div>

                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-bold text-white text-sm tracking-tight">
                                                    {dest.flag} {dest.name}
                                                </h3>
                                                <span className={`font-black text-sm ${isWinner ? 'text-indigo-400' : 'text-slate-400'}`}>
                                                    {dest.votesCount}
                                                </span>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ease-out rounded-full ${isWinner ? 'bg-indigo-600' : 'bg-slate-400'}`}
                                                    style={{ width: `${Math.max(percentage, 1)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalVotes === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-300 font-medium italic">Esperando los primeros votos...</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-300 text-[10px] uppercase font-bold tracking-widest">
                        Registro de Votos Activo
                    </p>
                </div>
            </div>
        </div>
    );
}

window.VotingRanking = VotingRanking;
