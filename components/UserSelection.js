// Componente: Selección de Usuario - GLASSMORPHISM PROFESIONAL + EFECTOS MÓVIL
function UserSelection({ onUserSelect }) {
    const [hoveredUser, setHoveredUser] = React.useState(null);
    const [touchedUser, setTouchedUser] = React.useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Elementos decorativos sutiles y profesionales */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-6xl relative z-10">
                {/* Header profesional */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
                        Viaje Panas 2026
                    </h1>
                    <p className="text-base md:text-xl text-slate-300 font-medium max-w-lg mx-auto drop-shadow-lg">
                        Selecciona tu perfil para personalizar la experiencia
                    </p>
                </div>

                {/* Grid de usuarios - GLASSMORPHISM PROFESIONAL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {window.panas.map((pana, index) => (
                        <div
                            key={pana.id}
                            onClick={() => onUserSelect(pana)}
                            onMouseEnter={() => setHoveredUser(pana.id)}
                            onMouseLeave={() => setHoveredUser(null)}
                            onTouchStart={() => setTouchedUser(pana.id)}
                            onTouchEnd={() => setTimeout(() => setTouchedUser(null), 300)}
                            className="group cursor-pointer"
                            style={{
                                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                            }}
                        >
                            {/* Card GLASSMORPHISM profesional con efecto 3D */}
                            <div
                                className={`relative rounded-3xl p-6 md:p-8 transition-all duration-300 border overflow-hidden ${hoveredUser === pana.id || touchedUser === pana.id
                                    ? 'border-blue-400/60 shadow-2xl shadow-blue-500/20'
                                    : 'border-white/10 shadow-xl hover:shadow-2xl'
                                    }`}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(20px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                    transform: touchedUser === pana.id
                                        ? 'perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(0.98)'
                                        : hoveredUser === pana.id
                                            ? 'scale(1.03)'
                                            : 'scale(1)',
                                    transformStyle: 'preserve-3d',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {/* Brillo y pulso en touch/hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent transition-opacity duration-300 ${touchedUser === pana.id ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'
                                    }`}></div>

                                {/* Efecto de onda en touch (móvil) */}
                                {touchedUser === pana.id && (
                                    <div className="absolute inset-0 animate-ping opacity-20" style={{ animationDuration: '0.6s' }}>
                                        <div className="absolute inset-0 rounded-3xl border-4 border-blue-400"></div>
                                    </div>
                                )}

                                {/* Contenido */}
                                <div className="relative z-10">
                                    {/* Emoji grande */}
                                    <div className={`text-6xl md:text-7xl mb-4 transition-transform duration-300 text-center drop-shadow-lg ${touchedUser === pana.id ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                                        }`}>
                                        {pana.emoji}
                                    </div>

                                    {/* Nombre - SUPER LEGIBLE */}
                                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 text-center drop-shadow-md">
                                        {pana.name}
                                    </h3>

                                    {/* Personalidad - Color profesional */}
                                    <p className="text-xs md:text-sm uppercase font-bold tracking-wider text-blue-400 mb-4 text-center drop-shadow-md">
                                        {pana.personality}
                                    </p>

                                    {/* Descripción - TEXTO LEGIBLE */}
                                    <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-5 text-center line-clamp-3 drop-shadow-md font-medium">
                                        {pana.description}
                                    </p>

                                    {/* Tags de intereses - Profesionales */}
                                    <div className="flex flex-wrap gap-2 justify-center mb-5">
                                        {pana.interests.slice(0, 3).map(interest => (
                                            <span
                                                key={interest}
                                                className="bg-white/15 backdrop-blur-sm text-slate-200 px-3 py-1.5 rounded-full text-xs font-bold border border-white/20 drop-shadow-md"
                                            >
                                                {interest}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Botón profesional con feedback táctil */}
                                    <button
                                        className={`w-full py-3.5 md:py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 border ${hoveredUser === pana.id || touchedUser === pana.id
                                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30 scale-[0.98]'
                                            : 'bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20'
                                            }`}
                                    >
                                        {hoveredUser === pana.id || touchedUser === pana.id ? '✓ Seleccionar' : 'Continuar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer profesional */}
                <div className="text-center">
                    <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3">
                        <p className="text-sm md:text-base text-slate-300 font-medium drop-shadow-md">
                            🔒 Tu selección personalizará las recomendaciones de viaje
                        </p>
                    </div>
                </div>
            </div>

            {/* Estilos para animaciones */}
            <style>{`
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
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

window.UserSelection = UserSelection;