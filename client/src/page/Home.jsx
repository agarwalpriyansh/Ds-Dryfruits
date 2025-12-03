import { useState, useEffect } from 'react';
import Carousel from '../component/Carousel';
import ThemeCard from '../component/Themecard';
import heroImages from '../data/homeCarousel';
import { apiService } from '../utils/apiConnector';
import FeaturedCollection from '../component/FeaturedCollection';
import ReviewsSection from '../component/Review';
import VideoCarousel from '../component/VideoCarousel';
import LatestGiftBox from '../component/LatestGiftBox';

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
        <div className="m-0 p-0 flex flex-col gap-6 sm:gap-10">
            <div className="sm:mt-[-10]"><Carousel images={heroImages} autoPlayInterval={5000}></Carousel></div>
            
            {/* Themes Section */}
            <div className="mt-6 sm:mt-8 md:mt-12 px-3 sm:px-4 md:px-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">
                    Our Themes
                </h2>
                
                {loading && (
                    <div className="text-center p-6 sm:p-8 md:p-10 text-gray-500 text-sm sm:text-base">
                        Loading themes...
                    </div>
                )}
                
                {error && (
                    <div className="text-center p-6 sm:p-8 md:p-10 text-red-500 text-sm sm:text-base">
                        {error}
                    </div>
                )}
                
                {!loading && !error && themes.length === 0 && (
                    <div className="text-center p-6 sm:p-8 md:p-10 text-gray-500 text-sm sm:text-base">
                        No themes available
                    </div>
                )}
                
                {!loading && !error && themes.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:gap-x-6 md:gap-y-12 max-w-[1200px] mx-auto">
                        {themes.map((theme) => (
                            <ThemeCard key={theme._id} theme={theme} />
                        ))}
                    </div>
                )}
            </div>
            <LatestGiftBox />
            <VideoCarousel />
            <FeaturedCollection />
            <ReviewsSection />
            
        </div>
    );
}

export default Home;