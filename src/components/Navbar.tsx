import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()
  const [isDark, setIsDark] = useState(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    document.documentElement.classList.add('dark')
    return true
  }
  return false
})

  const isHome = location.pathname === '/'
    const { displayText: brandText } = useTypewriter(
    'Ryam.Aesthetics',
    80,
    isHome ? 300 : 0
 )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-light/95 dark:bg-spa-dark/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 z-50">
              <img
                src="/logo.jpeg"
                alt="Ryam Aesthetics"
                className="h-10 w-10 rounded-full object-cover flex-shrink-0 md:h-12 md:w-12"
              />
              <span className={`font-display text-sm tracking-widest uppercase whitespace-nowrap md:text-base ${
                isScrolled ? 'text-spa-text dark:text-cream-light' : 'text-white'}`}>
                {isHome ? brandText : 'Ryam.Aesthetics'}
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-serif text-xs tracking-widest uppercase transition-colors duration-200 hover:text-gold ${
                    location.pathname === link.path
                      ? 'text-gold'
                      : isScrolled
                      ? 'text-spa-text dark:text-cream-light'
                      : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-cream-dark dark:hover:bg-spa-surface transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark
                  ? <Sun size={16} className="text-gold" />
                  : <Moon size={16} className={isScrolled ? 'text-spa-text dark:text-cream-light' : 'text-white'} />
                }
              </button>
              <Link
                to="/book"
                className="bg-gold text-white font-sans text-xs tracking-widest uppercase px-6 py-2.5 rounded-pill hover:bg-gold-light transition-colors duration-300"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile right */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark
                  ? <Sun size={16} className="text-gold" />
                  : <Moon size={16} className={isScrolled ? 'text-spa-text' : 'text-white'} />
                }
              </button>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 rounded-full transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} className={isScrolled ? 'text-spa-text dark:text-cream-light' : 'text-white'} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-4/5 max-w-xs bg-spa-dark lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.jpeg"
                    alt="Ryam Aesthetics"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-display text-xs tracking-widest uppercase text-white">
                    Ryam.Aesthetics
                  </span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-white/70" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col px-6 py-4 flex-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link
                      to={link.path}
                      className={`block font-sans text-xs tracking-widest uppercase py-4 border-b border-white/10 transition-colors hover:text-gold ${
                        location.pathname === link.path
                          ? 'text-gold'
                          : 'text-white/80'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-8">
                  <Link
                    to="/book"
                    className="block bg-gold text-white font-sans text-xs tracking-widest uppercase px-6 py-3.5 rounded-pill hover:bg-gold-light transition-colors duration-300 text-center"
                  >
                    Book Appointment
                  </Link>
                </div>
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-6 border-t border-white/10">
                <p className="font-sans text-xs text-white/40 tracking-wider">
                  Open · Mon–Sun | 9am–7pm
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}