import React, { useState, useEffect } from 'react';
import * as Api from '../../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';

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

const ChangeInfo = () => {
  const [newNickname, setNewNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userFromLocation = location.state.user;
    if (userFromLocation) {
      setUser(userFromLocation);
      setNewNickname(userFromLocation.nickname || '');
    }
  }, [location.state.user]);

  const handleChangeUserInfo = async () => {
    try {
      if (!user) {
        console.error('에러 발생: 유저 정보가 없습니다.');
        return;
      }

      const response = await Api.put('user/current', {
        user: {
          _id: user._id,
          nickname: newNickname,
          profileImage,
        },
      });

      // 직접 상태 업데이트
      setNewNickname(response.data.nickname || '');
      setProfileImage(response.data.profileImage || null);

      console.log('서버 응답:', response.data);

      // UserInfo 페이지로 이동
      navigate('/userinfo', { state: { updatedUser: response.data } });
    } catch (error) {
      console.error('유저 정보 에러:', error);
    }
  };

  return (
    <div>
      <div className='userInfo'>
        <h2></h2>

        {user ? (
          <div className='changeInfoForm'>
            <p>현재 닉네임: {user.nickname}</p>
            <p>현재 Rank: {getRankName(user.rank)}</p>

            {isChanging ? (
              <>
                <input
                  className='inputField'
                  type='text'
                  placeholder='새 닉네임'
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <input
                  className='fileInput'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
                <button className='saveButton' onClick={handleChangeUserInfo}>
                  저장
                </button>
              </>
            ) : (
              <button className='userchange-btn' onClick={() => setIsChanging(true)}>
                유저 정보 변경
              </button>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ChangeInfo;
