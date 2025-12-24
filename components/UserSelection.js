// Componente: Selección de Usuario Mejorado - RESPONSIVE
function UserSelection({ onUserSelect }) {
    const [hoveredUser, setHoveredUser] = React.useState(null);
    
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
            {/* Elementos decorativos de fondo - Adaptados para móvil */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-5 left-5 md:top-10 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[500px] md:h-[500px] bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
            
            <div className="container-responsive w-full text-center relative z-10">
                {/* Header animado - RESPONSIVE */}
                <div className="mb-8 md:mb-12 animate-fade-in">
                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl md:text-3xl animate-bounce">
                            🌍
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl">
                            ¿QUIÉN ERES?
                        </h1>
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-xl md:text-3xl animate-bounce delay-200">
                            ✈️
                        </div>
                    </div>
                    <p className="text-xl md:text-3xl text-white/90 mb-3 md:mb-4 font-semibold px-4">
                        Selecciona tu perfil de Pana
                    </p>
                    <p className="text-base md:text-xl text-white/70 px-4">
                        Cada perfil tiene su propia personalidad y estilo de viaje
                    </p>
                </div>
                
                {/* Grid de usuarios - COMPLETAMENTE RESPONSIVE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                    {window.panas.map((pana, index) => (
                        <div
                            key={pana.id}
                            onClick={() => onUserSelect(pana)}
                            onMouseEnter={() => setHoveredUser(pana.id)}
                            onMouseLeave={() => setHoveredUser(null)}
                            className="relative group cursor-pointer"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                            }}
                        >
                            {/* Card principal - RESPONSIVE */}
                            <div 
                                className="relative glass-effect-enhanced backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-8 transition-all duration-300 border-2 md:border-4 hover:scale-105 md:hover:scale-110 hover:rotate-1 md:hover:rotate-2 hover:shadow-2xl overflow-hidden"
                                style={{
                                    borderColor: hoveredUser === pana.id ? pana.color : 'rgba(255,255,255,0.2)',
                                    transform: hoveredUser === pana.id ? 'scale(1.05) rotate(-1deg)' : 'scale(1)',
                                    boxShadow: hoveredUser === pana.id ? `0 15px 40px ${pana.color}40` : 'none'
                                }}
                            >
                                {/* Efecto de brillo en hover */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, ${pana.color}20, transparent 70%)`
                                    }}
                                />
                                
                                {/* Contenido - RESPONSIVE */}
                                <div className="relative z-10">
                                    {/* Emoji con animación */}
                                    <div className="text-4xl md:text-7xl mb-3 md:mb-4 transform group-hover:scale-125 transition-transform duration-300 group-hover:rotate-12">
                                        {pana.emoji}
                                    </div>
                                    
                                    {/* Nombre */}
                                    <h3 className="text-lg md:text-2xl font-black text-white mb-1 md:mb-2 group-hover:text-shadow-lg">
                                        {pana.name}
                                    </h3>
                                    
                                    {/* Personalidad */}
                                    <p className="text-white/90 text-xs md:text-sm font-bold mb-2 md:mb-3 px-2 py-1 bg-white/10 rounded-full inline-block">
                                        {pana.personality}
                                    </p>
                                    
                                    {/* Descripción */}
                                    <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 md:min-h-[3rem]">
                                        {pana.description}
                                    </p>
                                    
                                    {/* Vibe - se muestra en hover solo en desktop */}
                                    <div 
                                        className="hidden md:block text-white/70 text-xs italic mb-4 h-12 transition-all duration-300"
                                        style={{
                                            opacity: hoveredUser === pana.id ? 1 : 0,
                                            transform: hoveredUser === pana.id ? 'translateY(0)' : 'translateY(10px)'
                                        }}
                                    >
                                        "{pana.vibe}"
                                    </div>
                                    
                                    {/* Intereses - RESPONSIVE */}
                                    <div className="flex flex-wrap gap-1 md:gap-2 justify-center mb-3 md:mb-4">
                                        {pana.interests.map(interest => (
                                            <span 
                                                key={interest} 
                                                className="text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold transition-all duration-300"
                                                style={{
                                                    backgroundColor: hoveredUser === pana.id ? `${pana.color}60` : 'rgba(255,255,255,0.2)'
                                                }}
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* Botón de selección - RESPONSIVE */}
                                    <button
                                        className="btn-primary-enhanced w-full py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-white transition-all duration-300 transform group-hover:scale-105 text-sm md:text-base"
                                        style={{
                                            backgroundColor: hoveredUser === pana.id ? pana.color : 'rgba(255,255,255,0.2)',
                                            boxShadow: hoveredUser === pana.id ? `0 10px 30px ${pana.color}50` : 'none'
                                        }}
                                    >
                                        {hoveredUser === pana.id ? '🚀 ¡Soy yo!' : '👆 Seleccionar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Footer informativo - RESPONSIVE */}
                <div className="glass-effect-enhanced backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 max-w-2xl mx-auto">
                    <p className="text-white/90 text-sm md:text-lg">
                        💡 <strong>Tip:</strong> Tu selección personalizará las recomendaciones y el estilo de tu experiencia de viaje
                    </p>
                </div>
            </div>
            
            {/* Estilos para animaciones */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-fade-in {
                    animation: fadeIn 1s ease-out;
                }
                
                .delay-200 {
                    animation-delay: 0.2s;
                }
                
                .delay-500 {
                    animation-delay: 0.5s;
                }
                
                .delay-1000 {
                    animation-delay: 1s;
                }
                
                @media (max-width: 640px) {
                    .line-clamp-3 {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
            `}</style>
        </div>
    );
}

window.UserSelection = UserSelection;