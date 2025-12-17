import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../utils/apiConnector';
import ProductStrip from '../component/ProductStrip';
import { slugifyThemeName } from '../utils/slugify';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('benefits');

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

  const descriptionLines =
    (product?.fullDescription || '').split('\n').filter((line) => line !== '');
  const descriptionFirstLine = descriptionLines[0] || '';
  const descriptionRest =
    descriptionLines.length > 1 ? descriptionLines.slice(1).join('\n') : '';

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

  // Get theme information for breadcrumb
  const theme = product?.theme;
  // Ensure theme is a populated object (not just an ID)
  const themeName = theme && typeof theme === 'object' && 'name' in theme ? theme.name : null;
  const themeSlug = themeName ? slugifyThemeName(themeName) : '';

  return (
    <div className="pb-10">
      {/* Breadcrumb Navigation */}
      <div className="px-4 sm:px-5 md:px-6 max-w-[1200px] mx-auto mt-4 sm:mt-6">
        <nav className="flex items-center gap-2 text-sm sm:text-base mb-3 sm:mb-4" aria-label="Breadcrumb">
          <Link
            to="/"
            className="text-gray-900 hover:text-gray-700 transition-colors"
          >
            Home
          </Link>
          {theme && themeSlug && themeName && (
            <>
              <Link
                to={`/themes/${themeSlug}`}
                className="text-gray-900 hover:text-gray-700 transition-colors"
              >
                Collections
              </Link>
              <span className="text-gray-900">{themeName}</span>
            </>
          )}
          <span className="text-gray-900 font-bold">{product.name}</span>
        </nav>
      </div>

      {/* Product Content */}
      <div className="px-4 sm:px-5 md:px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Product Image */}
          <div className="w-full">
            <div className="rounded-xl overflow-hidden shadow-lg">
              {/* Product Image Container - Same style as theme page */}
              <div 
                className="relative z-10 w-full flex items-center justify-center aspect-[4/3] max-h-[700px]"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765387511/prouctbg_jkhkhw.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="w-[70%] h-[90%] flex items-center justify-center">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full rounded-full object-cover object-center"
                      onError={(e) => {
                        if (e.currentTarget.src !== placeholderImage) {
                          e.currentTarget.src = placeholderImage;
                        }
                      }}
                    />
                  ) : (
                    <img
                      src={placeholderImage}
                      alt="No image available"
                      className="w-full h-full rounded-full object-cover object-center"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Product Strip */}
            <ProductStrip />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {product.name}
            </h1>

            {/* Swift Delivery Line */}
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-red-600  px-3 py-2 rounded-md inline-block">
                <strong>Swift Delivery</strong> - Shipping Across Jaipur. Bringing the goodness of dry fruits to your doorstep, no matter where you are! (Chat with us)
              </p>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  Description:
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  {product.shortDescription}
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
              <a
                href={`https://wa.me/919024675644?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto sm:min-w-[200px] md:w-[30%] bg-[#5e0404] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-700 transition-colors shadow-md text-center"
              >
                Whatsapp Us
              </a>
            </div>
          </div>
        </div>

        {/* Tabs for Full Description and Benefits - width section */}
        <div className="w-full mx-auto mt-8 sm:mt-10">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 text-base sm:text-lg font-medium transition-colors ${
                activeTab === 'description'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-4 py-2 text-base sm:text-lg font-medium transition-colors ${
                activeTab === 'benefits'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Benefits
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
            {activeTab === 'description' && product.fullDescription && (
              <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {descriptionFirstLine && (
                  <p className="font-bold text-gray-900">{descriptionFirstLine}</p>
                )}
                {descriptionRest && (
                  <p className="mt-2 whitespace-pre-line">{descriptionRest}</p>
                )}
              </div>
            )}

            {activeTab === 'benefits' && product.benefits && (
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Health Benefits
                </h3>
                <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {product.benefits.split('\n').map((line, index) => {
                    // Check if line starts with a bullet point or should be formatted as one
                    const trimmedLine = line.trim();
                    if (trimmedLine) {
                      // Format lines that start with specific keywords as bold headings
                      const isHeading = /^(Heart Health|Nutrient Powerhouse|Weight Management|Brain Health|Bone Health|Skin Health|Digestive Health|Energy Boost|Immune Support|Blood Sugar|Antioxidant|Protein|Fiber|Vitamin|Mineral)/i.test(trimmedLine);
                      
                      if (isHeading && trimmedLine.includes(':')) {
                        const [heading, ...rest] = trimmedLine.split(':');
                        return (
                          <div key={index} className="mb-2 sm:mb-3">
                            <strong className="text-gray-900">{heading}:</strong>
                            <span className="ml-1">{rest.join(':')}</span>
                          </div>
                        );
                      }
                      
                      return (
                        <div key={index} className="mb-2 sm:mb-3 flex items-start">
                          <span className="mr-2 text-gray-900">•</span>
                          <span>{trimmedLine}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

