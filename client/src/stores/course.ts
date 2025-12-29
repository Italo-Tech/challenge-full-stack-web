import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Course, CreateCourseDTO, UpdateCourseDTO } from '@/types'
import { courseService } from '@/services/courseService'

export const useCourseStore = defineStore('course', () => {
  const courses = ref<Course[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCourses() {
    loading.value = true
    error.value = null
    try {
      courses.value = await courseService.getAll()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao carregar cursos'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createCourse(data: CreateCourseDTO) {
    loading.value = true
    error.value = null
    try {
      const newCourse = await courseService.create(data)
      courses.value.push(newCourse)
      return newCourse
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao criar curso'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateCourse(id: string, data: UpdateCourseDTO) {
    loading.value = true
    error.value = null
    try {
      const updatedCourse = await courseService.update(id, data)
      const index = courses.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        courses.value[index] = updatedCourse
      }
      return updatedCourse
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao atualizar curso'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteCourse(id: string) {
    loading.value = true
    error.value = null
    try {
      await courseService.delete(id)
      courses.value = courses.value.filter((c) => c.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao excluir curso'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  }
})
