import React, { useState, useEffect } from 'react';
import * as Api from '../../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangeInfo = () => {
  const [newNickname, setNewNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isChanging, setIsChanging] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;

  useEffect(() => {
    if (user) {
      setNewNickname(user.nickname || '');
    }
  }, [user]);

  const handleChangeUserInfo = async () => {
    try {
      if (!user) {
        console.error('에러 발생: 유저 정보가 없습니다.');
        return;
      }

      // 이미지 변경 FormData
      const formData = new FormData();
      formData.append('userId', user._id);
      formData.append('nickname', newNickname);
      formData.append('profileImage', profileImage);

      const response = await Api.put('user/current', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewNickname(response.data.nickname);
      setProfileImage(response.data.profileImage);

      console.log('서버 응답:', response.data);

      navigate('/userinfo', { state: { updatedUser: response.data } });
    } catch (error) {
      console.error('유저 정보 에러:', error);
    }
  };

  return (
    <div>
      <div className='userInfo'>
        <h2>User Change Page</h2>

        {user ? (
          <div className='changeInfoForm'>
            <p>현재 닉네임: {user.nickname}</p>

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
