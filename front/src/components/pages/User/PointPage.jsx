import React, { useEffect } from 'react';
import usePointStore from '../../../stores/point';
import * as Api from '../../../api/api';
import '../../../styles/MyPage.css';

const PointPage = () => {
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
    <div>
      <h2>포인트 이력페이지</h2>
      {pointData && pointData.points && pointData.points.length > 0 ? (
        <>
          {pointData.points.map((pointItem, index) => (
            <div key={index} className='pointItem'>
              <p>포인트: {pointItem.point}</p>
            </div>
          ))}
          {/* 레벨은 배열의 첫 번째 요소에서만 표시 */}
          <div className='pointItem'>
            <p>레벨: {pointData.points[0]?.rank ?? '0'}</p>
          </div>
        </>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default PointPage;
