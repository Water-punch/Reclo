import { create } from 'zustand';

const usePointStore = create((set) => ({
  userData: {},
  setUserData: (data) => set({ userData: data }),
}));

export default usePointStore;
