import api from './api'
import type { Class, CreateClassDTO, UpdateClassDTO } from '@/types'

export const classService = {
  async getAll(): Promise<Class[]> {
    const response = await api.get('/classes')
    return response.data
  },

  async getById(id: string): Promise<Class> {
    const response = await api.get(`/classes/${id}`)
    return response.data
  },

  async create(data: CreateClassDTO): Promise<Class> {
    const response = await api.post('/classes', data)
    return response.data
  },

  async update(id: string, data: UpdateClassDTO): Promise<Class> {
    const response = await api.put(`/classes/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/classes/${id}`)
  },
}
