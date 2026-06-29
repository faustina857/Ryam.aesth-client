import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getServices, createAppointment } from '../services/api'
import type { Service, Appointment } from '../types'
import { Helmet } from 'react-helmet-async'

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
]

const initialForm: Appointment = {
  fullName: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  specialRequests: '',
  numberOfPeople: 1,
}

export default function BookAppointment() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState<Appointment>(initialForm)
  const [success, setSuccess] = useState(false)

  const { data } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })

  const services: Service[] = data?.data ?? []

  useEffect(() => {
    const serviceFromUrl = searchParams.get('service')
    if (serviceFromUrl) {
      setForm(prev => ({ ...prev, service: serviceFromUrl }))
    }
  }, [searchParams])

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      setSuccess(true)
      setForm(initialForm)
    },
  })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: name === 'numberOfPeople' ? Number(value) : value,
        }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  const today = new Date().toISOString().split('T')[0]

  if (success) {
    return (
      <main className=" bg-cream-light dark:bg-spa-dark flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-spa-surface rounded-3xl p-10 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-gold text-2xl">✓</span>
          </div>
          <h2 className="font-serif text-2xl text-spa-text dark:text-cream-light font-light mb-3">
            Booking Received
          </h2>
          <p className="font-sans text-sm text-spa-muted dark:text-cream-light/60 leading-relaxed mb-6">
            Thank you for booking with Ryam Aesthetics. We have received your appointment request and will confirm it shortly via email.
          </p>
          <p className="font-sans text-xs text-spa-muted dark:text-cream-light/60 mb-8">
            For enquiries call <span className="text-gold">08105101960</span>
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-3 rounded-pill hover:bg-gold-light transition-colors duration-300"
          >
            Book Another
          </button>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream-light dark:bg-spa-dark">

      <Helmet>
        <title>Book an Appointment | Ryam Aesthetics</title>
        <meta name="description" content="Book your spa appointment at Ryam Aesthetics. Choose from facials, waxing, brow treatments, and massage therapy in Ajah, Lagos." />
        <meta property="og:title" content="Book an Appointment | Ryam Aesthetics" />
        <meta property="og:url" content="https://ryamaesthetics.com/book" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-spa-text py-32 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-widest uppercase text-gold mb-3"
        >
          Reserve Your Visit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-white font-light"
        >
          Book an Appointment
        </motion.h1>
      </section>

      {/* Form Section */}
      <section className="max-w-2xl mx-auto px-4 md:px-8 py-16">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-spa-surface rounded-3xl p-8 md:p-10 flex flex-col gap-6"
        >

          {/* Full Name */}
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

          {/* Email */}
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

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
            />
          </div>

          {/* Number of People */}
            <div className="flex flex-col gap-2">
            <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
                Number of People
            </label>
            <select
                name="numberOfPeople"
                value={form.numberOfPeople}
                onChange={handleChange}
                className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
            >
                <option value={1}>Just Me</option>
                <option value={2}>For 2</option>
                <option value={3}>For 3</option>
                <option value={4}>For 4</option>
                <option value={5}>For 5</option>
            </select>
            </div>

          {/* Service */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
              Select Service
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
            >
              <option value="">Choose a service</option>
              {services.map(s => (
                <option key={s._id} value={s.name}>
                  {s.name} — ₦{s.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={today}
                className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
                Preferred Time
              </label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
              >
                <option value="">Choose a time</option>
                {TIME_SLOTS.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs tracking-widest uppercase text-spa-muted dark:text-cream-light/60">
              Special Requests <span className="normal-case text-spa-muted/60">(optional)</span>
            </label>
            <textarea
              name="specialRequests"
              value={form.specialRequests}
              onChange={handleChange}
              placeholder="Any allergies, preferences, or requests..."
              rows={4}
              className="font-sans text-sm text-spa-text dark:text-cream-light bg-cream-light dark:bg-spa-dark border border-spa-border dark:border-spa-surface rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors resize-none"
            />
          </div>

          {/* Error message */}
          {isError && (
            <p className="font-sans text-xs text-red-500 text-center">
              {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-4 rounded-pill hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Submitting...' : 'Book Appointment'}
          </button>
          <p className="font-sans text-xs text-spa-muted dark:text-cream-light/40 text-center">
            By booking you agree to our{' '}
            <Link to="/privacy-policy" className="text-gold hover:text-gold-light underline">
              Privacy Policy
            </Link>
            . Appointments are subject to confirmation by Ryam Aesthetics.
          </p>

        </motion.form>
      </section>

    </main>
  )
}