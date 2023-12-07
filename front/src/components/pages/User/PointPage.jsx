import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/MyPage.css';
import usePointStore from '../../../stores/point';
import * as Api from '../../../api/api';

const CenteredContainer = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      border: '0.5px solid gray',
      maxWidth: '800px', // 변경된 부분
      margin: '30px auto 0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    {children}
  </div>
);

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
    <CenteredContainer>
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
              <p>{getRankName(pointData.points[0]?.rank)}</p>
            </div>
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </CenteredContainer>
  );
};

export default PointPage;
