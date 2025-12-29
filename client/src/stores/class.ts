import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Class, CreateClassDTO, UpdateClassDTO } from '@/types'
import { classService } from '@/services/classService'

export const useClassStore = defineStore('class', () => {
  const classes = ref<Class[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchClasses() {
    loading.value = true
    error.value = null
    try {
      classes.value = await classService.getAll()
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao carregar turmas'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createClass(data: CreateClassDTO) {
    loading.value = true
    error.value = null
    try {
      const newClass = await classService.create(data)
      classes.value.push(newClass)
      return newClass
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao criar turma'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateClass(id: string, data: UpdateClassDTO) {
    loading.value = true
    error.value = null
    try {
      const updatedClass = await classService.update(id, data)
      const index = classes.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        classes.value[index] = updatedClass
      }
      return updatedClass
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao atualizar turma'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteClass(id: string) {
    loading.value = true
    error.value = null
    try {
      await classService.delete(id)
      classes.value = classes.value.filter((c) => c.id !== id)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao excluir turma'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    classes,
    loading,
    error,
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
  }
})
