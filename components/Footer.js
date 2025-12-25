// Componente: Footer Profesional con Políticas del Grupo
function Footer() {
    const [showPolicies, setShowPolicies] = React.useState(false);
    const [showConduct, setShowConduct] = React.useState(false);
    const [showParty, setShowParty] = React.useState(false);
    const [showExpenses, setShowExpenses] = React.useState(false);

    const policies = [
        {
            id: 1,
            icon: "😴",
            title: "Artículo 1: Protección del Sueño de Junco",
            rule: "Queda ESTRICTAMENTE PROHIBIDO despertar a Junco antes de las 13:00h. Cualquier violación de esta norma resultará en mal humor generalizado y café obligatorio para todos.",
            severity: "CRÍTICO"
        },
        {
            id: 2,
            icon: "🏃",
            title: "Artículo 2: Protocolo Miguel Runner",
            rule: "Todo miembro del grupo debe estar mentalmente preparado para que Miguel proponga salir a correr en cualquier momento. La negativa es aceptable, pero el intento es inevitable.",
            severity: "ALTA"
        },
        {
            id: 3,
            icon: "🍕",
            title: "Artículo 3: Ley de la Napolitana Callejera",
            rule: "Si está Espejo, Ricardo automáticamente tiene derecho a comer napolitana en la calle. No se aceptan quejas ni juicios. Es tradición, es ley.",
            severity: "MEDIA"
        },
        {
            id: 4,
            icon: "🚶",
            title: "Artículo 4: Límite de Kilometraje Antonio",
            rule: "Las rutas a pie no podrán exceder los 5km sin descanso. Superar este límite activará el modo queja de Antonio, lo cual afecta la moral del grupo.",
            severity: "ALTA"
        },
        {
            id: 5,
            icon: "🛏️",
            title: "Artículo 5: Requisito Mínimo de Camas",
            rule: "El alojamiento DEBE tener camas individuales para todos. Sofás, colchonetas o 'dormir en el suelo' resultarán en la pérdida automática de Víctor del grupo.",
            severity: "CRÍTICO"
        },
        {
            id: 6,
            icon: "🍺",
            title: "Artículo 6: Reserva Estratégica de Cerveza",
            rule: "La nevera SIEMPRE debe contener cerveza fría para Junco y Ricardo. Es un derecho fundamental. El incumplimiento se considera crisis humanitaria.",
            severity: "CRÍTICA"
        },
        {
            id: 7,
            icon: "🃏",
            title: "Artículo 7: Presencia Obligatoria de Víctor en Cartas",
            rule: "Si se juega a las cartas, Víctor DEBE estar presente. Jugar sin él es ilegal y los resultados no son válidos. Es el alma del juego.",
            severity: "ALTA"
        },
        {
            id: 8,
            icon: "📱",
            title: "Artículo 8: Límite de Tiempo en Silencio Móvil",
            rule: "Estar con el móvil en silencio está limitado a 30 minutos máximo. Pasado ese tiempo, se debe volver a la conversación grupal. No somos antisociales.",
            severity: "MEDIA"
        },
        {
            id: 9,
            icon: "📞",
            title: "Artículo 9: Protocolo de Llamada Carolina",
            rule: "Si Antonio llama a Carolina, todos los presentes deben decir 'pase el porro' 3 veces de fondo. Es tradición sagrada e innegociable.",
            severity: "ALTA"
        }
    ];

    const conductRules = [
        {
            id: 1,
            icon: "🚽",
            title: "Regla 1: Santidad del Baño",
            rule: "Cagar es un acto SAGRADO. Se respeta el tiempo necesario sin preguntas ni presiones. El baño es zona de paz absoluta.",
            severity: "CRÍTICO"
        },
        {
            id: 2,
            icon: "🤫",
            title: "Regla 2: Silencio Nocturno",
            rule: "No hacer ruido mientras los demás duermen. El que rompa esta regla será juzgado severamente por la mañana (después de las 13:00h en el caso de Junco).",
            severity: "CRÍTICO"
        },
        {
            id: 3,
            icon: "🤝",
            title: "Regla 3: Respeto Mutuo",
            rule: "Lo que pasa en el viaje, se queda en el viaje. Excepto las anécdotas graciosas, esas son para siempre.",
            severity: "ALTA"
        }
    ];

    const partyRules = [
        {
            id: 1,
            icon: "🕺",
            title: "Indicador de Fiesta Exitosa: Miguel en el Suelo",
            rule: "Una fiesta NO se considera exitosa hasta que Miguel acabe tirado en el suelo bailando. Es el termómetro oficial de calidad de la noche.",
            severity: "CRÍTICO"
        },
        {
            id: 2,
            icon: "🎉",
            title: "Política de Diversión Obligatoria",
            rule: "Todos deben participar activamente. No se permiten 'estoy cansado' antes de las 3 AM. Después de esa hora, todo vale.",
            severity: "ALTA"
        },
        {
            id: 3,
            icon: "📸",
            title: "Documentación Fotográfica",
            rule: "Las fotos vergonzosas son obligatorias y serán usadas como chantaje amistoso durante años. Sonríe para la cámara.",
            severity: "MEDIA"
        }
    ];

    const expenseRules = [
        {
            id: 1,
            icon: "💸",
            title: "Filosofía Financiera del Grupo",
            rule: "TODO PERMITIDO SIN PENSAR. Somos estrellas del fútbol (en nuestra mente). Si lo quieres, cómpralo. Si lo ves, pruébalo. YOLO es nuestra política fiscal.",
            severity: "CRÍTICO"
        },
        {
            id: 2,
            icon: "🍻",
            title: "Inversión en Experiencias",
            rule: "El dinero gastado en cervezas, comida y actividades grupales NO cuenta como gasto, sino como inversión en recuerdos. ROI garantizado.",
            severity: "ALTA"
        },
        {
            id: 3,
            icon: "🤑",
            title: "División de Gastos",
            rule: "Se divide todo a partes iguales. No importa quién comió más o bebió menos. Las matemáticas complejas están prohibidas.",
            severity: "MEDIA"
        }
    ];

    const PolicySection = ({ title, rules, show, setShow, emoji }) => (
        <div className="mb-4">
            <button
                onClick={() => setShow(!show)}
                className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all flex items-center justify-between"
            >
                <span className="text-white font-bold flex items-center gap-3">
                    <span className="text-2xl">{emoji}</span>
                    {title}
                </span>
                <span className="text-white text-xl">{show ? '−' : '+'}</span>
            </button>

            {show && (
                <div className="mt-4 space-y-3 animate-fadeIn">
                    {rules.map((rule) => (
                        <div
                            key={rule.id}
                            className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 transition-all"
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-3xl flex-shrink-0">{rule.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <h3 className="text-base md:text-lg font-bold text-white">
                                            {rule.title}
                                        </h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${rule.severity === 'CRÍTICO' || rule.severity === 'CRÍTICA'
                                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                                : rule.severity === 'ALTA'
                                                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                                                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                                            }`}>
                                            {rule.severity}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                        {rule.rule}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-t border-white/10">
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-xl font-black mb-4 text-blue-400">Viaje Panas 2026</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            La plataforma definitiva para planificar el viaje épico del grupo.
                            Porque viajar con amigos es mejor... si sigues las reglas.
                        </p>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                                📱
                            </div>
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                                ✈️
                            </div>
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                                🌍
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-xl font-black mb-4 text-blue-400">Enlaces Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                    <span>🗺️</span> Destinos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                    <span>✈️</span> Vuelos
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                    <span>🏨</span> Alojamiento
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                                    <span>📊</span> Votaciones
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal (Meme) */}
                    <div>
                        <h3 className="text-xl font-black mb-4 text-blue-400">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button
                                    onClick={() => setShowPolicies(!showPolicies)}
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-left"
                                >
                                    <span>📜</span> Políticas del Grupo
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowConduct(!showConduct)}
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-left"
                                >
                                    <span>🤝</span> Código de Conducta
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowParty(!showParty)}
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-left"
                                >
                                    <span>🍺</span> Términos de Fiesta
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowExpenses(!showExpenses)}
                                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-left"
                                >
                                    <span>💰</span> Política de Gastos
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Expandable Sections */}
                {(showPolicies || showConduct || showParty || showExpenses) && (
                    <div className="mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3">
                                <span>⚖️</span>
                                Documentación Legal del Grupo
                            </h2>
                            <button
                                onClick={() => {
                                    setShowPolicies(false);
                                    setShowConduct(false);
                                    setShowParty(false);
                                    setShowExpenses(false);
                                }}
                                className="text-slate-400 hover:text-white transition-colors text-2xl"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-slate-300 text-sm mb-6 italic">
                            "Estas normas han sido establecidas tras años de experiencia viajera y múltiples incidentes documentados.
                            Su cumplimiento es esencial para la armonía del grupo y la supervivencia de todos."
                        </p>

                        <div className="space-y-4">
                            <PolicySection
                                title="📜 Políticas Generales del Grupo"
                                rules={policies}
                                show={showPolicies}
                                setShow={setShowPolicies}
                                emoji="📜"
                            />

                            <PolicySection
                                title="🤝 Código de Conducta"
                                rules={conductRules}
                                show={showConduct}
                                setShow={setShowConduct}
                                emoji="🤝"
                            />

                            <PolicySection
                                title="🍺 Términos y Condiciones de Fiesta"
                                rules={partyRules}
                                show={showParty}
                                setShow={setShowParty}
                                emoji="🍺"
                            />

                            <PolicySection
                                title="💰 Política de Gastos"
                                rules={expenseRules}
                                show={showExpenses}
                                setShow={setShowExpenses}
                                emoji="💰"
                            />
                        </div>

                        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <p className="text-blue-300 text-sm text-center">
                                💡 <strong>Nota Legal:</strong> Estas políticas son vinculantes y han sido ratificadas
                                por unanimidad (con Junco dormido, pero cuenta como voto afirmativo).
                                El incumplimiento resultará en vergüenza pública y memes eternos.
                            </p>
                        </div>
                    </div>
                )}

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                        <p>
                            © 2026 Viaje Panas. Todos los derechos reservados.
                            <span className="hidden md:inline"> | Hecho con ❤️ y mucho café ☕</span>
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                            <span>•</span>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                            <span>•</span>
                            <a href="#" className="hover:text-white transition-colors">Contacto</a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </footer>
    );
}

window.Footer = Footer;
