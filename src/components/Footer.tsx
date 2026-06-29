import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
  { label: 'Book appointment', path: '/book' },
]

const serviceLinks = ['Facials', 'Waxing', 'Brows', 'Massage Therapy', 'Training']

export default function Footer() {
  return (
    <footer className="bg-spa-text dark:bg-spa-dark text-white">

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5 pr-8">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Ryam Aesthetics"
                className="h-12 w-12 rounded-full object-cover flex-shrink-0"
              />
              <span className="font-display text-sm tracking-widest uppercase text-white">
                Ryam.Aesthetics
              </span>
            </Link>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              A luxury spa and wellness sanctuary in the heart of Ajah, Lagos. Dedicated to enhancing your natural beauty with expert care.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mb-3">
              
              <a href="https://instagram.com/ryam.aesthetics"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
              
                <a href="https://www.tiktok.com/@ryam.aesthetics"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors duration-300 flex items-center justify-center"
                aria-label="TikTok"
              >
                <FaTiktok size={16} />
              </a>
              
                <a href="https://wa.me/2348105101960"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold transition-colors duration-300 flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:contents gap-8">
                      {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase text-white mb-2">
                Quick Links
              </h3>
              <div className="w-8 h-px bg-gold" />
            </div>
            <ul className="flex flex-col gap-3">
              {navLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-sans text-sm text-white/60 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase text-white mb-2">
                Our Services
              </h3>
              <div className="w-8 h-px bg-gold" />
            </div>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map(service => (
                <li key={service}>
                  <Link
                    to={`/services?category=${encodeURIComponent(service)}`}
                    className="font-sans text-sm text-white/60 hover:text-gold transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>

          {/* Column 4 — Contact card */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase text-white mb-2">
                Find Us
              </h3>
              <div className="w-8 h-px bg-gold" />
            </div>
            <div className="bg-gold/10 rounded-2xl py-5 px-5 flex flex-col gap-5">

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-gold" />
                </div>
                <p className="font-sans text-xs text-white/70 leading-relaxed">
                  Lekki Peninsula Scheme 2, Ogombo Road, Abraham Adesanya, Ajah, Lagos.
                </p>
              </div>

              {/* Phone and Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-gold" />
                </div>
                <div className="flex flex-col gap-1">
                  
                   <a href="tel:08105101960"
                    className="font-sans text-xs text-white/70 hover:text-gold transition-colors"
                  >
                    08105101960
                  </a>
                  
                   <a href="mailto:ryamaesthetics5@gmail.com"
                    className="font-sans text-xs text-white/70 hover:text-gold transition-colors flex items-center gap-1"
                  >
                    <Mail size={11} />
                    ryamaesthetics5@gmail.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={14} className="text-gold" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-xs text-white/70">
                    Monday to Sunday
                  </p>
                  <p className="font-sans text-xs text-gold">
                    9:00 AM to 7:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl py-5">
          <p className="font-sans text-xs text-white/40 text-center">
            &copy; {new Date().getFullYear()} Ryam Aesthetics. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}