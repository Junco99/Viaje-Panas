// Sistema de persistencia localStorage
window.storage = {
    get: async (key) => {
        try {
            const stored = localStorage.getItem(key);
            return { value: stored || '{}' };
        } catch (e) {
            return { value: '{}' };
        }
    },
    set: async (key, value) => {
        try {
            localStorage.setItem(key, value);
            sessionStorage.setItem(key, value);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// API Helper
window.API_URL = '/api';

window.getFlightPrices = async (destination, period = '5al9') => {
    try {
        const response = await fetch(`${window.API_URL}/flights/${destination}/${period}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error obteniendo precios:', error);
        return null;
    }
};
