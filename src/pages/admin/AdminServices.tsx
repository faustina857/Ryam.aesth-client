import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getServices, createService, updateService, deactivateService } from '../../services/api'
import type { Service } from '../../types'
import { optimizeImage } from '../../utils/cloudinary'

const CATEGORIES = ['Facials', 'Waxing', 'Brows', 'Massage Therapy'] as const

const emptyForm = {
  name: '',
  description: '',
  category: 'Facials' as Service['category'],
  price: 0,
  duration: '',
  image: '',
}

export default function AdminServices() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const token = localStorage.getItem('adminToken') || ''

  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

useEffect(() => {
  if (!toast) return
  const timer = setTimeout(() => setToast(null), 3000)
  return () => clearTimeout(timer)
}, [toast])

  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })

  const services: Service[] = data?.data ?? []

  const { mutate: addService, isPending: isAdding } = useMutation({
    mutationFn: () => createService(form, token),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['services'] })
        setShowForm(false)
        setForm(emptyForm)
        setToast({ message: 'Service added successfully', type: 'success' })
        },
        onError: () => {
        setToast({ message: 'Failed to add service', type: 'error' })
    },
  })

  const { mutate: editService, isPending: isEditing } = useMutation({
    mutationFn: () => updateService(editingService!._id, form, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setEditingService(null)
      setShowForm(false)
      setForm(emptyForm)
      setToast({ message: 'Service updated successfully', type: 'success' })
    },
    onError: () => {
        setToast({ message: 'Failed to update service', type: 'error' })
    }
  })

  const { mutate: removeService } = useMutation({
    mutationFn: (id: string) => deactivateService(id, token),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['services'] })
        setConfirmId(null)
        setToast({ message: 'Service deactivated', type: 'success' })
        },
        onError: () => {
        setToast({ message: 'Failed to deactivate service', type: 'error' })
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }))
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setForm({
      name: service.name,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration || '',
      image: service.image,
    })
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingService) {
      editService()
    } else {
      addService()
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingService(null)
    setForm(emptyForm)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <main className="min-h-screen bg-spa-dark">

      {/* Admin Navbar */}
      <header className="bg-spa-surface border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Ryam Aesthetics"
              loading='lazy'
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-xs tracking-widest uppercase text-white">
                Ryam Aesthetics
              </p>
              <p className="font-sans text-xs text-white/40">
                Admin Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/appointments')}
              className="font-sans text-xs tracking-widest uppercase text-white/60 hover:text-gold transition-colors"
            >
              Appointments
            </button>
            <button
              onClick={handleLogout}
              className="font-sans text-xs tracking-widest uppercase text-white/60 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-white font-light">
              Services
            </h1>
            <p className="font-sans text-xs text-white/40 mt-1">
              {services.length} active services
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingService(null); setForm(emptyForm) }}
            className="bg-gold text-white font-sans text-xs tracking-widest uppercase px-6 py-2.5 rounded-pill hover:bg-gold-light transition-colors"
          >
            Add Service
          </button>
        </div>

        {/* Add/Edit Modal */}
        {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70"
            onClick={handleCancel}
            />

            {/* Modal */}
            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-spa-surface rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl text-white font-light">
                {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                onClick={handleCancel}
                className="text-white/40 hover:text-white transition-colors text-xl leading-none"
                >
                ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                    Service Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Basic Facial"
                    className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-white/20"
                />
                </div>

                <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                    Category
                </label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors"
                >
                    {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                </div>

                <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                    Price (₦)
                </label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min={0}
                    placeholder="e.g. 15000"
                    className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-white/20"
                />
                </div>

                <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                    Duration <span className="normal-case text-white/30">(optional)</span>
                </label>
                <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="e.g. 1 Hour"
                    className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-white/20"
                />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                    Image URL
                </label>
                <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    required
                    placeholder="https://res.cloudinary.com/..."
                    className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors placeholder:text-white/20"
                />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-sans text-xs tracking-widest uppercase text-white/50">
                    Description
                </label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Describe the service..."
                    className="font-sans text-sm text-white bg-spa-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold transition-colors resize-none placeholder:text-white/20"
                />
                </div>

                <div className="md:col-span-2 flex items-center gap-4">
                <button
                    type="submit"
                    disabled={isAdding || isEditing}
                    className="bg-gold text-white font-sans text-xs tracking-widest uppercase px-8 py-3 rounded-pill hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isAdding || isEditing ? 'Saving...' : editingService ? 'Update Service' : 'Add Service'}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="font-sans text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                </div>

            </form>
            </motion.div>
        </div>
        )}

        {/* Services list */}
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-spa-surface rounded-2xl p-6 animate-pulse h-20" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-sans text-sm text-white/40">
              No services yet. Add your first service.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-spa-surface rounded-2xl p-5 flex items-center gap-4"
              >
                {/* Image */}
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={optimizeImage(service.image, 100)}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-sans text-sm font-medium text-white">
                      {service.name}
                    </h3>
                    <span className="font-sans text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/40 mt-0.5  truncate">
                    ₦{service.price.toLocaleString()}
                    {service.duration && ` · ${service.duration}`}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(service)}
                    className="font-sans text-xs tracking-widest uppercase px-4 py-2 bg-white/5 text-white/60 rounded-pill hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmId(service._id)}
                    className="font-sans text-xs tracking-widest uppercase px-4 py-2 bg-red-500/10 text-red-400 rounded-pill hover:bg-red-500/20 transition-colors"
                  >
                    Deactivate
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
        {/* Toast Notification */}
        {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/70"
            onClick={() => setConfirmId(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative bg-spa-surface rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="font-serif text-lg text-white font-light mb-2">
              Are you sure?
            </h3>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
              This service will be hidden from the website. You can reactivate it from the database if needed.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => removeService(confirmId)}
                className="flex-1 bg-red-500/10 text-red-400 font-sans text-xs tracking-widest uppercase py-3 rounded-pill hover:bg-red-500/20 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 bg-white/5 text-white/60 font-sans text-xs tracking-widest uppercase py-3 rounded-pill hover:bg-white/10 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg border ${
            toast.type === 'success'
              ? 'bg-spa-surface border-green-500/20'
              : 'bg-spa-surface border-red-500/20'
          }`}>
            <span className={`text-sm ${toast.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {toast.type === 'success' ? '✓' : '✕'}
            </span>
            <p className="font-sans text-xs text-white whitespace-nowrap">
              {toast.message}
            </p>
          </div>
        </motion.div>
      )}
    </main>
  )
}