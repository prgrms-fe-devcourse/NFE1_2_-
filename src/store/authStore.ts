import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  login: () => {
    set({ isLoggedIn: true })
    localStorage.setItem('isLoggedIn', 'true')
  },

  logout: () => {
    set({ isLoggedIn: false })
    localStorage.removeItem('isLoggedIn')
  },
}))
