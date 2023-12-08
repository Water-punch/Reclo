import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/MyPage.css';
import UserPoint from './UserPoint';

  export const getRankName = (level) => {
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

const UserInfo = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const updatedUser = location.state?.updatedUser;
  const displayUser = updatedUser || user;

  useEffect(() => {
    console.log(updatedUser);
  }, []);

  return (
    <div className='userinfoContainer'>
      <div className='mypage'>
        <div className='contentContainer'>
          <div className='profile'>
            {displayUser.userImgUrl ? (
              <img 
                src={displayUser.userImgUrl} 
                alt='프로필 이미지'
                className='profile'  
              />
            ) : (
              <p>No profile image</p>
            )}
          </div>
          <div className='pointContainer'>
            <UserPoint />
          </div>
        </div>
        <div className='userbox'>
          <div className='userInfo'>
            <p>현재 닉네임: {displayUser.nickname}</p>
            <p>현재 Rank: {getRankName(displayUser.rank)}</p>
            <button className='change' onClick={() => navigate('/changeinfo', { state: { user: displayUser } })}>
              유저 정보 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
