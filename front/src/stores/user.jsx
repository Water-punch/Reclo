import { create } from 'zustand'

//관리할 상태: 전역상태만! 
const useUserStore = create((set) => ({
  login: false,
  setLogin: (state) => set({ login : state }), 

  user: {},
  setUser: (data) => set({ user: data })
}))

export default useUserStore

