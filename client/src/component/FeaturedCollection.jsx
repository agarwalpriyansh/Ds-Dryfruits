import { useEffect, useState } from 'react';
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

  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  // Calculate which items to show based on available width
  const visibleItems = [];
  for (let i = 0; i < itemsPerPage; i++) {
    const index = currentIndex + i;
    if (index < products.length) {
      visibleItems.push(products[index]);
    }
  }

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;
    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;
    const threshold = 40;

    if (delta > threshold) {
      goToNext();
    } else if (delta < -threshold) {
      goToPrevious();
    }

    setTouchStartX(null);
  };

  const placeholderImage = "/placeholder.svg";

  const Wrapper = ({ children }) => (
    <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
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

  return (
    <Wrapper>
      <div className="relative w-full">
        {/* Carousel Items */}
        <div
          className="flex gap-4 sm:gap-6 overflow-hidden w-full pr-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {visibleItems.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0"
              style={{
                flex: `0 0 calc((100% - ${(itemsPerPage - 1) * gapSize}rem) / ${itemsPerPage})`,
                minWidth: 0,
                maxWidth: `calc((100% - ${(itemsPerPage - 1) * gapSize}rem) / ${itemsPerPage})`
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

