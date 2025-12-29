import { defineStore } from 'pinia'
import { ref } from 'vue'
import { enrollmentService } from '@/services/enrollmentService'
import type { Enrollment, CreateEnrollmentDTO } from '@/types'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const enrollments = ref<Enrollment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchEnrollments() {
    loading.value = true
    error.value = null
    try {
      enrollments.value = await enrollmentService.getAll()
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar matrículas'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createEnrollment(data: CreateEnrollmentDTO) {
    loading.value = true
    error.value = null
    try {
      const newEnrollment = await enrollmentService.create(data)
      enrollments.value.push(newEnrollment)
      return newEnrollment
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar matrícula'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function cancelEnrollment(id: string) {
    loading.value = true
    error.value = null
    try {
      const updatedEnrollment = await enrollmentService.cancel(id)
      const index = enrollments.value.findIndex((e) => e.id === id)
      if (index !== -1) {
        enrollments.value[index] = updatedEnrollment
      }
      return updatedEnrollment
    } catch (err: any) {
      error.value = err.message || 'Erro ao cancelar matrícula'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteEnrollment(id: string) {
    loading.value = true
    error.value = null
    try {
      await enrollmentService.delete(id)
      enrollments.value = enrollments.value.filter((e) => e.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Erro ao excluir matrícula'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    enrollments,
    loading,
    error,
    fetchEnrollments,
    createEnrollment,
    cancelEnrollment,
    deleteEnrollment,
  }
})
