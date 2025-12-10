import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  if (!product) return null;

  // Normalize variants; fall back to a single default price entry
  const variants =
    product?.variants && product.variants.length > 0
      ? product.variants
      : product.defaultPrice
        ? [product.defaultPrice]
        : [];

  // Get the first variant as default
  const defaultVariant = variants.length > 0 ? variants[0] : null;

  const [selectedVariant, setSelectedVariant] = useState(null);

  // Keep selected variant in sync when product data changes
  useEffect(() => {
    setSelectedVariant(defaultVariant);
  }, [defaultVariant]);

  // Handle image URL
  const getImageUrl = () => {
    const imageUrl = product.imageUrl || product.image || product.img;
    
    if (!imageUrl || imageUrl.trim() === '') {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f5f5dc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";
    }
    
    const trimmedUrl = imageUrl.trim();
    
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }
    
    if (trimmedUrl.startsWith('/')) {
      return trimmedUrl;
    }
    
    return `/${trimmedUrl}`;
  };

  const imageUrl = getImageUrl();
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f5f5dc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

  // Get current price based on selected variant; fall back to default/product price
  const currentPrice =
    selectedVariant?.price ??
    product.defaultPrice?.price ??
    product.price ??
    null;
  const currentWeight =
    selectedVariant?.weight ??
    product.defaultPrice?.weight ??
    product.weight ??
    '';

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-300">
        {/* Product Image */}
        <div 
          className="relative z-10 w-full flex items-center justify-center aspect-square"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765387511/prouctbg_jkhkhw.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="w-[60%] h-[60%] flex items-center justify-center">
            <img
              src={imageUrl}
              alt={product.name || 'Product image'}
              className="w-full h-full rounded-full object-cover object-center"
              onError={(e) => {
                if (e.target.src !== placeholderImage) {
                  e.target.src = placeholderImage;
                }
              }}
            />
          </div>
        </div>

      {/* Bottom Section - White Background with Product Details */}
      <div className="bg-white px-4 pb-5 sm:pb-6 pt-4 sm:pt-5">
        {/* Product Name */}
        <h3 className="text-center font-bold text-gray-900 mb-3 sm:mb-4">
          {product.name}
        </h3>

        {/* Quantity Selector Dropdown */}
        {variants.length > 0 && (
          <div className="mb-3 sm:mb-4 flex justify-center">
            <select
              value={
                selectedVariant
                  ? variants.findIndex(
                      (v) =>
                        v.weight === selectedVariant.weight &&
                        Number(v.price) === Number(selectedVariant.price)
                    )
                  : ''
              }
              onChange={(e) => {
                const variantIndex = Number(e.target.value);
                const variant = variants[variantIndex];
                setSelectedVariant(variant || defaultVariant);
              }}
              className="w-30 sm:w-30 px-1 py-1 border border-gray-300 bg-white text-gray-900 text-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8b4513] focus:border-transparent appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '12px',
                paddingRight: '2.5rem'
              }}
            >
              <option value="" disabled hidden>
                Select weight
              </option>
              {variants.map((variant, index) => (
                <option
                  key={index}
                  value={index}
                >
                  {(variant.weight || 'Default')}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        {currentPrice !== null && currentPrice !== undefined && (
          <p className="text-center text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            ₹{Number(currentPrice).toFixed(2)}
          </p>
        )}

        {/* View Details Button */}
        <Link
          to={`/products/${product._id}`}
          className="mx-auto flex items-center justify-center w-[50%] bg-[#5e0404] hover:bg-gray-900 text-white py-1.5 sm:py-1.5 px-4 rounded-md font-medium text-sm sm:text-base transition-colors shadow-sm"
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          View Details
        </Link>
      </div>
    </div>
  );
}
