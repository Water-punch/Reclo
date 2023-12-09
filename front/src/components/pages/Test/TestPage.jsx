import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import QuestionStore from '../../../stores/question';
import '../../../styles/test/question.css';

const TestPage = () => {
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, userAnswers } = QuestionStore();

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    console.log(userAnswers);
  };

  const handlePrev = () => {
    // 이전 질문으로 이동
    const prevIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
    console.log(userAnswers);
  };

  const getCurrentQuestion = () => {
    // 현재 질문 정보 가져오기
    return questions[currentQuestionIndex];
  };

  // 정답 작성 및 저장
  const num_answer = userAnswers[currentQuestionIndex];
  const [answer, setAnswer] = useState(num_answer);

  // saveAnswer 함수 수정
  const saveAnswer = (e) => {
    // 현재 질문에 대한 사용자의 답변을 업데이트
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = e.target.value;

    // userAnswers 상태 업데이트
    QuestionStore.setState({ userAnswers: updatedUserAnswers });

    // answer 상태 업데이트
    setAnswer(e.target.value);
  };

  const checkNull = (x) => {
    if (!Array.isArray(x)) {
      // x가 배열이 아닌 경우
      return false;
    }
    return !x.some((item) => item === null);
  };

  const getResultButton = () => {
    if (checkNull(userAnswers)) {
      return (
        <button
          className='result'
          onClick={() => {
            navigate('/test/result');
          }}
        >
          결과 보기
        </button>
      );
    }
    return null;
  };

  return (
    <div className='testPage'>
      <div className='question-container'>
        <h1>{getCurrentQuestion().text}</h1>
        {getCurrentQuestion().type === 'range' &&
          (currentQuestionIndex + 1 == 1) |
            (currentQuestionIndex + 1 == 2) |
            (currentQuestionIndex + 1 == 3) |
            (currentQuestionIndex + 1 == 4) |
            (currentQuestionIndex + 1 == 5) |
            (currentQuestionIndex + 1 == 10) && (
            <div className='rangeQ'>
              <input type='range' min={0} max={15} step={0.5} value={num_answer} onInput={(e) => saveAnswer(e)} />
              <span>{num_answer}개</span>
            </div>
          )}

        {getCurrentQuestion().type === 'range' && currentQuestionIndex + 1 == 6 && (
          <div className='rangeQ'>
            <input type='range' min={0} max={100} step={5} value={num_answer} onInput={(e) => saveAnswer(e)} />
            <span>{num_answer}%</span>
          </div>
        )}

        {getCurrentQuestion().type === 'range' && (currentQuestionIndex + 1 == 7) | (currentQuestionIndex + 1 == 9) && (
          <div className='rangeQ'>
            <input type='range' min={0} max={15} step={1} value={num_answer} onInput={(e) => saveAnswer(e)} />
            <span>{num_answer}회</span>
          </div>
        )}

        {/* question type이 multiple인 경우 */}
        {getCurrentQuestion().type === 'multiple' && (
          <div className='multiQ'>
            {getCurrentQuestion().options.map((option, index) => (
              <label key={index}>
                <input type='radio' name={currentQuestionIndex} value={option} onInput={(e) => saveAnswer(e)} />
                {option}
              </label>
            ))}
          </div>
        )}
        {getResultButton()}
      </div>
      <div className='test_nav'>
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          이전
        </button>
        <span>
          현재 질문: {currentQuestionIndex + 1} /{questions.length}
        </span>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          다음
        </button>
      </div>
    </div>
  );
};

export default TestPage;
