import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthResponse } from '@/types'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(authService.getToken())
  const user = ref<AuthResponse['user'] | null>(null)
  const isAuthenticated = ref(authService.isAuthenticated())

  async function login(email: string, password: string) {
    const response = await authService.login({ email, password })
    token.value = response.token
    user.value = response.user
    isAuthenticated.value = true
    authService.setToken(response.token)
  }

  function logout() {
    token.value = null
    user.value = null
    isAuthenticated.value = false
    authService.removeToken()
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
})
