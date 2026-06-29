import axios from 'axios'
import type { Service, Appointment, ApiResponse } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

export const getServices = async (): Promise<ApiResponse<Service[]>> => {
  const response = await api.get('/services')
  return response.data
}

export const createAppointment = async (
  data: Appointment
): Promise<ApiResponse<null>> => {
  const response = await api.post('/appointments', data)
  return response.data
}

export const sendContact = async (data: {
  fullName: string
  email: string
  message: string
}): Promise<ApiResponse<null>> => {
  const response = await api.post('/contact', data)
  return response.data
}

// Auth
export const loginAdmin = async (data: {
  email: string
  password: string
}): Promise<{ success:boolean,token: string }> => {
  const response = await api.post('/auth/login', data)
  return response.data
}

// Appointments
export const getAppointments = async (token: string): Promise<ApiResponse<any[]>> => {
  const response = await api.get('/appointments', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const updateAppointmentStatus = async (
  id: string,
  status: 'confirmed' | 'cancelled',
  token: string
): Promise<ApiResponse<null>> => {
  const response = await api.patch(
    `/appointments/${id}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

// Services — admin
export const createService = async (
  data: Omit<Service, '_id' | 'isActive'>,
  token: string
): Promise<ApiResponse<Service>> => {
  const response = await api.post('/services', data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const updateService = async (
  id: string,
  data: Partial<Omit<Service, '_id' | 'isActive'>>,
  token: string
): Promise<ApiResponse<Service>> => {
  const response = await api.patch(`/services/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const deactivateService = async (
  id: string,
  token: string
): Promise<ApiResponse<null>> => {
  const response = await api.patch(`/services/${id}/deactivate`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}