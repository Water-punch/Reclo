import { create } from 'zustand'

//관리할 상태: 전역상태만 ^^, 그럼 없음.

export const createItemsSlice = (set) => ({
  // title: '',
  // setTitle: (input) => set({ title: input }),

  // name: '',
  // setName: (input) => set({ name: input }),

  // price: 0,
  // setPrice: (input) => set({ price: input }),

  // content: '',
  // setContent: (input) => set({ content: input }),

  items: {
    itemId: 1,
    name: '장인의 검',
    title: '좋은 물건 팝니다',
    price: 1000,
    content: '좋아요. 사세요.',
    like: 100,
    share: false,
    categorySave: [],
    tag: ['#'],
    tradeState: '거래가능',
  },

  categorySave: [],
  setCategory: (select) => 
    set((prev) => ({ categorySave: [...prev.categorySave, select ] })),
  categoryReset: (reset) => set({ categorySave : [] }),

  // liked: 0,
  // setLiked: (state) => set({ liked: state.liked +1 }),

  tradeState: '',
  setTradeState: (e) => set({ trateState : e.target.value }),
  tradeReset: (reset) => set({ tradeState : '' })

  // share: false,
  // setShare: (state) => set({ share: !state.share }),

  // tag: [],
  // setTag: (input) => set((prev) => ({ tag: [...prev.tag, input ] })),

  // time: '',
  // setTime: (input) => set({ time: input})
})

