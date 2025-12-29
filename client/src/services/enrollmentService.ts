import api from './api'
import type { Enrollment, CreateEnrollmentDTO, UpdateEnrollmentDTO } from '@/types'

export const enrollmentService = {
  async getAll(): Promise<Enrollment[]> {
    const response = await api.get('/enrollments')
    return response.data
  },

  async getById(id: string): Promise<Enrollment> {
    const response = await api.get(`/enrollments/${id}`)
    return response.data
  },

  async create(data: CreateEnrollmentDTO): Promise<Enrollment> {
    const response = await api.post('/enrollments', data)
    return response.data
  },

  async cancel(id: string): Promise<Enrollment> {
    const response = await api.patch(`/enrollments/${id}/cancel`)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/enrollments/${id}`)
  },
}
