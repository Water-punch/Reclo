import React from 'react';
import useQuestionStore from '../../../front/src/stores/question';

const TestResult = () => {
  const { userAnswers } = useQuestionStore();

  const a = (n) => {
    return userAnswers[n];
  };

  const buyScore =
    (a(0) * 12.26 + a(1) * 20.61 + a(2) * 48.44 + a(3) * 22.19 + a(4) * 13.3) * (1 - 0.01 * a(5)) +
    (a(0) * 12.26 + a(1) * 20.61 + a(2) * 48.44 + a(3) * 22.19 + a(4) * 13.3) * 0.01 * a(5) * 0.25;

  const washScore =
    a(6) *
      (() => {
        if (a(7) === '세탁-찬물') {
          return 0.1416;
        } else {
          return 0.197;
        }
      })() +
    a(8) * 0.244;

  const wayScore =
    a(9) *
    (() => {
      if (a(10) === '리폼') {
        return 0;
      } else if (a(10) === '헌옷수거함') {
        return 2.146;
      } else {
        return -6.4;
      }
    })();
  console.log(wayScore);
  const averageScore = buyScore + washScore + wayScore;

  console.log(averageScore);

  const calculateResult = () => {
    // 등급 반환
    if (averageScore <= 30) {
      return (
        <div>
          지구를 사랑하시는 군요. 당신은 지구를 지키니는 <strong>지구 수호자</strong>입니다.
        </div>
      );
    } else if (averageScore <= 50) {
      return (
        <div>
          오! 지구를 생각하는 당신. 당신은 <strong>지구 lover</strong>입니다.
        </div>
      );
    } else if (averageScore <= 70) {
      return (
        <div>
          평범하군요. 조금 더 노력하면 지구를 위해 노력해봐요 <strong>인간</strong>.
        </div>
      );
    } else if (averageScore <= 90) {
      return (
        <div>
          음.... 당신은 지구를 아프게하는 <strong>나쁜 사람</strong>입니다.
        </div>
      );
    } else {
      return (
        <div>
          검사 결과 실화인가요....;; <br />
          당신은 지구를 파괴하고 있는 <strong>인간 쓰레기</strong> 그 자체이군요.
        </div>
      );
    }
  };

  return (
    <div>
      <h2>테스트 결과</h2>
      <p>{calculateResult()}</p>
    </div>
  );
};

export default TestResult;
