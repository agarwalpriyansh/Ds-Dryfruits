import { useState, useEffect } from "react"

export default function ImageCarousel({ images, autoPlayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay || !images || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlay, autoPlayInterval, images?.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setIsAutoPlay(false)
  }

  if (!images || images.length === 0) return null

  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden m-0 p-0"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Main carousel container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt || `Carousel image ${index + 1}`}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                console.error('Image failed to load:', image.src);
                e.target.src = '/placeholder.svg';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', image.src);
              }}
            />
          </div>
        ))}
      </div>

      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/85 text-gray-900 p-1.5 sm:p-2 rounded-full border-none cursor-pointer flex items-center justify-center hover:bg-white/95 transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/85 text-gray-900 p-1.5 sm:p-2 rounded-full border-none cursor-pointer flex items-center justify-center hover:bg-white/95 transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 border-none cursor-pointer ${
              index === currentIndex
                ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-white'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  )
}
