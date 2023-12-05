import React, { useState, useEffect } from 'react';
import * as Api from '../../../api/api';
import { useLocation } from 'react-router-dom';

const ChangeInfo = () => {
  const [newNickname, setNewNickname] = useState('');
  //   const [newPassword, setNewPassword] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  const location = useLocation();
  const user = location.state.user;

  console.log(user);

  useEffect(() => {
    if (user) {
      setNewNickname(user.nickname || '');
    }
  }, [user]);

  const handleChangeUserInfo = async () => {
    // console.log(user.password);
    try {
      if (!user) {
        console.error('error.');
        return;
      }

      const response = await Api.put('user/current', {
        id: user._id,
        nickname: newNickname,
        // password: newPassword,
      });

      console.log('서버 응답:', response.data);

      setIsChanging(false);
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
              {/* <input
                type='password'
                placeholder='새 비밀번호'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              /> */}
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
