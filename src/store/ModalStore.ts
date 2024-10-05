import { create } from 'zustand'

// Zustand 스토어 생성
export const useModalStore = create((set) => ({
  isSearchModalOpen: false,
  setIsSearchModalOpen: (isOpen) => set({ isSearchModalOpen: isOpen }),
}))
