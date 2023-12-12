import { create } from 'zustand'

const useItemsStore = create((set) => ({
  filter: '',
  setFilter: (condition) => set({ filter: condition })
}))

export default useItemsStore
