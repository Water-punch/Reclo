import { create } from 'zustand';

const usePointStore = create((set) => ({
  usetData: {},
  setUserData: (data) => set({ userData: data }),
}));

export default usePointStore;
