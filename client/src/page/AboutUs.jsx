import React, { useEffect, useMemo, useState } from 'react'
import ReviewsSection from '../component/Review'

const CAROUSEL_INTERVAL = 4000

export const AboutUs = () => {
  const images = useMemo(
    () => [
      'https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765190213/5_i03hrg.webp',
      'https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765190214/6_msjkgv.webp',
      'https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765190213/3_bdq0yz.webp',
      'https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765190213/2_cmzuih.webp',
      'https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765190213/4_kjmrb4.webp'
    ],
    []
  )

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, CAROUSEL_INTERVAL)
    return () => clearInterval(timer)
  }, [images.length])

  const goPrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length)
  const goNext = () => setCurrent((prev) => (prev + 1) % images.length)

  return (
    <div className="mt-1 space-y-12">
      <section className="relative h-64 overflow-hidden sm:h-80 lg:h-[280px]">
        <img
          src="https://i.pinimg.com/736x/cc/4f/39/cc4f394f191fa26abb938f3561fdcb92.jpg"
          alt="DS Dryfruits storefront"
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">About Us</h1>
          </div>
        </div>
      </section>

      <div className="px-6 py-10 lg:px-8 space-y-12">
      <section className="max-w-6xl mx-auto flex flex-col gap-8 lg:flex-row lg:items-start">
        <img
          src="https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765190213/3_bdq0yz.webp"
          alt="DS Dryfuits"
          className="w-full rounded-2xl object-cover shadow-2xl lg:h-[335px] lg:w-1/2"
        />

        <div className="space-y-4 lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
          <p className="text-lg font-semibold text-[#7a1d14]">
            DS Dryfruits brings you a collection of carefully selected foods from India and across
            the world.
          </p>
          <p className="leading-relaxed text-gray-800">
            In our passionate search to offer food that is unique and full of health, we have ensured
            you get only the best products. Our products are well-loved for their quality and taste.
            We have gained expertise in fine Indian food products and food ingredients across
            categories - Dry Fruits, Chocolates, Gift Boxes and Spices. We are importing fine quality
            Nuts, dry fruits and drinks from the source from which they are available at their best.
            We are sure you will find our quality products appetizing.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto space-y-4 text-gray-800 leading-relaxed">
        <p>
          We started our first outlet at Khatipura Road, Jaipur in 2010. We focus on stringent quality
          control and prompt service in order to ensure market standards. Our focus on quality is
          evident in our product range. We do not compromise on quality and there is very high level
          of customer appreciation resulting in long-lasting relations. The company's excellent
          performance is the result of persistent efforts to achieve high efficiency in the business.
          Dry Fruit House has established relationship with key leaders in the domestic as well as
          the international market.
        </p>
        <p>
          Our goal is to nourish people's lives by offering a wide variety of convenient, delicious,
          and hygienic food choices that can help everyone enjoy a balanced, healthful diet. We
          provide gifting varieties such as chocolate bouquets, dryfruits packs, fancy dry fruit
          baskets and plenty of other varieties.
        </p>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-[#7a1d14]">Vision</p>
          <p>
            To be India's most customer centric company, where customers can buy high quality dry
            fruits at their convenience and enjoy a balanced, healthful diet.
          </p>
          <p className="text-xl font-semibold text-[#7a1d14]">Mission</p>
          <p>
            We strive to offer our customers the top quality dry fruits at reasonable rates and at
            the utmost convenience.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto relative overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
        <img
          src={images[current]}
          alt={`DS Dryfruits ${current + 1}`}
          className="block h-[280px] w-full object-cover transition-opacity duration-500 sm:h-[360px] md:h-[520px]"
        />

        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 transform gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full shadow-sm transition ${
                idx === current ? 'bg-white' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      <ReviewsSection />
      </div>
    </div>
  )
}
