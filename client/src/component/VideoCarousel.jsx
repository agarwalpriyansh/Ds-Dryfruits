'use client';

import gift1 from '../assets/giftbox/1.jpeg';
import gift2 from '../assets/giftbox/2.jpeg';
import gift3 from '../assets/giftbox/3.jpeg';
import gift4 from '../assets/giftbox/4.jpeg';

export default function VideoCarousel() {
  const media = [
    { id: 1, title: 'Video 1', thumbnail: gift1, type: 'video' },
    { id: 2, title: 'Photo 1', thumbnail: gift2, type: 'photo' },
    { id: 3, title: 'Photo 2', thumbnail: gift3, type: 'photo' },
    { id: 4, title: 'Photo 3', thumbnail: gift4, type: 'photo' },
  ];

  const features = [
    {
      icon: 'headphones',
      title: 'Customer Support',
      description: '24/7 support available',
    },
    {
      icon: 'shield',
      title: 'Secure Shopping',
      description: 'SSL encrypted transactions',
    },
    {
      icon: 'truck',
      title: 'Swift Shipping',
      description: 'Fast delivery worldwide',
    },
    {
      icon: 'money',
      title: 'Money Return',
      description: '30-day return policy',
    },
  ];

  const FeatureIcon = ({ type }) => {
    const iconClasses = "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12";
    switch (type) {
      case 'headphones':
        return (
          <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6M3 18a9 9 0 0 0 18 0M3 18h-2v4h2M21 18h2v4h-2M9 13a3 3 0 0 1 6 0" />
          </svg>
        );
      case 'shield':
        return (
          <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="10 19 12 21 16 17" />
          </svg>
        );
      case 'truck':
        return (
          <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="6" width="15" height="12" rx="2" />
            <path d="M16 8h2a2 2 0 0 1 2 2v8" />
            <circle cx="5.5" cy="20.5" r="2.5" />
            <circle cx="18.5" cy="20.5" r="2.5" />
          </svg>
        );
      case 'money':
        return (
          <svg className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v12M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      {/* Video Carousel Section */}
      <div className="relative px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-28 rounded-xl overflow-hidden bg-[url('https://i.pinimg.com/1200x/1c/79/a6/1c79a6fbc48c1b8d5f87a075d08ad3fe.jpg')] bg-cover bg-center">

        {/* Video and Photos Container */}
        <div className="max-w-6xl mx-auto">
          <div className="relative flex items-center justify-end overflow-x-auto pb-4 sm:pb-6">
            {/* All Media - Overlapping */}
            <div className="flex items-center min-w-max">
              {media.map((item, index) => {
                const isVideo = item.type === 'video';
                // Determine size based on item type and index - responsive sizes (smaller for mobile)
                let sizeClasses = 'w-14 h-12 sm:w-20 sm:h-16 md:w-28 md:h-24 lg:w-36 lg:h-28 xl:w-44 xl:h-36'; // Default size (for video)
                if (!isVideo) {
                  if (index === 3) {
                    // Photo 3 - bigger
                    sizeClasses = 'w-20 h-16 sm:w-24 sm:h-20 md:w-36 md:h-32 lg:w-48 lg:h-40 xl:w-60 xl:h-52';
                  } 
                  else if (index === 1 || index === 2) {
                    // Photo 1 and Photo 2 - big
                    sizeClasses = 'w-16 h-12 sm:w-20 sm:h-16 md:w-32 md:h-28 lg:w-40 lg:h-36 xl:w-52 xl:h-44';
                  }
                }
                
                return (
                  <div
                    key={item.id}
                    className={`relative transition-all duration-300 hover:z-20 ${index > 0 ? '-ml-2 sm:-ml-4 md:-ml-6 lg:-ml-8 xl:-ml-12' : ''}`}
                    style={{ zIndex: media.length - index }}
                  >
                    <div className={`relative ${sizeClasses} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${isVideo ? 'scale-110' : ''}`}>
                      <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                      {/* Play Button - Only for Video */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group cursor-pointer">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#6b3d3d] ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 -mt-6 sm:-mt-8 md:-mt-12 relative z-20 mb-10 sm:mb-14 md:mb-16">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg py-6 sm:py-8 md:py-10 px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center 
                  ${index % 2 === 1 ? 'border-l border-gray-200 pl-6 sm:pl-8' : 'pr-6 sm:pr-8'} 
                  ${index >= 2 ? 'border-t border-gray-200 pt-6 sm:pt-8 md:border-t-0 md:pt-0' : ''}
                  md:border-l md:border-gray-200 md:px-8 md:pr-8
                  first:border-l-0 md:first:pl-0
                  md:last:pr-0`}
              >
                <div className="text-gray-700 mb-2 sm:mb-3 md:mb-4">
                  <FeatureIcon type={feature.icon} />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
