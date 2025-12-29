import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Student, CreateStudentDTO, UpdateStudentDTO } from '@/types'
import { studentService } from '@/services/studentService'

export const useStudentStore = defineStore('student', () => {
  const students = ref<Student[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchStudents() {
    loading.value = true
    error.value = null
    try {
      students.value = await studentService.getAll()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao carregar alunos'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createStudent(data: CreateStudentDTO) {
    loading.value = true
    error.value = null
    try {
      const newStudent = await studentService.create(data)
      students.value.push(newStudent)
      return newStudent
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao criar aluno'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateStudent(id: string, data: UpdateStudentDTO) {
    loading.value = true
    error.value = null
    try {
      const updatedStudent = await studentService.update(id, data)
      const index = students.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        students.value[index] = updatedStudent
      }
      return updatedStudent
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao atualizar aluno'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteStudent(id: string) {
    loading.value = true
    error.value = null
    try {
      await studentService.delete(id)
      students.value = students.value.filter((s) => s.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao excluir aluno'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    students,
    loading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  }
})
