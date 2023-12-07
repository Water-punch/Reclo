// UserPoint.jsx

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

  const handlePointPageNavigation = () => {
    navigate('/point');
  };

  return (
    <div className='pointbox'>
      <>
        <div className='pointItem'>
          <img src='/public/img/point.png' alt='포인트 이미지' />
          <p>포인트</p>
        </div>
        <div className='pointItem'>
          <img src='/public/img/level.png' alt='레벨 이미지' />
          <p>레벨</p>
        </div>
        <div className='pointItem'>
          <img src='/public/img/check.png' alt='포인트 조회 이미지' />
          <p onClick={handlePointPageNavigation}>포인트 조회</p>
        </div>
      </>
    </div>
  );
};

export default UserPoint;
