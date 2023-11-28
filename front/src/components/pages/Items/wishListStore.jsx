import { create } from "zustand";

const useWishListStore = create((set) => ({
  wishList: [],
  setWishList: (newWishList) => set({ wishList: newWishList }),
}));

export default useWishListStore;
