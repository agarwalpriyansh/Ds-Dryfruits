import { useState, useEffect, useRef } from 'react';

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
 * - ...props: Standard img attributes
 */
export default function LazyImage({ src, alt, className = "", skeletonClassName = "", onLoad, onError, ...props }) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
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
      rootMargin: '200px' // Start loading slightly before it comes into view
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
      className={`relative overflow-hidden ${!isLoaded ? 'bg-gray-200' : ''} ${className}`}
      // If className includes width/height or positioning, the container needs to handle it too
      // Ideally, the consumer passes specific skeletonClassName for sizing if className is not enough
      // But we apply the className to the wrapper too for layout consistency if it's structural
    >
      {/* Skeleton / Shimmer Overlay */}
      {(!isInView || !isLoaded) && (
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
            className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
            {...props}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className={`flex items-center justify-center bg-gray-200 text-gray-400 ${className}`}>
             {/* Fallback icon or text could go here */}
             <span className="text-xs">IMG ERR</span>
          </div>
        )
      )}
    </div>
  );
}
