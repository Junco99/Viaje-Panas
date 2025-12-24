// Servicio de Pixabay para imágenes y videos - VERSION DEBUG
const PIXABAY_API_KEY = '47870836-32b976bbfb89cd97976d0eb7d';

window.mediaService = {
    // Buscar imágenes
    async searchImages(query, perPage = 20) {
        console.log('🔍 Buscando imágenes:', query);
        try {
            const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true`;
            console.log('📡 URL:', url);
            
            const response = await fetch(url);
            console.log('📥 Response status:', response.status);
            
            const data = await response.json();
            console.log('✅ Data recibida:', data);
            
            if (data.hits && data.hits.length > 0) {
                console.log(`✅ ${data.hits.length} imágenes encontradas`);
                return data.hits;
            } else {
                console.warn('⚠️ No se encontraron imágenes, usando fallback');
                return this.getFallbackImages(query);
            }
        } catch (error) {
            console.error('❌ Error buscando imágenes:', error);
            return this.getFallbackImages(query);
        }
    },
    
    // Imágenes de fallback si falla Pixabay
    getFallbackImages(query) {
        console.log('🖼️ Usando imágenes de fallback para:', query);
        
        const fallbackImages = [
            {
                id: 1,
                webformatURL: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920',
                tags: 'travel, adventure, landscape',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 2,
                webformatURL: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920',
                tags: 'city, architecture, urban',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 3,
                webformatURL: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920',
                tags: 'beach, ocean, vacation',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 4,
                webformatURL: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920',
                tags: 'lake, mountains, nature',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 5,
                webformatURL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
                tags: 'mountain, peaks, landscape',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 6,
                webformatURL: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920',
                tags: 'sunset, landscape, travel',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 7,
                webformatURL: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1920',
                tags: 'road, journey, travel',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 8,
                webformatURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920',
                tags: 'portrait, person, traveler',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 9,
                webformatURL: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1920',
                tags: 'building, architecture, city',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 10,
                webformatURL: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1499591934245-40b55745b905?w=1920',
                tags: 'coffee, breakfast, travel',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 11,
                webformatURL: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1920',
                tags: 'travel, wanderlust, adventure',
                user: 'Unsplash',
                likes: 0,
                views: 0
            },
            {
                id: 12,
                webformatURL: 'https://images.unsplash.com/photo-1534262557-3b48e179cd3b?w=800',
                largeImageURL: 'https://images.unsplash.com/photo-1534262557-3b48e179cd3b?w=1920',
                tags: 'sunset, sky, nature',
                user: 'Unsplash',
                likes: 0,
                views: 0
            }
        ];
        
        return fallbackImages;
    },
    
    // Buscar videos
    async searchVideos(query, perPage = 10) {
        console.log('🎥 Buscando videos:', query);
        try {
            const url = `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=${perPage}&safesearch=true`;
            const response = await fetch(url);
            const data = await response.json();
            console.log('✅ Videos encontrados:', data.hits?.length || 0);
            return data.hits || [];
        } catch (error) {
            console.error('❌ Error buscando videos:', error);
            return [];
        }
    },
    
    // Obtener imágenes específicas por destino
    async getDestinationImages(destinationName) {
        console.log('🌍 Cargando imágenes de destino:', destinationName);
        const queries = [
            `${destinationName} travel`,
            `${destinationName} tourism`,
            `${destinationName} landmarks`,
            `${destinationName} city`
        ];
        
        const allImages = [];
        for (const query of queries) {
            const images = await this.searchImages(query, 5);
            allImages.push(...images);
        }
        
        return allImages;
    },
    
    // Obtener imagen hero para un destino
    async getHeroImage(destinationName) {
        const images = await this.searchImages(`${destinationName} panorama`, 1);
        return images[0]?.largeImageURL || images[0]?.webformatURL || null;
    }
};

// Componente de Galería de Imágenes con Pixabay - VERSION DEBUG
function ImageGallery({ destination }) {
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        console.log('🎨 ImageGallery montado para:', destination.name);
        loadImages();
    }, [destination.id]);
    
    const loadImages = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('📸 Iniciando carga de imágenes...');
            const searchQuery = `${destination.name} travel tourism`;
            const results = await window.mediaService.searchImages(searchQuery, 12);
            console.log('✅ Imágenes cargadas:', results.length);
            setImages(results);
        } catch (error) {
            console.error('❌ Error cargando imágenes:', error);
            setError(error.message);
            // Usar fallback en caso de error
            const fallback = window.mediaService.getFallbackImages(destination.name);
            setImages(fallback);
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
    
    if (error) {
        return (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
                <p className="text-yellow-800 mb-2">⚠️ {error}</p>
                <p className="text-yellow-600 text-sm">Mostrando imágenes de ejemplo</p>
            </div>
        );
    }
    
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div 
                        key={image.id}
                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        onClick={() => setSelectedImage(image)}
                        style={{
                            animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
                        }}
                    >
                        <img 
                            src={image.webformatURL}
                            alt={image.tags}
                            className="w-full h-64 object-cover"
                            onError={(e) => {
                                console.error('❌ Error cargando imagen:', image.webformatURL);
                                e.target.src = 'https://via.placeholder.com/800x600/667eea/ffffff?text=No+Image';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-semibold">
                                    📸 {image.tags.split(',')[0]}
                                </p>
                                <p className="text-white/70 text-xs">
                                    Por {image.user}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Modal de imagen ampliada */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-6xl w-full">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all z-10"
                        >
                            ✕
                        </button>
                        <img 
                            src={selectedImage.largeImageURL || selectedImage.webformatURL}
                            alt={selectedImage.tags}
                            className="w-full h-auto rounded-2xl"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/1920x1080/667eea/ffffff?text=Image+Error';
                            }}
                        />
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mt-4">
                            <p className="text-white text-lg font-semibold mb-2">
                                {selectedImage.tags}
                            </p>
                            <p className="text-white/70 text-sm">
                                Por {selectedImage.user} • {selectedImage.likes} likes • {selectedImage.views} vistas
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

console.log('✅ mediaService cargado correctamente');
console.log('🔑 API Key configurada:', PIXABAY_API_KEY ? 'SÍ' : 'NO');