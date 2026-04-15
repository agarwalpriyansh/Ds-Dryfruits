import { useState, useEffect, useRef } from 'react';
import { getOptimizedCloudinaryUrl } from '../utils/cloudinaryHelper';

/**
 * LazyImage Component
 * 
 * Renders an image that only loads when it enters the viewport (using Intersection Observer).
 * Displays a skeleton loader (shimmer) while the image is loading or if it is not yet in view.
 * 
 * Props:
 * - src: Image source URL
 * - alt: Alt text
 * - className: Classes for the image element
 * - skeletonClassName: Classes for the skeleton container (should match image dimensions)
 * - priority: "high" for hero images (disables lazy loading, adds fetchpriority)
 * - ...props: Standard img attributes
 */
export default function LazyImage({ 
  src, 
  alt, 
  className = "", 
  skeletonClassName = "", 
  onLoad, 
  onError, 
  priority = "low", 
  ...props 
}) {
  const [isInView, setIsInView] = useState(priority === "high");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // Derive placeholder if it's a Cloudinary URL
  const isCloudinary = src && src.includes('res.cloudinary.com');
  const placeholderSrc = isCloudinary ? getOptimizedCloudinaryUrl(src, { placeholder: true }) : null;

  useEffect(() => {
    if (priority === "high") {
      setIsInView(true);
      return;
    }

    // If IntersectionObserver is not supported, just load the image immediately
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '400px' // Start loading earlier
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    setIsLoaded(true);
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${!isLoaded && !placeholderSrc ? 'bg-gray-200' : ''} ${className}`}
    >
      {/* Blurred Placeholder (LQIP) */}
      {isCloudinary && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover filter blur-lg scale-110 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'} ${className}`}
        />
      )}

      {/* Skeleton / Shimmer Overlay - Only show if no placeholder */}
      {(!isInView || !isLoaded) && !placeholderSrc && (
        <div 
          className={`absolute inset-0 z-10 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] ${skeletonClassName}`} 
        />
      )}

      {/* Actual Image */}
      {isInView && (
        !hasError ? (
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
            {...props}
            loading={priority === "high" ? "eager" : "lazy"}
            fetchpriority={priority}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className={`flex items-center justify-center bg-gray-200 text-gray-400 ${className}`}>
             <span className="text-xs">IMG ERR</span>
          </div>
        )
      )}
    </div>
  );
}
