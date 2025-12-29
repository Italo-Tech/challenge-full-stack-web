import api from './api'
import type { Course, CreateCourseDTO, UpdateCourseDTO } from '@/types'

export const courseService = {
  async getAll(): Promise<Course[]> {
    const response = await api.get('/courses')
    return response.data
  },

  async getById(id: string): Promise<Course> {
    const response = await api.get(`/courses/${id}`)
    return response.data
  },

  async create(data: CreateCourseDTO): Promise<Course> {
    const response = await api.post('/courses', data)
    return response.data
  },

  async update(id: string, data: UpdateCourseDTO): Promise<Course> {
    const response = await api.put(`/courses/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/courses/${id}`)
  },
}
