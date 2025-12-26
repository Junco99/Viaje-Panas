// Servicio de Pixabay SIMPLIFICADO - Solo lo que FUNCIONA
const PIXABAY_API_KEY = '53831478-764b4dbd967e551fec0d15cf7';

window.mediaService = {
    imageCache: {},

    // Búsquedas específicas por destino
    destinationSearches: {
        'albania': ['Albania beach', 'Ksamil Albania', 'Berat Albania', 'Albanian riviera'],
        'georgia': ['Tbilisi Georgia', 'Kazbegi Georgia', 'Batumi Georgia', 'Georgia mountains'],
        'serbia': ['Belgrade Serbia', 'Serbia fortress', 'Novi Sad Serbia', 'Danube Serbia'],
        'malta': ['Malta Valletta', 'Blue Lagoon Malta', 'Gozo Malta', 'Mdina Malta'],
        'norway': ['Norway fjord', 'Lofoten Norway', 'Bergen Norway', 'Geirangerfjord Norway']
    },

    async searchImages(query, perPage = 10) {
        try {
            // URL simple que FUNCIONA
            const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}`;

            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                console.warn('⚠️ Error', response.status, ':', errorText);
                return [];
            }

            const data = await response.json();

            if (data.hits && data.hits.length > 0) {
                return data.hits;
            }

            return [];
        } catch (error) {
            console.error('❌ Error:', error.message);
            return [];
        }
    },

    async getDestinationImages(destinationId) {
        // Cache
        if (this.imageCache[destinationId]) {
            return this.imageCache[destinationId];
        }

        const searches = this.destinationSearches[destinationId] || [destinationId];
        const uniqueImages = new Map();

        // Buscar con cada query
        for (const query of searches) {
            const results = await this.searchImages(query, 5);

            for (const img of results) {
                if (!uniqueImages.has(img.id)) {
                    uniqueImages.set(img.id, {
                        ...img,
                        searchQuery: query
                    });
                }
            }

            if (uniqueImages.size >= 12) break;
        }

        let finalImages = Array.from(uniqueImages.values());
        finalImages = finalImages.sort(() => Math.random() - 0.5).slice(0, 12);

        this.imageCache[destinationId] = finalImages;
        return finalImages;
    },

    clearCache() {
        this.imageCache = {};
    },

    async getHeroImage(destinationName) {
        const images = await this.searchImages(destinationName, 1);
        return images[0]?.largeImageURL || null;
    }
};

// Componente React: Galería
function ImageGallery({ destination }) {
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedImage, setSelectedImage] = React.useState(null);

    React.useEffect(() => {
        loadImages();
    }, [destination.id]);

    const loadImages = async () => {
        setLoading(true);
        try {
            const results = await window.mediaService.getDestinationImages(destination.id);
            setImages(results);
        } catch (err) {
            console.error('❌ Error:', err);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-400 mx-auto mb-4"></div>
                    <p className="text-slate-400 font-semibold">Cargando fotos de {destination.name}...</p>
                </div>
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
                <p className="text-yellow-800 text-lg mb-2">📸 No se encontraron imágenes</p>
                <p className="text-yellow-600 text-sm">Intenta recargar la página</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                ℹ️ {images.length} fotos de {destination.name} desde Pixabay
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={`${destination.id}-${image.id}`}
                        className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        onClick={() => setSelectedImage(image)}
                        style={{
                            animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
                        }}
                    >
                        <img
                            src={image.webformatURL}
                            alt={image.tags}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-semibold">
                                    📸 {image.tags.split(',')[0]}
                                </p>
                                <p className="text-white/70 text-xs">
                                    {image.user}
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
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}

window.ImageGallery = ImageGallery;