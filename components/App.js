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

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
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

                {hasVoted && (
                    <div className="text-center mt-12">
                        <button
                            onClick={resetVotes}
                            className="text-slate-300 hover:text-red-400 transition-all text-[10px] font-bold uppercase tracking-widest"
                        >
                            Resetear Votos (Admin)
                        </button>
                    </div>
                )}
            </div>

            {/* Footer con políticas del grupo */}
            <Footer />
        </div>
    );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
