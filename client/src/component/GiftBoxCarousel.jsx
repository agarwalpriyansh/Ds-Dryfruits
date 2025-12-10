"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import GiftBoxCard from "./gift-box-card"

const GIFT_BOXES = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1764775659/2_jukcok.jpg",
    brand: "DS Dryfruits",
    collection: "Gift Box Collection",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1764775660/3_wsqm07.jpg",
    brand: "DS Dryfruits",
    collection: "Gift Box Collection",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1764775664/5_q0mjbz.jpg",
    brand: "DS Dryfruits",
    collection: "Gift Box Collection",
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1764775666/6_sywzk0.jpg",
    brand: "DS Dryfruits",
    collection: "Gift Box Collection",
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1764775658/1_jem9kz.jpg",
    brand: "DS Dryfruits",
    collection: "Gift Box Collection",
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1764775666/6_sywzk0.jpg",
    brand: "DS Dryfruits",
    collection: "Gift Box Collection",
  },
]

export default function GiftBoxCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)
  const [gapSize, setGapSize] = useState(1) // in rem
  const [touchStartX, setTouchStartX] = useState(null)

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth
      if (width >= 1200) {
        setItemsPerPage(4)
        setGapSize(1.5) // gap-6 = 1.5rem
      } else if (width >= 992) {
        setItemsPerPage(3)
        setGapSize(1.5) // gap-6 = 1.5rem
      } else if (width >= 640) {
        setItemsPerPage(2)
        setGapSize(1.5) // gap-6 = 1.5rem
      } else {
        setItemsPerPage(1)
        setGapSize(1) // gap-4 = 1rem
      }
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const maxIndex = Math.max(0, GIFT_BOXES.length - itemsPerPage)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  // Calculate which items to show based on available width
  const visibleItems = []
  for (let i = 0; i < itemsPerPage; i++) {
    const index = currentIndex + i
    if (index < GIFT_BOXES.length) {
      visibleItems.push(GIFT_BOXES[index])
    }
  }

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return
    const touchEndX = event.changedTouches[0].clientX
    const delta = touchStartX - touchEndX
    const threshold = 40

    if (delta > threshold) {
      goToNext()
    } else if (delta < -threshold) {
      goToPrevious()
    }

    setTouchStartX(null)
  }

  return (
    <div className="sm:pb-6 md:pb-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[99%] mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          Gift Boxes - Signature Collection
        </h2>
        <div className="relative w-full">
          {/* Carousel Items */}
          <div
            className="flex gap-4 sm:gap-6 overflow-hidden w-full pr-0"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {visibleItems.map((box) => (
              <div
                key={box.id}
                className="flex-shrink-0"
                style={{ 
                  flex: `0 0 calc((100% - ${(itemsPerPage - 1) * gapSize}rem) / ${itemsPerPage})`,
                  minWidth: 0,
                  maxWidth: `calc((100% - ${(itemsPerPage - 1) * gapSize}rem) / ${itemsPerPage})`
                }}
              >
                <GiftBoxCard {...box} />
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5e0404] hover:bg-[#4a0303] text-white transition-colors shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#5e0404] hover:bg-[#4a0303] text-white transition-colors shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {GIFT_BOXES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-foreground" : "bg-border"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
