import React, { useEffect } from 'react';
import '../../../styles/MyPage.css';
import usePointStore from '../../../stores/point';
import * as Api from '../../../api/api';

const UserPoint = () => {
  const pointData = usePointStore((state) => state.userData);
  const setPointData = usePointStore((state) => state.setUserData);

  useEffect(() => {
    Api.get('user/current/point')
      .then((response) => response.json())
      .then((data) => setPointData(data))
      .catch((error) => console.error('Error', error));
  }, [setPointData]);

  return (
    <div className='pointbox'>
      <div className='pointItem'>
        <img src='/src/styles/point.png' alt='포인트 이미지' />
        <p>포인트</p>
        <p>{pointData.point}</p>
      </div>
      <div className='pointItem'>
        <img src='/src/styles/level.png' alt='레벨 이미지' />
        <p>레벨</p>
        <p></p>
      </div>
      <div className='pointItem'>
        <img src='/src/styles/check.png' alt='포인트 이미지' />
        <p>포인트조회</p>
        <p></p>
      </div>
    </div>
  );
};

export default UserPoint;
