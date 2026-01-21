import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

export default function ProductCard({ product, isGiftBox }) {
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
          <div className="w-[85%] aspect-square flex items-center justify-center">
            <LazyImage
              src={imageUrl}
              alt={product.name || 'Product image'}
              className="w-full h-full rounded-full object-cover object-center"
              skeletonClassName="rounded-full"
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

        {/* Quantity Selector Dropdown - Hide if Gift Box */}
        {!isGiftBox && variants.length > 0 && (
          <div className="mb-3 sm:mb-4 flex justify-center">
            <select
              value={
                selectedVariant
                  ? (() => {
                      const index = variants.findIndex(
                        (v) =>
                          v.weight === selectedVariant.weight &&
                          Number(v.price) === Number(selectedVariant.price)
                      );
                      return index >= 0 ? index : '';
                    })()
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

        {/* Price - Hide if Gift Box */}
        {!isGiftBox && currentPrice !== null && currentPrice !== undefined && (
          <p className="text-center text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
            ₹{Number(currentPrice).toFixed(2)}
          </p>
        )}

        {/* Button - WhatsApp if Gift Box, else View Details */}
        {isGiftBox ? (
          <a
            href={`https://wa.me/919024675644?text=${encodeURIComponent(`Hi, I am interested in ${product.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex items-center justify-center w-[60%] bg-[#25D366] hover:bg-[#128C7E] text-white py-1.5 sm:py-1.5 px-4 rounded-md font-medium text-sm sm:text-base transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp Us
          </a>
        ) : (
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
        )}
      </div>
    </div>
  );
}
