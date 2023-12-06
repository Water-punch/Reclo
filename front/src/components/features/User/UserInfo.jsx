import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/MyPage.css';
import UserPoint from './UserPoint';

const UserInfo = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const updatedUser = location.state?.updatedUser;

  const displayUser = updatedUser || user;

  console.log(displayUser);

  return (
    <div className='userinfoContainer'>
      <div className='mypage'>
        <h1>My Page</h1>
        <div className='contentContainer'>
          <div className='profile'>
            {displayUser.profileImage ? (
              <img src={displayUser.profileImage} alt='프로필 이미지' />
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
            <p>{displayUser.email}</p>
            <p>{displayUser.nickname}</p>

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
