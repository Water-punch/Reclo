import { useEffect } from 'react';
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

  const getRankName = (level) => {
    const numericLevel = parseInt(level, 10);

    switch (numericLevel) {
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

  const rank = pointData?.points?.[0]?.rank || 0;

  return (
    <div className='pointbox'>
      <>
        <div className='pointItem'>
          <img src='/public/img/point.png' alt='포인트 이미지' />
          <p>포인트</p>
          <p>{pointData?.points?.[0]?.point || 0}</p>
        </div>
        <div className='pointItem'>
          <img src='/public/img/level.png' alt='레벨 이미지' />
          <p>레벨</p>
          <p>{getRankName(rank)}</p>
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
