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

    // Cargar datos al iniciar
    React.useEffect(() => {
        loadVotes();
        loadSelectedUser();
    }, []);

    const loadSelectedUser = async () => {
        try {
            const { value } = await window.storage.get('selected-user');
            if (value && value !== '{}') {
                const user = JSON.parse(value);
                setSelectedUser(user);
                setCurrentView('voting');
            }
        } catch (error) {
            console.error('Error loading user:', error);
        }
    };

    const selectUser = async (user) => {
        setSelectedUser(user);
        setCurrentView('voting');
        try {
            await window.storage.set('selected-user', JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const logoutUser = async () => {
        setSelectedUser(null);
        setCurrentView('user-selection');
        try {
            await window.storage.set('selected-user', '{}');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const loadVotes = async () => {
        try {
            const { value } = await window.storage.get('travel-votes');
            if (value && value !== '{}') {
                const savedVotes = JSON.parse(value);
                setVotes(savedVotes);
                setTotalVotes(Object.values(savedVotes).reduce((sum, count) => sum + count, 0));
            }

            const { value: hasVotedValue } = await window.storage.get('has-voted');
            setHasVoted(hasVotedValue === 'true');

            const { value: votedForValue } = await window.storage.get('voted-for');
            setVotedFor(votedForValue);
        } catch (error) {
            console.error('Error loading votes:', error);
        }
    };

    const saveVote = async (destinationId) => {
        if (hasVoted) return;

        const newVotes = { ...votes };
        newVotes[destinationId] = (newVotes[destinationId] || 0) + 1;

        setVotes(newVotes);
        setHasVoted(true);
        setVotedFor(destinationId);
        setTotalVotes(totalVotes + 1);

        try {
            await window.storage.set('travel-votes', JSON.stringify(newVotes));
            await window.storage.set('has-voted', 'true');
            await window.storage.set('voted-for', destinationId);
        } catch (error) {
            console.error('Error saving vote:', error);
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

    const resetVotes = async () => {
        setVotes({});
        setHasVoted(false);
        setVotedFor(null);
        setTotalVotes(0);

        try {
            await window.storage.set('travel-votes', '{}');
            await window.storage.set('has-voted', 'false');
            await window.storage.set('voted-for', '');
        } catch (error) {
            console.error('Error resetting votes:', error);
        }
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

    // RENDER: Vista de votación - RESPONSIVE
    return (
        <div className="min-h-screen gradient-bg">
            <div className="container-responsive py-6 md:py-8">
                <div className="text-center text-white mb-6 md:mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
                        <div className="glass-effect-enhanced px-4 py-3 md:px-6 md:py-3 rounded-xl md:rounded-2xl">
                            <p className="text-lg md:text-xl font-bold">
                                {selectedUser?.emoji} {selectedUser?.name || 'Pana'}
                            </p>
                            <p className="text-xs md:text-sm text-white/70">
                                {selectedUser?.personality || 'Bienvenido'}
                            </p>
                        </div>
                        <button
                            onClick={logoutUser}
                            className="btn-secondary-enhanced glass-effect-enhanced hover:bg-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-bold transition-all text-sm md:text-base"
                        >
                            🔄 <span className="hidden sm:inline">Cambiar </span>Usuario
                        </button>
                    </div>

                    <h1 className="text-3xl md:text-6xl font-black mb-3 md:mb-4 drop-shadow-lg px-4">
                        🌍 PANAS VIAJE 2026 🌍
                    </h1>
                    <p className="text-lg md:text-2xl mb-4 md:mb-6 text-white/90 px-4">
                        Elige nuestro próximo destino épico
                    </p>

                    {totalVotes > 0 && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="glass-effect-enhanced inline-block px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold">
                                📊 Total votos: {totalVotes}
                            </div>
                            <button
                                onClick={() => setCurrentView('ranking')}
                                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                🏆 Ver Clasificación
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

                {hasVoted && (
                    <div className="text-center px-4">
                        <button
                            onClick={resetVotes}
                            className="btn-secondary-enhanced glass-effect-enhanced hover:bg-red-500/50 text-white px-6 py-3 md:px-8 md:py-3 rounded-xl md:rounded-2xl font-bold transition-all text-sm md:text-base"
                        >
                            🗑️ <span className="hidden sm:inline">Resetear Votos (Admin)</span><span className="sm:hidden">Reset</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
