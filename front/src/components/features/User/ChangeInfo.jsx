import React, { useState, useEffect } from 'react';
import * as Api from '../../../api/api';
import { useLocation } from 'react-router-dom';

const ChangeInfo = () => {
  const [newNickname, setNewNickname] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  const location = useLocation();
  const user = location.state.user;

  useEffect(() => {
    if (user) {
      setNewNickname(user.nickname || '');
    }
  }, [user]);

  useEffect(() => {
    console.log('newNickname:', newNickname);
  }, [newNickname]);

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
        },
      });

      setNewNickname(response.data.nickname);

      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('유저 정보 에러:', error);
    }
  };

  return (
    <div>
      <h2>User Change Page</h2>

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
              <button onClick={handleChangeUserInfo}>저장</button>
            </>
          ) : (
            <button onClick={() => setIsChanging(true)}>유저 정보 변경</button>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChangeInfo;
