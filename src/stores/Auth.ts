import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthServiceInstance } from '@/services/AuthService'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref('')

    const isAuthenticated = computed(() => !!token.value)

    const signup = async (phone: string, email: string, password: string): Promise<boolean> => {
      try {
        const response = await AuthServiceInstance.Signup(phone, email, password)
        if (response.data) {
          token.value = response.data
          return true
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        console.error(error)
        return false
      }
    }

    const login = async (email: string, password: string): Promise<boolean> => {
      try {
        const response = await AuthServiceInstance.Login(email, password)
        if (response.data) {
          token.value = response.data
          return true
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        console.error(error)
        return false
      }
    }

    const logout = () => {
      token.value = ''
    }

    const validateToken = async (): Promise<boolean> => {
      try {
        const response = await AuthServiceInstance.ValidateToken(token.value)
        if (response.data) {
          return true
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        console.error(error)
        return false
      }
    }
    return {
      token,
      isAuthenticated,
      signup,
      login,
      logout,
      validateToken
    }
  },
  {
    persist: true
  }
)
