import React, { useEffect } from 'react';
import '../../../styles/MyPage.css';
import usePointStore from '../../../stores/point';
import * as Api from '../../../api/api';
import { useNavigate } from 'react-router-dom';

const UserPoint = () => {
  const setPointData = usePointStore((state) => state.setUserData);
  const pointData = usePointStore((state) => state.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get('user/current/point');
        const data = response?.data?.data || response?.data || {};

        console.log('API Response:', response);
        console.log('Fetched Data:', data);

        setPointData(data);
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchData();
  }, [setPointData]);

  const handlePointClick = () => {
    if (pointData && pointData.points && pointData.points.length > 0) {
      const currentPoint = pointData.points[0]?.point;
      alert(`당신의 현재 포인트는 ${currentPoint}입니다.`);
    }
  };

  const handleLevelClick = () => {
    if (pointData && pointData.points && pointData.points.length > 0) {
      const currentLevel = pointData.points[0]?.rank;
      const rankName = getRankName(currentLevel);
      alert(`당신의 현재 등급은 ${rankName}입니다.`);
    }
  };

  const getRankName = (level) => {
    switch (level) {
      case 0:
        return '브론즈';
      case 1:
        return '실버';
      case 2:
        return '골드';
      case 3:
        return '플레티넘';
      case 4:
        return '다이아몬드';
      case 5:
        return '마스터';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className='pointbox'>
      <>
        <div className='pointItem' onClick={handlePointClick}>
          <img src='/public/img/point.png' alt='포인트 이미지' />
          <p>포인트</p>
        </div>
        <div className='pointItem' onClick={handleLevelClick}>
          <img src='/public/img/level.png' alt='레벨 이미지' />
          <p>레벨</p>
        </div>
        <div className='pointItem'>
          <img src='/public/img/check.png' onClick={() => navigate('/point')} alt='포인트 조회 이미지' />
          <p>포인트 조회</p>
        </div>
      </>
    </div>
  );
};

export default UserPoint;
