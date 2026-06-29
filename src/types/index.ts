export interface Service {
  _id: string
  name: string
  description: string
  category: 'Facials' | 'Waxing' | 'Brows' | 'Massage Therapy'
  price: number
  duration?: string
  image: string
  isActive: boolean
}

export interface Appointment {
  fullName: string
  email: string
  phone: string
  services: string[]
  date: string
  time: string
  specialRequests?: string
  numberOfPeople: number
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export interface AppointmentRecord {
  _id: string
  fullName: string
  email: string
  phone: string
  services: string[]
  date: string
  time: string
  numberOfPeople: number
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}