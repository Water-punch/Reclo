import { create } from 'zustand'

//관리할 상태: 상품명, 제목, 가격, 상세정보, 분류코드, 관심수,  댓글(?) ...
// 검색되는 대상: name or title(택1)
// 필터링 대상: category, tag, price

export const createItemsSlice = (set) => ({
  title: '',
  setTitle: (input) => set({ title: input }),

  name: '',
  setName: (input) => set({ name: input }),

  price: 0,
  setPrice: (input) => set({ price: input }),

  content: '',
  setContent: (input) => set({ content: input }),

  category: [],
  setCategory: (select) => 
    set((prev) => ({ category: [...prev.category, select ] })),

  liked: 0,
  setLiked: (state) => set({ liked: state.liked +1 }),

  available: true,
  setAvailable: (state) => set({ available: !state.available }),

  share: false,
  setShare: (state) => set({ share: !state.share }),

  tag: [],
  setTag: (input) => set((prev) => ({ tag: [...prev.tag, input ] })),

})


