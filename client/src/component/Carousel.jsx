"use client"

import { useState, useEffect } from "react"

export default function ImageCarousel({ images, autoPlayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  // Handle window resize for responsive design
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    // Set initial width
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlay || !images || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlay, autoPlayInterval, images?.length])

  // Responsive styles based on window width
  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024
  
  const carouselHeight = isMobile ? '300px' : isTablet ? '400px' : '500px'
  const buttonSize = isMobile ? '20px' : '24px'
  const buttonPadding = isMobile ? '6px' : '8px'
  const buttonLeftRight = isMobile ? '8px' : '16px'
  const indicatorSize = isMobile ? '8px' : '10px'
  const indicatorActiveWidth = isMobile ? '24px' : '32px'
  const indicatorBottom = isMobile ? '12px' : '16px'
  const borderRadius = isMobile ? '8px' : '12px'

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
      style={{
        position: 'relative',
        width: '100%',
        height: carouselHeight,
        overflow: 'hidden',
        borderRadius: borderRadius,
      }}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Main carousel container */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: index === currentIndex ? 1 : 0,
              transition: 'opacity 700ms ease-in-out',
            }}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: buttonLeftRight,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(255,255,255,0.85)',
          color: '#111827',
          padding: buttonPadding,
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Previous slide"
      >
        <svg width={buttonSize} height={buttonSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: buttonLeftRight,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(255,255,255,0.85)',
          color: '#111827',
          padding: buttonPadding,
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Next slide"
      >
        <svg width={buttonSize} height={buttonSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div
        style={{
          position: 'absolute',
          bottom: indicatorBottom,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          gap: isMobile ? '6px' : '8px',
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              height: indicatorSize,
              borderRadius: '9999px',
              transition: 'all 300ms',
              width: index === currentIndex ? indicatorActiveWidth : indicatorSize,
              background: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.6)',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.2), rgba(0,0,0,0))',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
