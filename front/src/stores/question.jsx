import { create } from "zustand";

const QuestionStore = create((set) => ({
  questions: [
    {
      text: "얼마나 자주 옷을 사시나요?",
      type: "range",
      options: ["per week", "per month", "per year"],
    },
    {
      text: "일년에 얼마나 많은 옷들을 사시나요? (품목당 종류)",
      type: "multiple",
      options: ["상의", "하의", "외투", "스웨터", "드레스"],
    },
    {
      text: "구제 의류를 구매하는 비중이 얼마나 되시나요?",
      type: "multiple",
      options: ["10%", "50%", "100%"],
    },
    {
      text: "어디에서 주로 옷을 구매하시나요?",
      type: "multiple",
      options: ["온라인 쇼핑", "오프라인 쇼핑"],
    },
    {
      text: "구제 의류를 구매하는 비중이 얼마나 되나요?",
      type: "range",
      options: ["10%", "50%", "100%"],
    },
    {
      text: "한 달에 세탁을 몇 번 하나요?",
      type: "multiple",
      options: ["1~3회", "5~7회", "10회 이상"],
    },
    {
      text: "세탁 습관에 대해 알려주세요",
      type: "multiple",
      options: ["세탁-찬물", "세탁-온수", "건조-자연건조", "건조기"],
    },
    {
      text: "드라이 클리닝을 한 달에 몇 회 정도 하시나요?",
      type: "multiple",
      options: ["1~10회", "20~30회", "50회"],
    },
    {
      text: "연간 얼마나 많은 옷들을 수선하시나요?",
      type: "multiple",
      options: ["1~10회", "20~30회", "50회"],
    },
    {
      text: "안 입는 옷을 어떻게 처리하시나요?",
      type: "multiple",
      options: ["리폼", "헌옷수거함", "쓰레기", "판매 혹은 기부함"],
    },
  ],
  currentQuestionIndex: 0,
  userAnswers: [],
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  addUserAnswer: (answer) =>
    set((state) => ({ userAnswers: [...state.userAnswers, answer] })),
}));

export default QuestionStore;
