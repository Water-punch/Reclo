import React from "react";
import useQuestionStore from "../../../front/src/stores/question";

const TestResult = () => {
  const { questions, userAnswers } = useQuestionStore();

  const calculateResult = () => {
    const scores = userAnswers.map((answer, index) => {
      if (
        questions[index] &&
        questions[index].type &&
        questions[index].type === "range"
      ) {
        // range
        switch (answer) {
          case "per month":
            return 10;
          case "per week":
            return 5;
          case "per year":
            return 1;

          default:
            return 0;
        }
      } else if (
        questions[index] &&
        questions[index].type &&
        questions[index].type === "multiple"
      ) {
        // multiple
        switch (answer) {
          case "상의":
            return 10;
          case "하의":
            return 10;
          case "외투":
            return 5;
          case "스웨터":
            return 5;
          case "드레스":
            return 3;
          default:
            return 0;
          case "10%":
            return 1;
          case "50%":
            return 5;
          case "100%":
            return 10;
          case "온라인 쇼핑":
            return 7;
          case "오프라인 쇼핑":
            return 10;
          case "1~3회":
            return 3;
          case "5~7회":
            return 7;
          case "10회 이상":
            return 10;
          case "세탁-찬물":
            return 7;
          case "세탁-온수":
            return 5;
          case "건조-자연건조":
            return 10;
          case "건조기":
            return 5;
          case "1~10회":
            return 3;
          case "20~30회":
            return 5;
          case "50회":
            return 10;
          case "리폼":
            return 10;
          case "헌옷수거함":
            return 10;
          case "쓰레기":
            return 3;
          case "판매 혹은 기부함":
            return 10;
        }
      }
      return 0;
    });

    const totalScore = scores.reduce((acc, score) => acc + score, 0);
    const averageScore = totalScore / questions.length;

    // 등급 반환
    if (averageScore >= 8) {
      return "환경 수호자";
    } else if (averageScore >= 6) {
      return "환경 수비대";
    } else if (averageScore >= 4) {
      return "환경 지킴이";
    } else if (averageScore >= 2) {
      return "환경 방관자";
    } else {
      return "환경 파괴자";
    }
  };

  return (
    <div>
      <h2>Test Result</h2>
      {/* <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <strong>{question.text}</strong>: {userAnswers[index]}
          </li>
        ))}
      </ul> */}
      <p>{calculateResult()}</p>
    </div>
  );
};

export default TestResult;
