import React from 'react';
import useQuestionStore from '../../../front/src/stores/question';

import human_tree from '../../public/img/result/human_tree.jpg';
import bad_human from '../../public/img/result/bad_human.jpg';
import happy_tree from '../../public/img/result/happy_tree.jpg';

const TestResult = () => {
  const { userAnswers } = useQuestionStore();

  const a = (n) => {
    return Number(userAnswers[n]);
  };

  const b = (n) => {
    return userAnswers[n];
  };

  const buyScore =
    (a(0) * 12.26 + a(1) * 20.61 + a(2) * 48.44 + a(3) * 22.19 + a(4) * 13.3) * (1 - 0.01 * a(5)) +
    (a(0) * 12.26 + a(1) * 20.61 + a(2) * 48.44 + a(3) * 22.19 + a(4) * 13.3) * 0.01 * a(5) * 0.25;

  const washScore =
    a(6) *
      (() => {
        if (b(7) === '세탁-찬물') {
          return 0.1416;
        } else {
          return 0.197;
        }
      })() +
    a(8) * 0.244;

  const wayScore =
    a(9) *
    (() => {
      if (b(10) === '리폼') {
        return 0;
      } else if (b(10) === '헌옷수거함') {
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
    if (averageScore <= 100) {
      return (
        <div>
          지구를 사랑하시는 군요. 당신은 지구를 지키니는 <strong>지구 수호자</strong>입니다.
          <img src={happy_tree} />
        </div>
      );
    } else if (averageScore <= 120) {
      return (
        <div>
          오! 지구를 생각하는 당신. 당신은 <strong>지구 lover</strong>입니다.
          <img src={happy_tree} />
        </div>
      );
    } else if (averageScore <= 150) {
      return (
        <div>
          평범하군요. 조금 더 노력하면 지구를 위해 노력해봐요 <strong>인간</strong>.
          <img src={human_tree} />
        </div>
      );
    } else if (averageScore <= 180) {
      return (
        <div>
          음.... 당신은 지구를 아프게하는 <strong>나쁜 사람</strong>입니다.
          <img src={bad_human} />
        </div>
      );
    } else {
      return (
        <div>
          검사 결과 실화인가요....;; <br />
          당신은 지구를 파괴하고 있는 <strong>인간 쓰레기</strong> 그 자체이군요.
          <img src={bad_human} />
        </div>
      );
    }
  };

  return (
    <div className='result_page'>
      <h2>테스트 결과</h2>
      <div className='result_page_'>
        <p className='test_result'>{calculateResult()}</p>
        <div>
          <p>당신이 배출한 탄소량은 {averageScore}kgCO2eq/m2 입니다.</p>
          <p>{averageScore / 140}개의 소나무가 당신이 배출한 이산화탄소를 제거하는데 필요합니다.</p>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
