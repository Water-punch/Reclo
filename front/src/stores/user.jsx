import { create } from 'zustand'

//관리할 상태: 전역상태만! 
export const createUserSlice = (set) => ({
  login: false,
  setLogin: (state) => set({ login: !state.login }),
  setLogout: (state) => set({ logout: !state.logout }),

  userId: 0,
  setUserId: (id) => set({ userId: id})

})
