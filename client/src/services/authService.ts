import api from './api'
import type { LoginDTO, AuthResponse } from '@/types'

export const authService = {
  async login(data: LoginDTO): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  setToken(token: string): void {
    localStorage.setItem('token', token)
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  removeToken(): void {
    localStorage.removeItem('token')
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}
