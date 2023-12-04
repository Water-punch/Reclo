import React, { useEffect } from 'react';
import '../../../styles/MyPage.css';
import usePointStore from '../../../stores/point';
import * as Api from '../../../api/api';

const UserPoint = () => {
  const setPointData = usePointStore((state) => state.setUserData);
  const pointData = usePointStore((state) => state.userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get('user/current/point');
        const data = response?.data?.data || response?.data || {};

        console.log('API Response:', response);
        console.log('Fetched Data:', data);

        setPointData(data);
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, [setPointData]);

  return (
    <div className='pointbox'>
      {pointData && pointData.points && pointData.points.length > 0 ? (
        <>
          <div className='pointItem'>
            <img src='/public/img/point.png' alt='포인트 이미지' />
            <p>포인트</p>
            <p>{pointData.points[0]?.point}</p>
          </div>
          <div className='pointItem'>
            <img src='/public/img/level.png' alt='레벨 이미지' />
            <p>레벨</p>
            <p>{pointData.points[0]?.rank}</p>
          </div>
          <div className='pointItem'>
            <img src='/public/img/check.png' alt='포인트 조회 이미지' />
            <p>포인트 조회</p>
          </div>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default UserPoint;
