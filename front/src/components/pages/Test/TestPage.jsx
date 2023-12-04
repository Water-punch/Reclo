import { useState } from "react";
import QuestionStore from "../../../stores/question";
import "./testpage/question.css";

const TestPage = () => {
  const {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
  } = QuestionStore();

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
  const answer = userAnswers[currentQuestionIndex];
  const saveAnswer = (answer) => {
    userAnswers[currentQuestionIndex] = answer;
  };

  // 답안 확인
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const getResultButton = () => {
    if (isLastQuestion) {
      return <button>결과 보기</button>;
    }
    return null;
  };

  return (
    <div className="testPage">
      <div className="question-container">
        <h1>{getCurrentQuestion().text}</h1>

        {/* question type이 range인 경우*/}
        {getCurrentQuestion().type === "range" &&
          currentQuestionIndex + 1 == 1 && (
            <>
              <input
                type="range"
                list="tickmarks"
                min={0}
                max={100}
                value={userAnswers[currentQuestionIndex]}
                onInput={(e) => saveAnswer(e.target.value)} // range 값 변경 시 저장
              />
              <span>{userAnswers[currentQuestionIndex]}</span>
            </>
          )}
        {getCurrentQuestion().type === "range" &&
          (currentQuestionIndex + 1 == 3) | (currentQuestionIndex + 1 == 5) && (
            <>
              <input
                type="range"
                min={0}
                max={100}
                value={userAnswers[currentQuestionIndex]}
                onChange={(e) => saveAnswer(e.target.value)} // range 값 변경 시 저장
              />
              <span>{userAnswers[currentQuestionIndex]}</span>
            </>
          )}

        {/* question type이 multiple인 경우 */}
        {getCurrentQuestion().type === "multiple" && (
          <div>
            {getCurrentQuestion().options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={currentQuestionIndex + 1 + "번 질문"}
                  value={option}
                  onInput={() => saveAnswer(option)}
                  // checked={userAnswers[currentQuestionIndex] === option} // 현재 선택된 옵션인지 확인
                />
                {option}
              </label>
            ))}
          </div>
        )}
        {getResultButton()}
      </div>
      <div className="test_nav">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          이전
        </button>
        <span>
          현재 질문: {currentQuestionIndex + 1} /{questions.length}
        </span>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default TestPage;
