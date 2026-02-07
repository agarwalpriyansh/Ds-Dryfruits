import { useState, useEffect } from 'react';
import Carousel from '../component/Carousel';
import ThemeCard from '../component/Themecard';
import heroImages from '../data/homeCarousel';
import { apiService } from '../utils/apiConnector';
import FeaturedCollection from '../component/FeaturedCollection';
import ReviewsSection from '../component/Review';
import VideoCarousel from '../component/VideoCarousel';
import LatestGiftBox from '../component/LatestGiftBox';
import GiftBoxCarousel from '../component/GiftBoxCarousel';


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
            <div className="mt-6 sm:mt-8 md:mt-0 mb-10 px-3 sm:px-4 md:px-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 sm:mb-6 md:mb-8 text-center">
                    Our Categories
                </h2>
                
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:gap-x-6 md:gap-y-12 max-w-[1200px] mx-auto">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex flex-col items-center rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="w-[88%] mt-6 aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
                                </div>
                                <div className="pt-6 pb-8 w-full text-center">
                                    <div className="mx-auto h-6 w-3/4 max-w-[140px] rounded bg-gray-100 relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
                                    </div>
                                </div>
                            </div>
                        ))}
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
            <ReviewsSection />
            <FeaturedCollection />
            <GiftBoxCarousel />
            
            
        </div>
    );
}

export default Home;