import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { apiService } from '../utils/apiConnector';
import GiftBoxCard from './gift-box-card';

function FeaturedCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [gapSize, setGapSize] = useState(1); // in rem
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const flexContainerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getFeaturedProducts();
        
        if (!isMounted) return;

        if (response.data) {
          setProducts(response.data);
          setError(null);
        } else {
          setProducts([]);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products');
        setProducts([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFeaturedProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      
      if (width >= 1200) {
        setItemsPerPage(4);
        setGapSize(1.5); // gap-6 = 1.5rem
      } else if (width >= 992) {
        setItemsPerPage(3);
        setGapSize(1.5); // gap-6 = 1.5rem
      } else if (width >= 640) {
        setItemsPerPage(2);
        setGapSize(1.5); // gap-6 = 1.5rem
      } else {
        setItemsPerPage(1);
        setGapSize(1); // gap-4 = 1rem
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Calculate item width for accurate transform
  useEffect(() => {
    const updateItemWidth = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const gapPixels = gapSize * 16; // Convert rem to pixels (assuming 16px base)
      const calculatedItemWidth = (containerWidth - (itemsPerPage - 1) * gapPixels) / itemsPerPage;
      setItemWidth(calculatedItemWidth);
    };

    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(updateItemWidth, 0);
    window.addEventListener('resize', updateItemWidth);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateItemWidth);
    };
  }, [itemsPerPage, gapSize, products.length]);



  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const handleTouchStart = (event) => {
    // Only enable swipe on mobile screens
    if (!isMobile) return;
    
    const touch = event.touches[0];
    if (touch) {
      setTouchStartX(touch.clientX);
      setTouchStartY(touch.clientY);
    }
  };

  const handleTouchMove = (event) => {
    // Only enable swipe on mobile screens
    if (!isMobile || touchStartX === null) return;
    
    const touch = event.touches[0];
    if (!touch) return;
    
    const touchCurrentX = touch.clientX;
    const touchCurrentY = touch.clientY;
    const deltaX = touchStartX - touchCurrentX;
    const deltaY = touchStartY - touchCurrentY;
    
    // Determine if this is primarily a horizontal swipe
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    
    // If horizontal movement detected, prevent vertical scrolling
    if (isHorizontalSwipe && Math.abs(deltaX) > 10) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleTouchEnd = (event) => {
    // Only enable swipe on mobile screens
    if (!isMobile || touchStartX === null) {
      setTouchStartX(null);
      setTouchStartY(null);
      return;
    }
    
    const touch = event.changedTouches[0];
    if (!touch) {
      setTouchStartX(null);
      setTouchStartY(null);
      return;
    }
    
    const touchEndX = touch.clientX;
    const delta = touchStartX - touchEndX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        // Swiped left - go to next
        goToNext();
      } else {
        // Swiped right - go to previous
        goToPrevious();
      }
    }

    // Reset touch state
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const placeholderImage = "/placeholder.svg";

  const Wrapper = ({ children }) => (
    <div 
      className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8"
      style={{
        touchAction: isMobile ? 'pan-x' : 'auto',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      <div className="max-w-[99%] mx-auto w-full">
        <h2 className="text-2xl lg:mb-10 mt-0 sm:text-3xl font-bold text-gray-900 sm:mb-6 text-center">
          Dry-Fruits Featured Collection
        </h2>
        {children}
      </div>
    </div>
  );

  if (loading) {
    return (
      <Wrapper>
        <div className="text-center text-gray-500 text-sm sm:text-base">Loading featured products...</div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <div className="text-center text-red-500 text-sm sm:text-base">{error}</div>
      </Wrapper>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Wrapper>
        <div className="text-center text-gray-500 text-sm sm:text-base">No featured products available.</div>
      </Wrapper>
    );
  }

  // Calculate transform for carousel - move based on currentIndex
  const calculateTransform = () => {
    if (products.length === 0) return 'translateX(0)';
    
    // On mobile, use percentage-based calculation for simplicity
    if (isMobile) {
      // Each item is 100% of container width, so move by 100% per item
      const offsetPercent = -(currentIndex * 100);
      return `translateX(${offsetPercent}%)`;
    }
    
    // Desktop: use pixel-based calculation
    if (itemWidth === 0) return 'translateX(0)';
    
    const gapPixels = gapSize * 16; // Convert rem to pixels
    // Base transform: move left by currentIndex items
    const baseOffset = -(currentIndex * (itemWidth + gapPixels));
    
    return `translateX(${baseOffset}px)`;
  };

  return (
    <Wrapper>
      <div className="relative w-full">
        {/* Carousel Items */}
        <div
          ref={containerRef}
          className="overflow-hidden w-full relative"
          style={{
            touchAction: isMobile ? 'pan-x' : 'auto',
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          <div
            ref={flexContainerRef}
            className="flex gap-4 sm:gap-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              touchAction: isMobile ? 'pan-x' : 'pan-y pinch-zoom',
              transform: calculateTransform(),
              transition: 'transform 0.3s ease-out',
              width: isMobile ? `${products.length * 100}%` : '100%',
            }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0"
                style={{
                  flex: `0 0 ${isMobile ? '100%' : `calc((100% - ${(itemsPerPage - 1) * gapSize}rem) / ${itemsPerPage})`}`,
                  minWidth: 0,
                  width: isMobile ? '100%' : undefined,
                  maxWidth: isMobile ? '100%' : `calc((100% - ${(itemsPerPage - 1) * gapSize}rem) / ${itemsPerPage})`
                }}
              >
                <GiftBoxCard
                  id={product._id}
                  image={product.imageUrl || placeholderImage}
                  brand="DS Dryfruits"
                  collection={product.name}
                  to={`/products/${product._id}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5e0404] hover:bg-[#4a0303] text-white transition-colors shadow-lg"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5e0404] hover:bg-[#4a0303] text-white transition-colors shadow-lg"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        {products.length > 0 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => {
              const pageStartIndex = index * itemsPerPage;
              const isActive = currentIndex >= pageStartIndex && currentIndex < pageStartIndex + itemsPerPage;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(pageStartIndex)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-foreground' : 'bg-border'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default FeaturedCollection;

