import { create } from 'zustand';

const useLikeStore = create((set) => ({
  likeLists: [],
  totalLikes: 0,
  storeToLike: (likeLists) => set({ likeLists }),
  addToLike: (newLike) => {
    set((state) => {
      const exitedLike = state.likeLists.find((item) => item.item_id === newLike.item_id);

      if (exitedLike) {
        console.log('이미 찜목록에 해당 아이템 존재함');
        return state;
      } else {
        const updatedLikeLists = [...state.likeLists, newLike];
        console.log(newLike);
        return { likeLists: updatedLikeLists, totalLikes: updatedLikeLists.length };
      }
    });
  },
  removeFromLike: (removedItemId) => {
    set((state) => {
      const updatedLikeLists = state.likeLists.filter((like) => like.item_id !== removedItemId);
      return { likeLists: updatedLikeLists, totalLikes: updatedLikeLists.length };
    });
  },
}));

export default useLikeStore;
