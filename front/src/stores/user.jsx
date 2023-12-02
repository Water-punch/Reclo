import { create } from 'zustand'

//관리할 상태: 전역상태만! 
const useUserStore = create((set) => ({
  login: false,
  setLogin: () => set({ login: true }), 
  setLogout: () => set({ login: false }),

  user: {},
  setUser: (data) => set({ user: data }),
  resetUser: () => set({ user: {} })
}))

export default useUserStore

