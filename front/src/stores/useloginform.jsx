import { create } from "zustand";

const useLoginFormStore = create((set) => ({
  email: "",
  password: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  validateEmail: (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  },
}));

export default useLoginFormStore;
