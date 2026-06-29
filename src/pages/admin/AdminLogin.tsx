import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { loginAdmin } from '../../services/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('adminToken', data.token)
        navigate('/admin/appointments')
      }
    },
    onError: () => {
      setError('Invalid email or password')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(form)
  }

  return (
    <main className="min-h-screen bg-spa-text flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <img
            src="/logo.jpeg"
            alt="Ryam Aesthetics"
            className="h-16 w-16 rounded-full object-cover"
          />
          <p className="font-display text-sm tracking-widest uppercase text-white">
            Ryam.Aesthetics
          </p>
          <p className="font-sans text-xs text-white/40 tracking-widest uppercase">
            Admin Portal
          </p>
        </div>

        {/* Form */}
        <div className="bg-spa-surface rounded-3xl p-8 flex flex-col gap-6">
          <h1 className="font-serif text-2xl text-white font-light text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-white/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-white/30"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-red-400 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-4 rounded-pill hover:bg-gold-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>

          </form>
        </div>

      </motion.div>
    </main>
  )
}