import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../utils/apiConnector';

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

  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

  const Wrapper = ({ children }) => (
    <div className="py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Featured Collection</h2>
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
      <div className="overflow-x-auto pb-3 sm:pb-4">
        <div className="flex gap-4 sm:gap-6 min-w-max snap-x snap-mandatory">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="flex-shrink-0 w-[250px] sm:w-64 md:w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 snap-center"
            >
              {/* Product Image */}
              <div className="w-full h-40 sm:h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl || placeholderImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    if (e.currentTarget.src !== placeholderImage) {
                      e.currentTarget.src = placeholderImage;
                    }
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {product.shortDescription && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}

                {product.defaultPrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">
                      {product.defaultPrice.weight}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      ₹{product.defaultPrice.price}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default FeaturedCollection;

