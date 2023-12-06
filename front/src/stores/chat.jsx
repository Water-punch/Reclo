import { create } from 'zustand'

//관리할 상태: 메세지 내용, 확인여부, 시간
const useChatStore = create((set) => ({
  myRooms: [],
  addRoom: (newRoom) => {
    return set((prev) => ({ myRooms: [...prev, newRoom]}))}
}))

export default useChatStore