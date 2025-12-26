// Firebase Configuration - Sistema de Votación en Tiempo Real
const firebaseConfig = {
    apiKey: "AIzaSyBAnQdvKx79L2fBhH78QuI-MmGvvCwb39A",
    authDomain: "viaje-panas-2026.firebaseapp.com",
    databaseURL: "https://viaje-panas-2026-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "viaje-panas-2026",
    storageBucket: "viaje-panas-2026.firebasestorage.app",
    messagingSenderId: "295364084736",
    appId: "1:295364084736:web:1af3062f78450973ec84e5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Sistema de Base de Datos
window.firebaseDB = {
    // Referencias a la base de datos
    votesRef: database.ref('votes'),
    userVotesRef: database.ref('userVotes'),
    selectedUsersRef: database.ref('selectedUsers'),

    // VOTOS: Guardar voto de un usuario
    async saveVote(userId, destinationId) {
        try {
            console.log('💾 Guardando voto:', userId, '→', destinationId);

            // Verificar si el usuario ya votó antes
            const previousVoteSnapshot = await this.userVotesRef.child(userId).once('value');
            const previousVote = previousVoteSnapshot.val();

            // Si votó antes, restar 1 del destino anterior
            if (previousVote && previousVote !== destinationId) {
                const prevCountSnapshot = await this.votesRef.child(previousVote).once('value');
                const prevCount = prevCountSnapshot.val() || 0;
                await this.votesRef.child(previousVote).set(Math.max(0, prevCount - 1));
            }

            // Sumar 1 al nuevo destino
            const currentCountSnapshot = await this.votesRef.child(destinationId).once('value');
            const currentCount = currentCountSnapshot.val() || 0;
            await this.votesRef.child(destinationId).set(currentCount + 1);

            // Guardar el voto del usuario
            await this.userVotesRef.child(userId).set(destinationId);

            console.log('✅ Voto guardado correctamente');
            return true;
        } catch (error) {
            console.error('❌ Error guardando voto:', error);
            return false;
        }
    },

    // VOTOS: Obtener todos los votos
    async getVotes() {
        try {
            const snapshot = await this.votesRef.once('value');
            const votes = snapshot.val() || {};
            console.log('📊 Votos cargados:', votes);
            return votes;
        } catch (error) {
            console.error('❌ Error cargando votos:', error);
            return {};
        }
    },

    // VOTOS: Escuchar cambios en tiempo real
    onVotesChange(callback) {
        console.log('👂 Escuchando cambios en votos...');
        this.votesRef.on('value', (snapshot) => {
            const votes = snapshot.val() || {};
            console.log('🔄 Votos actualizados:', votes);
            callback(votes);
        });

        // Retornar función para dejar de escuchar
        return () => {
            console.log('🔇 Dejando de escuchar votos');
            this.votesRef.off('value');
        };
    },

    // VOTOS: Verificar si un usuario ya votó
    async hasUserVoted(userId) {
        try {
            const snapshot = await this.userVotesRef.child(userId).once('value');
            return snapshot.exists();
        } catch (error) {
            console.error('❌ Error verificando voto:', error);
            return false;
        }
    },

    // VOTOS: Obtener el voto de un usuario
    async getUserVote(userId) {
        try {
            const snapshot = await this.userVotesRef.child(userId).once('value');
            return snapshot.val();
        } catch (error) {
            console.error('❌ Error obteniendo voto del usuario:', error);
            return null;
        }
    },

    // VOTOS: Resetear todos los votos (ADMIN)
    async resetVotes() {
        try {
            console.log('🗑️ Reseteando todos los votos...');
            await this.votesRef.set({});
            await this.userVotesRef.set({});
            console.log('✅ Votos reseteados');
            return true;
        } catch (error) {
            console.error('❌ Error reseteando votos:', error);
            return false;
        }
    },

    // USUARIO: Guardar selección de usuario
    async saveUserSelection(user) {
        try {
            console.log('💾 Guardando usuario seleccionado:', user.name);
            await this.selectedUsersRef.child(user.id).set({
                id: user.id,
                name: user.name,
                emoji: user.emoji,
                personality: user.personality,
                timestamp: Date.now()
            });
            console.log('✅ Usuario guardado');
            return true;
        } catch (error) {
            console.error('❌ Error guardando usuario:', error);
            return false;
        }
    },

    // USUARIO: Obtener usuario seleccionado
    async getUserSelection(userId) {
        try {
            const snapshot = await this.selectedUsersRef.child(userId).once('value');
            const user = snapshot.val();
            if (user) {
                console.log('👤 Usuario cargado:', user.name);
            }
            return user;
        } catch (error) {
            console.error('❌ Error cargando usuario:', error);
            return null;
        }
    },

    // USUARIO: Eliminar selección de usuario
    async removeUserSelection(userId) {
        try {
            await this.selectedUsersRef.child(userId).remove();
            console.log('✅ Usuario eliminado');
            return true;
        } catch (error) {
            console.error('❌ Error eliminando usuario:', error);
            return false;
        }
    },

    // ESTADÍSTICAS: Obtener total de votos
    async getTotalVotes() {
        try {
            const votes = await this.getVotes();
            return Object.values(votes).reduce((sum, count) => sum + count, 0);
        } catch (error) {
            console.error('❌ Error calculando total:', error);
            return 0;
        }
    },

    // ESTADÍSTICAS: Obtener usuarios que han votado
    async getVotingUsers() {
        try {
            const snapshot = await this.userVotesRef.once('value');
            const userVotes = snapshot.val() || {};
            return Object.keys(userVotes);
        } catch (error) {
            console.error('❌ Error obteniendo usuarios:', error);
            return [];
        }
    }
};

console.log('✅ Firebase inicializado correctamente');
console.log('🔥 Base de datos:', firebaseConfig.databaseURL);
console.log('📊 Sistema de votación en tiempo real listo');
