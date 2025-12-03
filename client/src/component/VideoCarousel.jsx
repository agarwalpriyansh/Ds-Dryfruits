'use client';

export default function VideoCarousel() {
  const media = [
    { id: 1, title: 'Video 1', thumbnail: '/store-shelf.jpg', type: 'video' },
    { id: 2, title: 'Photo 1', thumbnail: '/store-shelf.jpg', type: 'photo' },
    { id: 3, title: 'Photo 2', thumbnail: '/store-shelf.jpg', type: 'photo' },
    { id: 4, title: 'Photo 3', thumbnail: '/store-shelf.jpg', type: 'photo' },
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
    switch (type) {
      case 'headphones':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6M3 18a9 9 0 0 0 18 0M3 18h-2v4h2M21 18h2v4h-2M9 13a3 3 0 0 1 6 0" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="10 19 12 21 16 17" />
          </svg>
        );
      case 'truck':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="6" width="15" height="12" rx="2" />
            <path d="M16 8h2a2 2 0 0 1 2 2v8" />
            <circle cx="5.5" cy="20.5" r="2.5" />
            <circle cx="18.5" cy="20.5" r="2.5" />
          </svg>
        );
      case 'money':
        return (
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v12M9 9h.01M15 9h.01M9 15h.01M15 15h.01" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[90%]  mx-auto">
      {/* Video Carousel Section */}
      <div className="relative px-4 py-16 md:py-24 rounded-xl overflow-hidden bg-[url('https://i.pinimg.com/1200x/1c/79/a6/1c79a6fbc48c1b8d5f87a075d08ad3fe.jpg')] bg-cover bg-center">

        {/* Video and Photos Container */}
        <div className="max-w-6xl mx-auto">
          <div className="relative flex items-center justify-end">
            {/* All Media - Overlapping */}
            <div className="flex items-center">
              {media.map((item, index) => {
                const isVideo = item.type === 'video';
                // Determine size based on item type and index
                let sizeClasses = 'w-48 h-40'; // Default size (for video)
                if (!isVideo) {
                  if (index === 2) {
                    // Photo 3 - bigger
                    sizeClasses = 'w-64 h-60';
                  } 
                  else if (index === 1 || index === 2) {
                    // Photo 1 and Photo 2 - big
                    sizeClasses = 'w-56 h-48';
                  }
                }
                
                return (
                  <div
                    key={item.id}
                    className="relative transition-all duration-300 hover:z-20"
                    style={{ marginLeft: index > 0 ? '-3rem' : '0', zIndex: media.length - index }}
                  >
                    <div className={`relative ${sizeClasses} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${isVideo ? 'scale-110' : ''}`}>
                      <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                      {/* Play Button - Only for Video */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group cursor-pointer">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-[#6b3d3d] ml-1" fill="currentColor" viewBox="0 0 20 20">
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
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20 mb-12">
        <div className="bg-white rounded-2xl shadow-lg py-6 px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center md:px-6 first:md:pl-0 last:md:pr-0 pt-8 md:pt-0 first:pt-0">
                <div className="text-gray-700 mb-4">
                  <FeatureIcon type={feature.icon} />
                </div>
                <h3 className="text font text-gray-900 mb-2">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
