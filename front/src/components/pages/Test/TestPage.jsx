import React from "react";
import { useNavigate } from "react-router-dom";
import useQuestionStore from "../../../stores/question";
import QuestionInput from "../../features/Test/QuestionInput";
import TestResult from "../../../stores/testresult";
import "../../../styles/test.css";

const TestPage = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    setCurrentQuestionIndex,
    addUserAnswer,
  } = useQuestionStore();

  const navigate = useNavigate();

  const handleAnswerSubmit = (answer) => {
    addUserAnswer(answer);

    if (currentQuestionIndex === questions.length - 1) {
      navigate("/test/result");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (currentQuestionIndex === questions.length) {
    return <TestResult />;
  }

  return (
    <div className="testPageContainer">
      <div className="questionBox">
        <QuestionInput
          question={questions[currentQuestionIndex]}
          onSubmit={handleAnswerSubmit}
        />
      </div>
    </div>
  );
};

export default TestPage;
