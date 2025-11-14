import { useState, useEffect } from 'react';
import Carousel from '../component/Carousel';
import ThemeCard from '../component/Themecard';
import heroImages from '../data/homeCarousel';
import { apiService } from '../utils/apiConnector';
import FeaturedCollection from '../component/FeaturedCollection';


function Home() {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                setLoading(true);
                const response = await apiService.getThemes();
                console.log('Themes API response:', response.data);
                setThemes(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching themes:', err);
                setError('Failed to load themes');
            } finally {
                setLoading(false);
            }
        };

        fetchThemes();
    }, []);

    return (
        <div>
            <Carousel images={heroImages} autoPlayInterval={5000}></Carousel>
            
            {/* Themes Section */}
            <div className="mt-12 px-5">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Our Themes
                </h2>
                
                {loading && (
                    <div className="text-center p-10 text-gray-500">
                        Loading themes...
                    </div>
                )}
                
                {error && (
                    <div className="text-center p-10 text-red-500">
                        {error}
                    </div>
                )}
                
                {!loading && !error && themes.length === 0 && (
                    <div className="text-center p-10 text-gray-500">
                        No themes available
                    </div>
                )}
                
                {!loading && !error && themes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
                        {themes.map((theme) => (
                            <ThemeCard key={theme._id} theme={theme} />
                        ))}
                    </div>
                )}
            </div>
            <FeaturedCollection />
        </div>
    );
}

export default Home;