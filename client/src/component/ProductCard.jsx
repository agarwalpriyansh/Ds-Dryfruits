import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  if (!product) return null;

  // Get the first variant as default, or use the first variant from the array
  const defaultVariant = product.variants && product.variants.length > 0 
    ? product.variants[0] 
    : null;

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

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

  // Get current price based on selected variant
  const currentPrice = selectedVariant?.price || 0;
  const currentWeight = selectedVariant?.weight || '';

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top Section - Beige Background with Brand and Product Image */}
        {/* Product Image */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square">
            <img
              src={imageUrl}
              alt={product.name || 'Product image'}
              className="w-full h-full object-cover object-center"
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
        <h3 className="text-center text-bold text-gray-900 mb-3 sm:mb-4">
          {product.name}
        </h3>

        {/* Quantity Selector Dropdown */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <select
              value={selectedVariant ? `${selectedVariant.weight}-${selectedVariant.price}` : ''}
              onChange={(e) => {
                const [weight, price] = e.target.value.split('-');
                const variant = product.variants.find(
                  v => v.weight === weight && v.price === parseFloat(price)
                );
                setSelectedVariant(variant || defaultVariant);
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-gray-900 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8b4513] focus:border-transparent appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '12px',
                paddingRight: '2.5rem'
              }}
            >
              {product.variants.map((variant, index) => (
                <option
                  key={index}
                  value={`${variant.weight}-${variant.price}`}
                >
                  {variant.weight}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price */}
        {currentPrice > 0 && (
          <p className="text-center text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            ₹{currentPrice.toFixed(2)}
          </p>
        )}

        {/* View Details Button */}
        <Link
          to={`/products/${product._id}`}
          className="flex items-center justify-center w-full bg-[#5e0404] hover:bg-gray-900 text-white py-2.5 sm:py-3 px-4 rounded-md font-medium text-sm sm:text-base transition-colors shadow-sm"
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
