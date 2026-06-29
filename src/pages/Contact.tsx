import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { sendContact } from '../services/api'
import { Helmet } from 'react-helmet-async'

const initialForm = {
  fullName: '',
  email: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [success, setSuccess] = useState(false)

  const { mutate, isPending, isError } = useMutation({
    mutationFn: sendContact,
    onSuccess: () => {
      setSuccess(true)
      setForm(initialForm)
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  return (
    <main className="min-h-screen bg-cream-light dark:bg-spa-dark">
      <Helmet>
        <title>Contact Us | Ryam Aesthetics</title>
        <meta name="description" content="Get in touch with Ryam Aesthetics. Visit us at Lekki Peninsula Scheme 2, Ogombo Road, Abraham Adesanya, Ajah, Lagos. Call 08105101960." />
        <meta property="og:title" content="Contact Us | Ryam Aesthetics" />
        <meta property="og:url" content="https://ryamaesthetics.com/contact" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-spa-text py-24 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-widest uppercase text-gold mb-3"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-white font-light"
        >
          Contact Us
        </motion.h1>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 py-16">
        {/* Google Map */}
            <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] mb-20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16502.70754552059!2d3.5585865309521916!3d6.460962246337362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf70010967da7%3A0x11b843f552784f10!2sLekki%20scheme%202!5e0!3m2!1sen!2sng!4v1782388862753!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ryam Aesthetics Location"
              />
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Left — Contact Details + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3 text-center md:text-left">
                Find Us
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-spa-text dark:text-cream-light font-light mb-8 text-center md:text-left">
                Visit Ryam Aesthetics
              </h2>

              {/* Contact details */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60 mb-1">
                      Address
                    </p>
                    <p className="font-sans text-sm text-spa-text dark:text-cream-light leading-relaxed">
                      Lekki Peninsula Scheme 2, Ogombo Road, <br /> Abraham Adesanya, Ajah, Lagos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60 mb-1">
                      Phone
                    </p>
                    
                      <a href="tel:08105101960"
                      className="font-sans text-sm text-spa-text dark:text-cream-light hover:text-gold transition-colors"
                    >
                      08105101960
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60 mb-1">
                      Email
                    </p>
                    
                      <a href="mailto:ryamaesthetics5@gmail.com"
                      className="font-sans text-sm text-spa-text dark:text-cream-light hover:text-gold transition-colors"
                    >
                      ryamaesthetics5@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60 mb-1">
                      Working Hours
                    </p>
                    <p className="font-sans text-sm text-spa-text dark:text-cream-light">
                      Monday to Sunday
                    </p>
                    <p className="font-sans text-sm text-gold">
                      9:00 AM to 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-xs tracking-widest uppercase text-gold mb-3 text-center md:text-left">
              Send a Message
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-spa-text dark:text-cream-light font-light mb-8 text-center md:text-left">
              We Would Love to Hear From You
            </h2>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-spa-surface rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold text-xl">✓</span>
                </div>
                <h3 className="font-serif text-xl text-spa-text dark:text-cream-light font-light mb-2">
                  Message Sent
                </h3>
                <p className="font-sans text-sm text-spa-muted dark:text-cream-light/60 mb-6">
                  Thank you for reaching out. We will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-3 rounded-pill hover:bg-gold-light transition-colors duration-300"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-spa-surface rounded-2xl p-8 flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    rows={5}
                    className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {isError && (
                  <p className="font-sans text-xs text-red-500 text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-4 rounded-pill hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

    </main>
  )
}