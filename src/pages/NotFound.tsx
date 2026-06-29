import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream-light dark:bg-spa-dark flex items-center justify-center px-4">
      <div className="text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-8xl md:text-9xl text-gold/20 leading-none mb-4"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl text-spa-text dark:text-cream-light font-light mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-sm text-spa-muted dark:text-cream-light/60 max-w-sm mx-auto mb-8"
        >
          The page you are looking for does not exist or has been moved. Let us take you back home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-3.5 rounded-pill hover:bg-gold-light transition-colors duration-300"
          >
            Back to Home
          </Link>
          <Link
            to="/book"
            className="border border-spa-border dark:border-spa-surface text-spa-text dark:text-cream-light font-sans text-xs tracking-widest uppercase px-8 py-3.5 rounded-pill hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Book Appointment
          </Link>
        </motion.div>

      </div>
    </main>
  )
}