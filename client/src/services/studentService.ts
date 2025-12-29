import api from './api'
import type { Student, CreateStudentDTO, UpdateStudentDTO } from '@/types'

export const studentService = {
  async getAll(): Promise<Student[]> {
    const response = await api.get('/students')
    return response.data
  },

  async getById(id: string): Promise<Student> {
    const response = await api.get(`/students/${id}`)
    return response.data
  },

  async create(data: CreateStudentDTO): Promise<Student> {
    const response = await api.post('/students', data)
    return response.data
  },

  async update(id: string, data: UpdateStudentDTO): Promise<Student> {
    const response = await api.put(`/students/${id}`, data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/students/${id}`)
  },
}
