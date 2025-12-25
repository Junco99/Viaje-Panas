// Servicio de Pixabay MEJORADO - Búsquedas que SÍ devuelven fotos reales
const PIXABAY_API_KEY = '47870836-32b976bbfb89cd97976d0eb7d';

window.mediaService = {
    imageCache: {},
    
    // Búsquedas PROBADAS que devuelven fotos REALES de cada país
    destinationSearches: {
        'albania': [
            'Albania',
            
        ],
        'georgia': [
            'Georgia ',
            
        ],
        'serbia': [
            'Serbia',
           
        ],
        'malta': [
            'Malta',
           
        ],
        'norway': [
            'Norway',
           
        ]
    },

    async searchImages(query, perPage = 4) {
        console.log('🔍 Pixabay:', query);
        try {
            const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true&order=popular`;
            
            const response = await fetch(url);

            if (!response.ok) {
                console.warn('⚠️ Pixabay error:', response.status);
                return [];
            }

            const data = await response.json();

            if (data.hits && data.hits.length > 0) {
                console.log(`✅ ${data.hits.length} fotos de "${query}"`);
                return data.hits;
            }
            
            console.log(`⚠️ 0 resultados para "${query}"`);
            return [];
        } catch (error) {
            console.error('❌ Error:', error.message);
            return [];
        }
    },

    async getDestinationImages(destinationId) {
        console.log('🌍 Cargando imágenes para:', destinationId);
        
        // Cache
        if (this.imageCache[destinationId]) {
            console.log('📦 Usando cache');
            return this.imageCache[destinationId];
        }

        const searches = this.destinationSearches[destinationId] || [`${destinationId}`];
        const uniqueImages = new Map();
        
        // Hacer TODAS las búsquedas disponibles para máxima cantidad
        for (const query of searches) {
            const results = await this.searchImages(query, 4);
            
            for (const img of results) {
                // Usar ID como key única
                if (!uniqueImages.has(img.id)) {
                    uniqueImages.set(img.id, {
                        ...img,
                        searchQuery: query
                    });
                }
            }
            
            // Si ya tenemos 12+, parar
            if (uniqueImages.size >= 12) break;
        }

        let finalImages = Array.from(uniqueImages.values());
        
        // Mezclar aleatoriamente para variedad
        finalImages = finalImages.sort(() => Math.random() - 0.5);
        
        // Limitar a 12
        finalImages = finalImages.slice(0, 12);
        
        console.log(`✅ ${finalImages.length} imágenes ÚNICAS de ${destinationId}`);
        console.log('📸 Búsquedas usadas:', finalImages.map(img => img.searchQuery).join(', '));
        
        // Si tenemos muy pocas, mostrar warning
        if (finalImages.length < 6) {
            console.warn(`⚠️ Solo ${finalImages.length} imágenes para ${destinationId}. Intenta revisar la API key.`);
        }
        
        // Guardar en cache
        this.imageCache[destinationId] = finalImages;
        
        return finalImages;
    },

    clearCache() {
        console.log('🗑️ Cache limpiado');
        this.imageCache = {};
    },

    async searchVideos(query, perPage = 10) {
        try {
            const url = `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=${perPage}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.hits || [];
        } catch (error) {
            return [];
        }
    },

    async getHeroImage(destinationName) {
        const images = await this.searchImages(destinationName, 1);
        return images[0]?.largeImageURL || null;
    }
};

function ImageGallery({ destination }) {
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedImage, setSelectedImage] = React.useState(null);

    React.useEffect(() => {
        console.log('🎨 ImageGallery para:', destination.name, '(ID:', destination.id, ')');
        loadImages();
    }, [destination.id]);

    const loadImages = async () => {
        setLoading(true);
        try {
            const results = await window.mediaService.getDestinationImages(destination.id);
            
            if (results.length === 0) {
                console.error('❌ No se encontraron imágenes para', destination.id);
            }
            
            setImages(results);
        } catch (err) {
            console.error('❌ Error cargando imágenes:', err);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando imágenes de {destination.name}...</p>
                </div>
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
                <p className="text-yellow-800 text-lg mb-2">📸 No se encontraron imágenes</p>
                <p className="text-yellow-600 text-sm">
                    Pixabay no devolvió resultados para "{destination.name}". 
                    Verifica la API key o intenta más tarde.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                ℹ️ Mostrando {images.length} fotos reales de {destination.name} desde Pixabay
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={`${destination.id}-${image.id}`}
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={image.webformatURL}
                            alt={image.tags}
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-semibold">
                                    📸 {image.tags.split(',')[0]}
                                </p>
                                <p className="text-white/70 text-xs">
                                    {image.user} • Búsqueda: {image.searchQuery}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-6xl w-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl z-10"
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage.largeImageURL || selectedImage.webformatURL}
                            alt={selectedImage.tags}
                            className="w-full h-auto rounded-2xl"
                        />
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mt-4">
                            <p className="text-white text-lg font-semibold mb-2">{selectedImage.tags}</p>
                            <p className="text-white/70 text-sm">
                                Por {selectedImage.user} • {selectedImage.likes || 0} likes • {selectedImage.views || 0} vistas
                            </p>
                            <p className="text-white/50 text-xs mt-2">
                                Búsqueda: "{selectedImage.searchQuery}"
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}

window.ImageGallery = ImageGallery;

console.log('✅ mediaService MEJORADO cargado');
console.log('🔑 API Key:', PIXABAY_API_KEY ? 'Configurada ✓' : '❌ FALTA');
console.log('🌍 Destinos:', Object.keys(window.mediaService.destinationSearches).join(', '));
console.log('💡 Cada destino tiene 8 búsquedas diferentes para máxima variedad');