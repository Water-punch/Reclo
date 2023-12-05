import { create } from 'zustand';

const QuestionStore = create((set) => ({
  questions: [
    {
      text: '1. 일년에 몇개의 상의를 사시나요? (품목당 종류)',
      type: 'range',
      options: ['갯수'],
    },
    {
      text: '2. 일년에 몇개의 하의를 사시나요? (품목당 종류)',
      type: 'range',
      options: ['갯수'],
    },
    {
      text: '3. 일년에 몇개의 외투를 사시나요? (품목당 종류)',
      type: 'range',
      options: ['갯수'],
    },
    {
      text: '4. 일년에 몇개의 스웨터를 사시나요? (품목당 종류)',
      type: 'range',
      options: ['갯수'],
    },
    {
      text: '5. 일년에 몇개의 드레스를 사시나요? (품목당 종류)',
      type: 'range',
      options: ['갯수'],
    },
    {
      text: '6. 구제 의류를 구매하는 비중이 얼마나 되시나요?',
      type: 'range',
      options: ['%'],
    },
    {
      text: '7. 한 달에 세탁을 몇 번 하나요?',
      type: 'range',
      options: ['횟수'],
    },
    {
      text: '8. 세탁 습관에 대해 알려주세요',
      type: 'multiple',
      options: ['세탁-찬물', '세탁-온수'],
    },
    {
      text: '9. 드라이 클리닝을 한 달에 몇 회 정도 하시나요?',
      type: 'range',
      options: ['횟수'],
    },
    {
      text: '10. 일년에 몇개의 옷을 버리시나요?',
      type: 'range',
      options: ['갯수'],
    },
    {
      text: '11. 안 입는 옷을 어떻게 처리하시나요?',
      type: 'multiple',
      options: ['리폼', '헌옷수거함', '판매 혹은 기부함'],
    },
  ],
  currentQuestionIndex: 0,
  userAnswers: [0, 0, 0, 0, 0, 0, 0, null, null, 0, null],
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
}));

export default QuestionStore;
