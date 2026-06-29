import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'
import { useRef } from 'react'
import { useQuery} from '@tanstack/react-query'
import { getServices } from '../services/api'
import type { Service } from '../types'
import { Helmet } from 'react-helmet-async'
import { optimizeImage } from '../utils/cloudinary'

const CATEGORIES = ['Facials', 'Waxing', 'Brows', 'Massage Therapy'] as const

export default function Home() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const {displayText: welcomeText, isDone: welcomeDone} = useTypewriter(
        'Welcome to Ryam Aesthetics',
         60, 1500
        )

    const { data, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    })

    const services = data?.data ?? []

    const categoryPreviews = CATEGORIES.map(category => {
        const match = services.find((s: Service) => s.category === category)
        return { category, image: match?.image ?? null }
    })
    
  
  return (
    <main>
      <Helmet>
        <title>Ryam Aesthetics | Home Spa & Wellness in Ajah, Lagos</title>
        <meta name="description" content="Experience premium spa treatments at Ryam Aesthetics. Facials, waxing, brow treatments, and massage therapy in Ajah, Lagos. Book your appointment today." />
        <meta property="og:title" content="Ryam Aesthetics | Home Spa & Wellness" />
        <meta property="og:description" content="Premium spa treatments in Ajah, Lagos. Facials, waxing, brow treatments & massage therapy." />
        <meta property="og:url" content="https://ryamaesthetics.com" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Video Background */}
        <video
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          onLoadedData={() => {
            if (videoRef.current){
                videoRef.current.playbackRate = 0.1
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <p className="font-sans text-xs tracking-widest uppercase text-gold mb-4 h-4">
            {welcomeText}
            {!welcomeDone && <span className="animate-pulse">|</span>}
          </p>

           <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-serif text-3xl md:text-6xl lg:text-7xl text-white font-light leading-tight mb-6 max-w-3xl"
          >
            Premium Spa Treatments for Your Well-Being
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="font-sans text-sm md:text-base text-white/80 max-w-md mb-10"
          >
            Experience the best facial treatments, waxing, brow treatments and massage therapy in our comfort zone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={welcomeDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/book"
              className="w-full sm:w-auto bg-gold text-white font-sans text-sm font-medium px-8 py-3.5 rounded-pill hover:bg-gold-light transition-colors duration-300 text-center"
            >
              Book Appointment
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto border border-white text-white font-sans text-sm font-medium px-8 py-3.5 rounded-pill hover:bg-white hover:text-spa-text transition-colors duration-300 text-center"
            >
              Our Services
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={welcomeDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-xs tracking-widest uppercase text-white/60">Scroll</span>
          <div className="w-px h-8 bg-white/40" />
        </motion.div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-cream-light dark:bg-spa-dark py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-12">
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">
              What We Offer
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-spa-text dark:text-cream-light font-light">
              Our Services
            </h2>
          </div>

          {/* Category cards */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CATEGORIES.map(cat => (
                <div key={cat} className="flex flex-col items-center gap-4">
                  <div className="w-40 h-60 md:w-52 md:h-80 rounded-full bg-cream-dark dark:bg-spa-surface animate-pulse" />
                  <div className="h-3 w-20 bg-cream-dark dark:bg-spa-surface rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-8 scrollbar-hide">
              {categoryPreviews.map(({ category, image }, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-4 group flex-shrink-0 w-48 md:w-auto"
                >
                  <Link to={`/services?category=${encodeURIComponent(category)}`} className="flex flex-col items-center gap-4">
                    <div className="w-40 h-60 md:w-52 md:h-80 rounded-full overflow-hidden bg-cream-dark dark:bg-spa-surface flex-shrink-0">
                      {image ? (
                        <img
                          src={optimizeImage(image ?? '', 300)}
                          alt={category}
                          loading='lazy'
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-cream-dark dark:bg-spa-surface" />
                      )}
                    </div>

                    {/* Category name */}
                    <p className="font-sans text-xs tracking-widest uppercase text-spa-text dark:text-cream-light group-hover:text-gold transition-colors duration-300">
                      {category}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* View all link */}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="font-sans text-xs tracking-widest uppercase text-gold border-b border-gold pb-0.5 hover:text-gold-light hover:border-gold-light transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>

        </div>
      </section>
      {/* Mission & Vision Section */}
    <section className="bg-white dark:bg-spa-surface py-24 px-4 overflow-hidden">
    <div className="max-w-7xl mx-auto">

        {/* Mobile layout: Mission, Image, Vision stacked */}
        {/* Desktop layout: Text column left, Image column right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-start">

        {/* Mission — order 1 on mobile, part of text column on desktop */}
        {/* Mission */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 md:order-1 md:row-start-1 relative px-4 md:pl-10 md:ml-5"
            >
            <span className="absolute -top-6 -left-2 md:-left-2 font-display text-7xl md:text-9xl text-gold/30 leading-none select-none pointer-events-none">
                "
            </span>
            <div className="">
                <h2 className="font-serif text-xl lg:text-4xl font-bold tracking-wide uppercase text-gold mb-1">
                Our Mission
                </h2>
                <div className='relative inline-block'>
                    <p className="font-display text-sm md:text-xl lg:text-2xl text-spa-muted dark:text-cream-light/70 leading-relaxed max-w-md">
                    To enhance natural beauty through expert luxurious skincare and body treatments that inspire confidence and comfort.
                    </p>
                    <span className="absolute right-0 md:left-24 md:-bottom-24 font-display text-7xl md:text-9xl text-gold/30 leading-none select-none pointer-events-none">
                    "
                    </span>
                </div>
                
            </div>
        
         </motion.div>

        {/* Image — order 2 on mobile, spans both rows on desktop */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="order-2 md:order-2 md:row-span-2"
            >
            <div className="relative mx-auto bg-gold/30 w-[290px] h-[400px] md:w-[500px] md:h-[520px]">
                <div className="absolute md:top-80 top-60 left-12 md:right-[-60px] -translate-y-1/2 w-[90%] md:w-full h-[100%] md:h-full">
                <img
                    src="/home-img.jpeg"
                    alt="Inside Ryam Aesthetics"
                    loading='lazy'
                    className="w-full h-full object-cover"
                />
                </div>
            </div>
        </motion.div>

        {/* Vision — order 3 on mobile, part of text column on desktop */}
        {/* Vision */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-3 md:order-1 md:row-start-2 relative mt-7 px-5 md:pl-10 md:ml-5"
            >
            <span className="absolute -top-6 -left-0 md:-left-2 font-display text-7xl md:text-9xl text-gold/30 leading-none select-none pointer-events-none">
                "
            </span>
            <div className=" ">
                <h2 className="font-serif text-xl lg:text-4xl font-bold tracking-wide uppercase text-gold mb-1">
                Our Vision
                </h2>
            <div className='relative inline-block'>
                <p className="font-display text-sm md:text-xl lg:text-2xl text-spa-muted dark:text-cream-light/70 leading-relaxed max-w-md">
                To be the go-to aesthetics brand in Nigeria for quality care and lasting skin wellness.
                </p>
                <span className="absolute right-0 md:left-24 md:-bottom-24 font-display text-7xl md:text-9xl text-gold/30 leading-none select-none pointer-events-none">
                "
                </span>
            </div>
            </div>

        </motion.div>

        </div>
    </div>
    </section>
    {/* CTA Banner Section */}
<section className="bg-spa-text dark:bg-spa-surface py-20 px-4 md:px-8 lg:px-16">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3">
        Ready to Begin?
      </p>
      <h2 className="font-serif text-3xl md:text-4xl text-white font-light leading-snug max-w-md">
        Book Your Treatment at Ryam Aesthetics Today
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="flex-shrink-0"
    >
      <Link
        to="/book"
        className="inline-block bg-gold text-white font-sans text-xs tracking-widest uppercase px-10 py-4 rounded-pill hover:bg-gold-light transition-colors duration-300"
      >
        Book Appointment
      </Link>
    </motion.div>

  </div>
</section>
    </main>
  )
}