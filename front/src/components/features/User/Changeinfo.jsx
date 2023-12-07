import React, { useState, useEffect } from 'react';
import * as Api from '../../../api/api';
import { useLocation, useNavigate } from 'react-router-dom';

const CenteredContainer = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      border: '1px solid black',
      maxWidth: '800px',
      margin: '30px auto 0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}
  >
    {children}
  </div>
);

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

      const response = await Api.put('user/current', {
        user: {
          _id: user._id,
          nickname: newNickname,
          profileImage,
        },
      });

      setNewNickname(response.data.nickname);
      setProfileImage(response.data.profileImage);

      console.log('서버 응답:', response.data);

      navigate('/mypage', { state: { updatedUser: response.data } });
    } catch (error) {
      console.error('유저 정보 에러:', error);
    }
  };

  return (
    <CenteredContainer>
      <div>
        <h2>닉네임, 프로필 사진 변경하기</h2>

        {user ? (
          <>
            <p>현재 닉네임: {user.nickname}</p>

            {isChanging ? (
              <>
                <input
                  type='text'
                  placeholder='새 닉네임'
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                />
                <input type='file' accept='image/*' onChange={(e) => setProfileImage(e.target.files[0])} />
                <button className='userchange-btn' onClick={handleChangeUserInfo}>
                  저장
                </button>
              </>
            ) : (
              <button className='userchange-btn' onClick={() => setIsChanging(true)}>
                유저 정보 변경
              </button>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </CenteredContainer>
  );
};

export default ChangeInfo;
