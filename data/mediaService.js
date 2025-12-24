// Servicio de Pixabay para imágenes y videos
const PIXABAY_API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu API key

window.mediaService = {
    // Buscar imágenes
    async searchImages(query, perPage = 20) {
        try {
            const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${perPage}&safesearch=true`;
            const response = await fetch(url);
            const data = await response.json();
            return data.hits || [];
        } catch (error) {
            console.error('Error buscando imágenes:', error);
            return [];
        }
    },
    
    // Buscar videos
    async searchVideos(query, perPage = 10) {
        try {
            const url = `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=${perPage}&safesearch=true`;
            const response = await fetch(url);
            const data = await response.json();
            return data.hits || [];
        } catch (error) {
            console.error('Error buscando videos:', error);
            return [];
        }
    },
    
    // Obtener imágenes específicas por destino
    async getDestinationImages(destinationName) {
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

// Componente de Galería de Imágenes con Pixabay
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
            const searchQuery = `${destination.name} travel tourism`;
            const results = await window.mediaService.searchImages(searchQuery, 12);
            setImages(results);
        } catch (error) {
            console.error('Error cargando imágenes:', error);
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
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all"
                        >
                            ✕
                        </button>
                        <img 
                            src={selectedImage.largeImageURL || selectedImage.webformatURL}
                            alt={selectedImage.tags}
                            className="w-full h-auto rounded-2xl"
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
            
            <style jsx>{`
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