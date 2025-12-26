// Componente: Card de Votación - RESPONSIVE
function VotingCard({ destination, votes, totalVotes, hasVoted, votedFor, onVote, onViewDetails, selectedUser }) {
    const voteCount = votes[destination.id] || 0;
    const votePercentage = totalVotes > 0 ? (voteCount / totalVotes * 100).toFixed(1) : 0;
    const isUserVote = votedFor === destination.id;

    return (
        <div
            className={`vote-card ${isUserVote ? 'voted' : ''} card-enhanced relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-[1.03] mx-2 md:mx-0 group`}
            style={{
                background: `linear-gradient(to bottom, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.9)), url(${destination.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '480px'
            }}
        >
            {/* Overlay de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {isUserVote && (
                <div className="absolute top-0 left-0 right-0 bg-slate-900 text-white text-center py-2 font-bold text-[10px] tracking-widest z-10 uppercase">
                    Seleccionado por ti
                </div>
            )}

            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between text-white">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl md:text-4xl font-bold drop-shadow-lg">{destination.flag}</span>
                        <div className="flex gap-1 flex-wrap">
                            {destination.bestFor.slice(0, 2).map(tag => (
                                <span key={tag} className="bg-white/10 backdrop-blur-md px-2 py-1 md:px-3 md:py-1 rounded text-[9px] font-bold uppercase tracking-wider text-white border border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">{destination.name}</h3>
                    <p className="text-base md:text-lg text-white mb-4 drop-shadow-lg line-clamp-2">{destination.tagline}</p>

                    <div className="space-y-2">
                        <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Estancia</span>
                            <span className="text-[11px] font-bold">{destination.price}</span>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Vuelo</span>
                            <span className="text-[11px] font-bold">{destination.flightData.airline}</span>
                        </div>
                    </div>
                </div>

                <div>
                    {hasVoted && (
                        <div className="bg-black/40 backdrop-blur rounded-xl p-3 md:p-4 mb-3 border border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold tracking-tight">{voteCount} votos</span>
                                <span className="text-lg font-black">{votePercentage}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-white h-full rounded-full transition-all duration-500"
                                    style={{ width: `${votePercentage}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={() => onViewDetails(destination)}
                            className="flex-1 bg-white text-slate-900 px-4 py-2.5 rounded-lg font-bold transition-all hover:bg-slate-100 text-[11px] uppercase tracking-widest border-none"
                        >
                            Ver Detalles
                        </button>

                        {!hasVoted && (
                            <button
                                onClick={() => onVote(destination.id)}
                                className="flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-bold transition-all hover:bg-indigo-700 text-[11px] uppercase tracking-widest border-none"
                            >
                                Seleccionar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.VotingCard = VotingCard;
