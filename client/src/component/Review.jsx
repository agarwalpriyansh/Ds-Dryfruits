'use client'

import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Roshan Prajwal',
    text: 'Excellent quality dry fruits and delicious chocolates! Fresh, flavorful, and perfect for gifting.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Bilal Abdullah',
    text: 'A delightful mix of premium dry fruits and irresistible chocolates. Great quality and taste!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Prashanth Kumar',
    text: 'Top-notch quality with amazing flavor combinations. A must-visit for dry fruit and chocolate lovers!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    text: 'Amazing products and incredible customer service. Highly recommend to everyone!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Michael Chen',
    text: 'The best selection I have found. Premium quality and fast delivery!',
    rating: 5,
  },
]

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const getVisibleReviews = () => {
    const visibleCount = 3
    const items = []
    for (let i = 0; i < visibleCount; i++) {
      items.push(reviews[(currentIndex + i) % reviews.length])
    }
    return items
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  return (
    <section className="w-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50  px-4 sm:py-20">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-3 sm:mb-16">
        <h2 className="text-3xl tracking-loose sm:text-md lg:text-md font-bold text-center text-slate-900 text-balance">
          Words From Our Delighted Customers
        </h2>
      </div>

      {/* Reviews Container */}
      <div className="max-w-6xl mx-auto">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {getVisibleReviews().map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-amber-800 w-3 h-3'
                  : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col">

      {/* Customer Avatar */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">{review.name}</h3>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
        {review.text}
      </p>

      {/* Stars */}
      <div className="flex gap-1 mx-auto">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-amber-400 text-amber-400"
            strokeWidth={0}
          />
        ))}
      </div>
    </div>
  )
}

