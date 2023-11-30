import { create } from 'zustand'

//관리할 상태: 전역상태만 ^^, 그럼 없음.

export const createItemsSlice = (set) => ({
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
  setCategorySave: (select) => 
    set((prev) => ({ categorySave: [...prev.categorySave, select ] })),
  categoryReset: () => set({ categorySave : [] }),

  tradeState: '',
  setTradeState: (e) => set({ trateState : e.target.value }),
  tradeReset: () => set({ tradeState : '' })
})

