// App Principal
function App() {
    const [currentView, setCurrentView] = React.useState('user-selection');
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [votes, setVotes] = React.useState({});
    const [hasVoted, setHasVoted] = React.useState(false);
    const [votedFor, setVotedFor] = React.useState(null);
    const [totalVotes, setTotalVotes] = React.useState(0);
    const [selectedDestination, setSelectedDestination] = React.useState(null);
    const [realPrices, setRealPrices] = React.useState({});
    const [loadingPrices, setLoadingPrices] = React.useState({});
    const [pricesLoaded, setPricesLoaded] = React.useState({});
    const [secretCount, setSecretCount] = React.useState(0);
    const [showMemes, setShowMemes] = React.useState(false);



    const handleSecretClick = () => {
        const newCount = secretCount + 1;
        setSecretCount(newCount);
        if (newCount === 7) {
            setShowMemes(true);
            setSecretCount(0);
        }
    };

    // Cargar datos al iniciar y escuchar cambios en tiempo real
    React.useEffect(() => {
        loadSelectedUser();
        loadVotes();

        // Escuchar cambios en votos en tiempo real
        if (window.firebaseDB && window.firebaseDB.onVotesChange) {
            const unsubscribe = window.firebaseDB.onVotesChange((newVotes) => {
                setVotes(newVotes);
                const total = Object.values(newVotes).reduce((sum, count) => sum + count, 0);
                setTotalVotes(total);
            });
            // Cleanup al desmontar
            return () => unsubscribe();
        }
    }, []);

    // Effect to check for local storage user on mount
    React.useEffect(() => {
        const savedUserId = localStorage.getItem('panas_selected_user');
        if (savedUserId && window.panas) {
            const user = window.panas.find(p => p.id === savedUserId);
            if (user) {
                // Restore user session without triggering a full re-selection logic yet
                // We will let loadSelectedUser handle the firebase verification part
                console.log("Restoring session for:", user.name);
                setSelectedUser(user);
                setCurrentView('voting');
            }
        }
    }, []);

    // Modificado para usar el usuario persistido correctamente
    const loadSelectedUser = async () => {
        // Obtenemos el ID del storage o del state si ya se seteo en el efecto anterior
        let userIdToLoad = selectedUser?.id;

        if (!userIdToLoad) {
            userIdToLoad = localStorage.getItem('panas_selected_user');
        }

        if (!userIdToLoad) return;

        try {
            // Asegurar que tenemos el objeto usuario completo si venimos del storage
            if (!selectedUser && window.panas) {
                const userObj = window.panas.find(p => p.id === userIdToLoad);
                if (userObj) setSelectedUser(userObj);
            }

            if (!window.firebaseDB) throw new Error('Firebase DB not initialized');

            // Verificación opcional con Firebase (solo para asegurar consistencia)
            const user = await window.firebaseDB.getUserSelection(userIdToLoad);

            // Si el usuario existe, aseguramos la vista
            setCurrentView('voting');

            // Verificar si ya votó
            const voted = await window.firebaseDB.hasUserVoted(userIdToLoad);
            setHasVoted(voted);

            if (voted) {
                const votedDestination = await window.firebaseDB.getUserVote(userIdToLoad);
                setVotedFor(votedDestination);
            }

        } catch (error) {
            console.error('Error loading user:', error);
        }
    };


    const selectUser = async (user) => {
        setSelectedUser(user);
        setCurrentView('voting');

        // Persistir en local
        localStorage.setItem('panas_selected_user', user.id);

        try {
            await window.firebaseDB.saveUserSelection(user);

            // Verificar si ya votó
            const voted = await window.firebaseDB.hasUserVoted(user.id);
            setHasVoted(voted);

            if (voted) {
                const votedDestination = await window.firebaseDB.getUserVote(user.id);
                setVotedFor(votedDestination);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };


    const logoutUser = async () => {
        if (selectedUser) {
            try {
                await window.firebaseDB.removeUserSelection(selectedUser.id);
            } catch (error) {
                console.error('Error removing user:', error);
            }
        }

        localStorage.removeItem('panas_selected_user');
        setSelectedUser(null);
        setCurrentView('user-selection');
        setHasVoted(false);
        setVotedFor(null);
    };


    const loadVotes = async () => {
        try {
            if (!window.firebaseDB) throw new Error('Firebase DB not initialized');
            const votes = await window.firebaseDB.getVotes();
            setVotes(votes);

            const total = Object.values(votes).reduce((sum, count) => sum + count, 0);
            setTotalVotes(total);

            // Si hay usuario seleccionado, verificar su voto
            const currentUserId = selectedUser?.id || localStorage.getItem('panas_selected_user');

            if (currentUserId) {
                const voted = await window.firebaseDB.hasUserVoted(currentUserId);
                setHasVoted(voted);

                if (voted) {
                    const votedDestination = await window.firebaseDB.getUserVote(currentUserId);
                    setVotedFor(votedDestination);
                }
            }
        } catch (error) {
            console.error('Error loading votes:', error);
        }
    };


    const saveVote = async (destinationId) => {
        if (hasVoted || !selectedUser) return;

        try {
            const success = await window.firebaseDB.saveVote(selectedUser.id, destinationId);

            if (success) {
                setHasVoted(true);
                setVotedFor(destinationId);

                // Los votos se actualizan automáticamente por el listener

            }
        } catch (error) {
            console.error('Error saving vote:', error);
        }
    };

    const resetVotes = async () => {
        if (!confirm('¿Seguro que quieres borrar TODOS los votos? Esta acción no se puede deshacer.')) return;

        try {
            const success = await window.firebaseDB.resetVotes();
            if (success) {
                setHasVoted(false);
                setVotedFor(null);
                // Los votos se actualizan automáticamente por el listener
                alert('Votos reseteados correctamente');
            }
        } catch (error) {
            console.error('Error resetting votes:', error);
            alert('Error al resetear votos');
        }
    };

    const loadRealPrice = async (destinationId) => {
        if (pricesLoaded[destinationId]) {
            console.log(`Precios ya cargados para ${destinationId}`);
            return;
        }

        setLoadingPrices(prev => ({ ...prev, [destinationId]: true }));
        setPricesLoaded(prev => ({ ...prev, [destinationId]: true }));

        console.log(`🔄 Cargando precios para ${destinationId}...`);
        const priceData = await window.getFlightPrices(destinationId);

        setRealPrices(prev => ({
            ...prev,
            [destinationId]: priceData
        }));

        setLoadingPrices(prev => ({ ...prev, [destinationId]: false }));
    };



    // RENDER: Selección de usuario
    if (currentView === 'user-selection') {
        return <UserSelection onUserSelect={selectUser} />;
    }

    // RENDER: Vista detallada
    if (selectedDestination) {
        return (
            <DestinationDetail
                destination={selectedDestination}
                onBack={() => setSelectedDestination(null)}
                realPrices={realPrices}
                loadingPrices={loadingPrices}
                onLoadPrices={loadRealPrice}
            />
        );
    }

    // RENDER: Vista de clasificación
    if (currentView === 'ranking') {
        return (
            <VotingRanking
                votes={votes}
                onBack={() => setCurrentView('voting')}
            />
        );
    }

    // RENDER: Vista de votación
    return (
        <div className="min-h-screen gradient-bg text-slate-200 font-sans">
            <div className="container-responsive py-8 md:py-12">
                <div className="text-center mb-10 md:mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                        <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200">
                            <p className="text-sm font-bold text-slate-900 tracking-tight">
                                {selectedUser?.name}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">
                                {selectedUser?.personality}
                            </p>
                        </div>
                        <button
                            onClick={logoutUser}
                            className="text-slate-400 hover:text-slate-600 font-bold transition-all text-[11px] uppercase tracking-widest"
                        >
                            Cambiar Usuario
                        </button>
                    </div>

                    <h1
                        onClick={handleSecretClick}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight cursor-default select-none active:scale-95 transition-transform"
                    >
                        Viaje Panas 2026
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-lg mx-auto">
                        Selecciona el próximo destino para nuestra aventura.
                    </p>

                    {totalVotes > 0 && (
                        <div className="flex flex-col items-center gap-6 mt-8">
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-200 pb-2">
                                Participación: {totalVotes} votos
                            </div>
                            <button
                                onClick={() => setCurrentView('ranking')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-md transition-all"
                            >
                                Ver Clasificación
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
                    {window.destinations.map(destination => (
                        <VotingCard
                            key={destination.id}
                            destination={destination}
                            votes={votes}
                            totalVotes={totalVotes}
                            hasVoted={hasVoted}
                            votedFor={votedFor}
                            onVote={saveVote}
                            onViewDetails={setSelectedDestination}
                            selectedUser={selectedUser}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={resetVotes}
                        className="text-slate-300 hover:text-red-400 transition-all text-[10px] font-bold uppercase tracking-widest"
                    >
                        Resetear Votos (Admin)
                    </button>
                </div>


            </div>

            {/* Footer con políticas del grupo */}
            <Footer />

            {/* EASTER EGG MEMES */}
            {showMemes && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowMemes(false)}>
                    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-bounce">
                        <img src="assets/meme1.jpeg" alt="Meme 1" className="rounded-xl shadow-2xl border-4 border-yellow-400 rotate-[-5deg]" />
                        <img src="assets/meme2.jpeg" alt="Meme 2" className="rounded-xl shadow-2xl border-4 border-yellow-400 rotate-[5deg]" />
                    </div>
                </div>
            )}


        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
