import { create } from "zustand";

//관리할 상태: 로그인, 포인트, 유저등급, 관심상품, 별명 ...
const useUserStore = create((set) => ({
  login: false,
  setLogin: () => set({ login: !login }),
  nickName: "",
  setNickName: (input) => set({ nickName: input }),
  rank: 0,
  //setLevel:
  point: 0,
  //setPoint:
  birthDate: "",
  //setBirthdate:
  wishList: [],
  //setLiked:
}));

export default useUserStore;
