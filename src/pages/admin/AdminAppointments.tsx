import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAppointments, updateAppointmentStatus } from '../../services/api'
import type { AppointmentRecord } from '../../types'

const STATUS_COLORS = {
  pending: 'bg-yellow-500/10 text-yellow-600',
  confirmed: 'bg-green-500/10 text-green-600',
  cancelled: 'bg-red-500/10 text-red-600',
}

export default function AdminAppointments() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const token = localStorage.getItem('adminToken') || ''
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')

  const { data, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => getAppointments(token),
  })

  const appointments: AppointmentRecord[] = data?.data ?? []

  const filtered = filter === 'all'
    ? appointments
    : appointments.filter(a => a.status === filter)

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'confirmed' | 'cancelled' }) =>
      updateAppointmentStatus(id, status, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
    },
  })

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-xs tracking-widest uppercase text-white">
                Ryam.Aesthetics
              </p>
              <p className="font-sans text-xs text-white/40">
                Admin Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/services')}
              className="font-sans text-xs tracking-widest uppercase text-white/60 hover:text-gold transition-colors"
            >
              Services
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-white font-light">
              Appointments
            </h1>
            <p className="font-sans text-xs text-white/40 mt-1">
              {appointments.length} total appointments
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`flex-shrink-0 font-sans text-xs tracking-widest uppercase px-4 py-2 rounded-pill transition-all duration-300 ${
                  filter === status
                    ? 'bg-gold text-white'
                    : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments list */}
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-spa-surface rounded-2xl p-6 animate-pulse h-24" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-sans text-sm text-white/40">
              No {filter === 'all' ? '' : filter} appointments found.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((appointment, index) => (
              <motion.div
                key={appointment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-spa-surface rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Left — Customer info */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-sans text-sm font-medium text-white">
                        {appointment.fullName}
                      </h3>
                      <span className={`font-sans text-xs px-2.5 py-0.5 rounded-full ${STATUS_COLORS[appointment.status]}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-white/50">
                      {appointment.email} · {appointment.phone}
                    </p>
                    <p className="font-sans text-xs text-white/50">
                      {appointment.numberOfPeople} {appointment.numberOfPeople === 1 ? 'person' : 'people'}
                    </p>
                  </div>

                  {/* Center — Appointment details */}
                  <div className="flex flex-col gap-1">
                    <p className="font-sans text-sm text-white">
                      {appointment.services.join(', ')}
                    </p>
                    <p className="font-sans text-xs text-white/50">
                      {formatDate(appointment.date)} · {appointment.time}
                    </p>
                    {appointment.specialRequests && (
                      <p className="font-sans text-xs text-white/40 italic">
                        "{appointment.specialRequests}"
                      </p>
                    )}
                  </div>

                  {/* Right — Actions */}
                  {appointment.status === 'pending' && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateStatus({ id: appointment._id, status: 'confirmed' })}
                        className="font-sans text-xs tracking-widest uppercase px-4 py-2 bg-green-500/10 text-green-500 rounded-pill hover:bg-green-500/20 transition-colors">
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus({ id: appointment._id, status: 'cancelled' })}
                        className="font-sans text-xs tracking-widest uppercase px-4 py-2 bg-red-500/10 text-red-400 rounded-pill hover:bg-red-500/20 transition-colors" >
                        Cancel
                      </button>
                    </div>
                  )}

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}