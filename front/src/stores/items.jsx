import { create } from 'zustand'

//관리할 상태: 상품명, 제목, 가격, 상세정보, 분류코드, 관심수,  댓글(?) ...
const useItemsStore = create((set) => ({
  title: '',
  setTitle: (input) => set({ title: input }),

  name: '',
  setName: (input) => set({ name: input }),

  price: 0,
  setPrice: (input) => set({ price: input }),

  description: '',
  setTitle: (input) => set({ description: input }),

  category: [],
  setCategory: (select) => 
    set((prev) => ({ category: [...prev.category, select ] })),

  liked: 0,
  setLiked: (state) => set({ liked: state.liked +1 }),

  available: true,
  set: () => set({ available: !available }),

  tag: '',
  setTag: () => set({}),

}))

export default useItemsStore