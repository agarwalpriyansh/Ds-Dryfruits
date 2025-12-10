import { useEffect, useState } from 'react';
import { apiService } from '../utils/apiConnector';
import GiftBoxCard from './gift-box-card';

function FeaturedCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const placeholderImage = "/placeholder.svg";

  const Wrapper = ({ children }) => (
    <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto w-full">
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
      {/* Horizontal scrolling container */}
      <div className="overflow-x-auto pb-3 sm:pb-4 scroll-smooth -mx-4 sm:mx-0">
        <div className="flex gap-0 sm:gap-4 md:gap-6 min-w-max snap-x snap-mandatory pl-4 pr-4 sm:pl-0 sm:pr-0">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-64 md:w-72 snap-center"
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
    </Wrapper>
  );
}

export default FeaturedCollection;

