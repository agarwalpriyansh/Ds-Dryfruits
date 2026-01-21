import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronUp } from "lucide-react"
import LazyImage from "./LazyImage"
import giftBox1 from "../assets/giftbox/1.jpeg"
import giftBox2 from "../assets/giftbox/2.jpeg"
import giftBox3 from "../assets/giftbox/3.jpeg"
import giftBox4 from "../assets/giftbox/4.jpeg"
import giftBox5 from "../assets/giftbox/5.jpeg"
                

const CAROUSEL_ITEMS = [
  {
    id: 1,
    image: giftBox1,
    alt: "Pink and teal gift box with assorted dry fruits",
  },
  {
    id: 2,
    image: giftBox2,
    alt: "Golden basket with assorted nuts and dry fruits",
  },
  {
    id: 3,
    image: giftBox3,
    alt: "Colorful patterned gift box with dry fruits",
  },
  {
    id: 4,
    image: giftBox4,
    alt: "Luxury gift hamper with premium dry fruits",
  },
    {
        id: 5,
        image: giftBox5,
        alt: "Elegant gift box with assorted dry fruits and nuts",
    },
    
]

export default function GiftBoxCarousel() {
  const navigate = useNavigate()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Handle scroll to top button visibility and screen size
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    
    const handleResize = () => {
      // Show 2 items on small screens (< 768px), 3 on larger screens
      setItemsPerView(window.innerWidth < 768 ? 2 : 3)
    }
    
    // Set initial value
    handleResize()
    
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === CAROUSEL_ITEMS.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? CAROUSEL_ITEMS.length - 1 : prevIndex - 1
    )
  }

  // Swipe handlers
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Create extended items array for seamless wrapping
  const extendedItems = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS.slice(0, itemsPerView)]

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Content Section */}
          <div className="w-full lg:w-2/5 flex flex-col justify-start">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Latest Gift Boxes Collection
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Celebrate all festivals in a healthy & delicious way with our exquisite range of dry fruit gift hampers.
            </p>
            <button
              className="border border-black w-fit px-6 py-3 bg-black text-white hover:bg-black/90 font-semibold rounded-lg transition-colors"
              onClick={() => navigate("/themes/gift-boxes")}
            >
              View More
            </button>
          </div>

          {/* Right Carousel Section */}
          <div className="w-full lg:w-3/5">
            {/* Carousel Container */}
            <div className="relative">
              {/* Responsive Carousel with Sliding Animation */}
              <div 
                className="h-[200px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-lg relative touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div 
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(calc(-${currentIndex} * ((100% + 1rem) / ${itemsPerView})))`
                  }}
                >
                  {extendedItems.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="relative flex-shrink-0 aspect-square rounded-lg overflow-hidden bg-muted/30 shadow-md hover:shadow-lg transition-shadow"
                      style={{ width: `calc((100% - ${(itemsPerView - 1) * 1}rem) / ${itemsPerView})` }}
                    >
                      <LazyImage 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.alt} 
                        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-300" 
                        skeletonClassName="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 lg:mt-[-38%] sm:mt-[-30%] md:mt-[-25%]  relative z-10">
                {CAROUSEL_ITEMS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all duration-300 border-none cursor-pointer ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-gray-700'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-foreground text-background rounded-full shadow-lg hover:bg-foreground/90 transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </section>
  )
}
