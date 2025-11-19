'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const videos = [
    { id: 1, title: 'Video 1', thumbnail: '/store-shelf.jpg' },
    { id: 2, title: 'Video 2', thumbnail: '/store-shelf.jpg' },
    { id: 3, title: 'Video 3', thumbnail: '/store-shelf.jpg' },
    { id: 4, title: 'Video 4', thumbnail: '/store-shelf.jpg' },
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

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, videos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setAutoPlay(false);
  };

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
    <div className="w-full bg-gray-100">
      {/* Video Carousel Section */}
      <div className="relative bg-gradient-to-r from-[#6b3d3d] to-[#7a4848] px-4 py-16 md:py-24 rounded-b-3xl overflow-hidden">
        {/* Decorative Film Strip Background */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 opacity-20 pointer-events-none">
          <svg className="w-32 h-64" viewBox="0 0 100 300" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 20 Q 20 40 10 60 Q 0 80 10 100 Q 20 120 10 140 Q 0 160 10 180" stroke="white" strokeWidth="1.5" />
            <rect x="5" y="20" width="90" height="40" fill="none" stroke="white" strokeWidth="1.5" rx="2" />
            <rect x="5" y="70" width="90" height="40" fill="none" stroke="white" strokeWidth="1.5" rx="2" />
            <rect x="5" y="120" width="90" height="40" fill="none" stroke="white" strokeWidth="1.5" rx="2" />
            <rect x="5" y="170" width="90" height="40" fill="none" stroke="white" strokeWidth="1.5" rx="2" />
            <circle cx="25" cy="30" r="3" fill="white" />
            <circle cx="75" cy="30" r="3" fill="white" />
            <circle cx="25" cy="80" r="3" fill="white" />
            <circle cx="75" cy="80" r="3" fill="white" />
            <circle cx="25" cy="130" r="3" fill="white" />
            <circle cx="75" cy="130" r="3" fill="white" />
            <circle cx="25" cy="180" r="3" fill="white" />
            <circle cx="75" cy="180" r="3" fill="white" />
          </svg>
        </div>

        {/* Video Carousel Container */}
        <div className="max-w-6xl mx-auto">
          <div className="relative flex items-center justify-center gap-4">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Videos Grid */}
            <div className="flex gap-6 justify-center items-center flex-wrap">
              {videos.map((video, index) => {
                const isActive = index === currentIndex;
                const isVisible =
                  index === currentIndex ||
                  index === (currentIndex + 1) % videos.length ||
                  index === (currentIndex + 2) % videos.length;

                return (
                  <div
                    key={video.id}
                    className={`relative transition-all duration-500 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute'
                    } ${isActive ? 'z-10 scale-110' : 'z-0'}`}
                  >
                    <div className="relative w-48 h-40 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                      <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors group cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-[#6b3d3d] ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 z-20 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoPlay(false);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
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
