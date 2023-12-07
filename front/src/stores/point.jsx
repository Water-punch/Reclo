import { create } from 'zustand';

const usePointStore = create((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));

export default usePointStore;
