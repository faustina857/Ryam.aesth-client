import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getServices } from '../services/api'
import type { Service } from '../types'
import { Helmet } from 'react-helmet-async'
import { optimizeImage } from '../utils/cloudinary'

const CATEGORIES = ['All', 'Facials', 'Waxing', 'Brows', 'Massage Therapy'] as const
type Category = typeof CATEGORIES[number]

export default function Services() {
const [searchParams] = useSearchParams()
const [activeCategory, setActiveCategory] = useState<Category>('All')

useEffect(() => {
  const cat = searchParams.get('category')
  if (cat && CATEGORIES.includes(cat as Category)) {
    setActiveCategory(cat as Category)
  } else {
    setActiveCategory('All')
  }
}, [searchParams])

  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })

  const services: Service[] = data?.data ?? []

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory)

  return (
    <main className="min-h-screen bg-white dark:bg-spa-dark">
      <Helmet>
        <title>Our Services | Ryam Aesthetics</title>
        <meta name="description" content="Explore our full range of spa services — facials, waxing, brow treatments, and massage therapy. Book your preferred treatment online." />
        <meta property="og:title" content="Our Services | Ryam Aesthetics" />
        <meta property="og:url" content="https://ryamaesthetics.com/services" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-spa-text py-24 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-widest uppercase text-gold mb-3"
        >
          What We Offer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-white font-light"
        >
          Our Services
        </motion.h1>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 md:top-20 z-40 bg-cream-light/95 dark:bg-spa-dark/95 backdrop-blur-sm border-b border-spa-border dark:border-spa-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 font-sans text-xs tracking-widest uppercase px-5 py-2 rounded-pill transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gold text-white'
                    : 'bg-transparent text-spa-muted dark:text-cream-light/60 hover:text-gold border border-spa-border dark:border-spa-surface'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-spa-surface p-8 flex flex-col items-center gap-4">
                <div className="w-36 h-36 rounded-full bg-cream-dark dark:bg-spa-dark animate-pulse" />
                <div className="h-4 w-32 bg-cream-dark dark:bg-spa-dark rounded animate-pulse" />
                <div className="h-3 w-full bg-cream-dark dark:bg-spa-dark rounded animate-pulse" />
                <div className="h-3 w-3/4 bg-cream-dark dark:bg-spa-dark rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-sans text-sm text-spa-muted dark:text-cream-light/60">
              No services found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-cream-light/95 dark:bg-spa-surface p-6 flex flex-col items-center text-center gap-2 border border-spa-border dark:border-spa-surface hover:shadow-md transition-shadow duration-300"
              >
                {/* Circular image */}
                <div className="w-36 h-36 rounded-full overflow-hidden flex-shrink-0 bg-cream-dark">
                  <img
                    src={optimizeImage(service.image, 400)}
                    alt={service.name}
                    loading='lazy'
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service name */}
                <h3 className="font-serif text-xl text-spa-text dark:text-cream-light font-light">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-spa-muted dark:text-cream-light/60 leading-relaxed">
                  {service.description}
                </p>

                {/* Duration */}
                {service.duration && (
                  <p className="font-sans text-xs tracking-widest uppercase text-gold">
                    {service.duration}
                  </p>
                )}

                {/* Price */}
                <p className="font-serif text-2xl text-spa-text dark:text-cream-light">
                  ₦{service.price.toLocaleString()}
                </p>

                {/* Book button */}
                <Link
                  to={`/book?service=${encodeURIComponent(service.name)}`}
                  className="w-full bg-gold text-white font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-pill hover:bg-gold-light transition-colors duration-300 text-center mt-auto"
                >
                  Book Now
                </Link>

              </motion.div>
            ))}
          </div>
        )}
      </section>

    </main>
  )
}