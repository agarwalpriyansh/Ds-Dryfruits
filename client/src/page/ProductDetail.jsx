import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../utils/apiConnector';
import ProductStrip from '../component/ProductStrip';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProductById(productId);
        
        if (!isMounted) return;

        if (response.data) {
          setProduct(response.data);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (productId) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-lg">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="pb-10">
      {/* Back Button */}
      <div className="px-4 sm:px-5 md:px-6 max-w-[1200px] mx-auto mt-4 sm:mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Product Content */}
      <div className="px-4 sm:px-5 md:px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Product Image */}
          <div className="w-full">
            <div className="rounded-xl overflow-hidden bg-gray-100 shadow-lg">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    if (e.currentTarget.src !== placeholderImage) {
                      e.currentTarget.src = placeholderImage;
                    }
                  }}
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center">
                  <img
                    src={placeholderImage}
                    alt="No image available"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            {/* Product Strip */}
            <ProductStrip />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {product.name}
            </h1>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                {product.shortDescription}
              </p>
            )}

            {/* Full Description */}
            {product.fullDescription && (
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  Description
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.fullDescription}
                </p>
              </div>
            )}

            {/* Price Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                  Available Sizes & Prices
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {product.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="text-base sm:text-lg font-medium text-gray-900">
                        {variant.weight}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        ₹{variant.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto pt-4 sm:pt-6">
              <button className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

