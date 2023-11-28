import { create } from 'zustand'

//관리할 상태: 메세지 내용, 확인여부, 시간
const useChatStore = create((set) => ({
  // 1:1 채팅 or 쪽지 or 비밀댓글 결정해야 함.
}))

export default useChatStore