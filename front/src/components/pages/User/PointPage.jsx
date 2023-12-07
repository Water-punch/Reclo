import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/MyPage.css';
import usePointStore from '../../../stores/point';
import * as Api from '../../../api/api'; // API 함수 임포트

const PointPage = () => {
  const navigate = useNavigate();
  const setPointData = usePointStore((state) => state.setUserData);
  const pointData = usePointStore((state) => state.userData) || { points: [] };

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

  return (
    <div className='pointPageContainer'>
      <h1>포인트 이력페이지</h1>
      {pointData.points.length > 0 ? (
        <>
          <div className='pointItem'>
            <p>포인트</p>
            <p>{pointData.points[0]?.point}</p>
          </div>
          <div className='pointItem'>
            <p>레벨</p>
            <p>{pointData.points[0]?.rank}</p>
          </div>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default PointPage;
