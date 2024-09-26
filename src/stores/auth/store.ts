import { create } from 'zustand'
import api from '../../apis/interceptor'

type AuthState = {
  isLoggedIn: boolean
  accessToken: string | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, passowrd: string, name: string) => Promise<boolean>
  logout: () => void
}

type SignInResponse = {
  message: string
  data: {
    email: string
    name: string
    avatar: string
  }
  accessToken: string
  status: number
}

type SignUpResponse = {
  message: string
  data: {
    email: string
    name: string
    avatar: string
    role: string
  }
  status: number
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  signIn: async (email, password) => {
    try {
      const response = await api.post<SignInResponse>('/users/signin', {
        email,
        password,
      })
      if (response.status === 200) {
        set({ isLoggedIn: true })
        return true // 로그인 성공 시 true 반환
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
      }
    }
    return false // 로그인 실패 시 false 반환
  },
  signUp: async (name, email, password) => {
    try {
      const response = await api.post<SignUpResponse>('/users/signup', {
        name,
        email,
        password,
      })
      if (response.status === 201) {
        return true
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
      }
    }
    return false
  },
  logout: () => set({ isLoggedIn: false }),
}))
