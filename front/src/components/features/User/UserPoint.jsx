import React, { useEffect } from 'react';
import '../../../styles/MyPage.css';
import usePointStore from '../../../stores/point';

const UserPoint = () => {
  const pointData = usePointStore((state) => state.pointData);
  const setPointData = usePointStore((state) => state.setPointData);

  useEffect(() => {
    fetch('/api/point')
      .then((response) => response.json())
      .then((data) => setPointData(data))
      .catch((error) => console.error('Error', error));
  }, [setPointData]);

  return (
    <div className='pointbox'>
      <div className='pointItem'>
        <img src='/src/styles/point.png' alt='포인트 이미지' />
        <p>포인트</p>
      </div>
      <div className='pointItem'>
        <img src='/src/styles/level.png' alt='레벨 이미지' />
        <p>레벨</p>
      </div>
      <div className='pointItem'>
        <img src='/src/styles/check.png' alt='포인트 이미지' />
        <p>포인트조회</p>
      </div>
    </div>
  );
};

export default UserPoint;
