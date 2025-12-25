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
        <div className="min-h-screen gradient-bg p-4 md:p-8">
            <div className="max-w-md mx-auto">
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                    <span className="text-2xl">←</span> Volver a Destinos
                </button>

                <div className="glass-effect-enhanced rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden relative">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                    <h2 className="text-3xl font-black text-white mb-2 text-center">🏆 CLASIFICACIÓN</h2>
                    <p className="text-white/60 text-center mb-8 text-sm uppercase tracking-widest font-bold">
                        {totalVotes} VOTOS REGISTRADOS
                    </p>

                    <div className="space-y-4">
                        {ranking.map((dest, index) => {
                            const percentage = totalVotes > 0 ? (dest.votesCount / totalVotes) * 100 : 0;
                            const isWinner = index === 0 && dest.votesCount > 0;

                            return (
                                <div
                                    key={dest.id}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                    className={`relative group overflow-hidden rounded-2xl transition-all duration-300 animate-fadeInUp ${isWinner ? 'bg-white/20 scale-105 shadow-xl ring-2 ring-yellow-400' : 'bg-white/10 hover:bg-white/15'
                                        }`}
                                >
                                    <div className="p-4 flex items-center gap-4 relative z-10">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white border border-white/20">
                                            {index + 1}
                                        </div>

                                        <div className="flex-grow">
                                            <div className="flex justify-between items-end mb-1">
                                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                                    {dest.flag} {dest.name}
                                                    {isWinner && <span className="text-yellow-400 animate-bounce">👑</span>}
                                                </h3>
                                                <span className="text-yellow-400 font-black text-xl">
                                                    {dest.votesCount}
                                                </span>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-1000 ease-out rounded-full ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                                        index === 1 ? 'bg-gradient-to-r from-slate-300 to-slate-400' :
                                                            'bg-gradient-to-r from-orange-400 to-red-500'
                                                        }`}
                                                    style={{ width: `${Math.max(percentage, 2)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover effect decoration */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </div>
                            );
                        })}
                    </div>

                    {totalVotes === 0 && (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-4">🗳️</div>
                            <p className="text-white/50">Aún no hay votos. ¡Sé el primero en votar!</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-white/40 text-xs italic">
                        * Los votos son anónimos pero persistentes.
                        ¡No intentes hackear el sistema, Eric! 🚫
                    </p>
                </div>
            </div>
        </div>
    );
}

window.VotingRanking = VotingRanking;
