// Componente: Card de Votación - RESPONSIVE
function VotingCard({ destination, votes, totalVotes, hasVoted, votedFor, onVote, onViewDetails, selectedUser }) {
    const voteCount = votes[destination.id] || 0;
    const votePercentage = totalVotes > 0 ? (voteCount / totalVotes * 100).toFixed(1) : 0;
    const isUserVote = votedFor === destination.id;
    
    return (
        <div 
            className={`vote-card ${isUserVote ? 'voted' : ''} card-enhanced relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 mx-2 md:mx-0`}
            style={{ 
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${destination.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '450px'
            }}
        >
            {isUserVote && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-2 font-bold text-xs md:text-sm z-10">
                    ✓ HAS VOTADO ESTE DESTINO
                </div>
            )}
            
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between text-white">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl md:text-4xl font-bold drop-shadow-lg">{destination.flag}</span>
                        {destination.bestFor && (
                            <div className="flex gap-1 flex-wrap">
                                {destination.bestFor.slice(0, 2).map(tag => (
                                    <span key={tag} className="glass-effect-enhanced px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">{destination.name}</h3>
                    <p className="text-base md:text-lg text-gray-100 mb-4 drop-shadow line-clamp-2">{destination.tagline}</p>
                    
                    <div className="space-y-2 text-xs md:text-sm">
                        <div className="glass-effect-enhanced px-3 py-2 rounded-lg">
                            <span className="font-bold">💰 </span>
                            <span className="text-xs md:text-sm">{destination.price}</span>
                        </div>
                        <div className="glass-effect-enhanced px-3 py-2 rounded-lg">
                            <span className="font-bold">✈️ </span>
                            <span className="text-xs md:text-sm">{destination.flightData.airline} - {destination.flightData.duration}</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    {hasVoted && (
                        <div className="glass-effect-enhanced backdrop-blur rounded-lg md:rounded-xl p-3 md:p-4 mb-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-base md:text-lg font-bold">{voteCount} votos</span>
                                <span className="text-xl md:text-2xl font-bold">{votePercentage}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2 md:h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${votePercentage}%` }}
                                />
                            </div>
                        </div>
                    )}
                    
                    <div className="flex gap-2 md:gap-3">
                        <button
                            onClick={() => onViewDetails(destination)}
                            className="btn-primary-enhanced flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl font-bold transition-all shadow-lg hover:shadow-xl text-xs md:text-sm"
                        >
                            👁️ <span className="hidden sm:inline">Ver </span>Detalles
                        </button>
                        
                        {!hasVoted && (
                            <button
                                onClick={() => onVote(destination.id)}
                                className="btn-primary-enhanced flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl font-bold transition-all shadow-lg hover:shadow-xl badge-animate text-xs md:text-sm"
                            >
                                🗳️ Votar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

window.VotingCard = VotingCard;
