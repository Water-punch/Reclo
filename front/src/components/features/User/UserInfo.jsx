import { useNavigate } from 'react-router-dom';
import '../../../styles/MyPage.css';
import UserPoint from './UserPoint';

const UserInfo = ({ user }) => {
  const navigate = useNavigate();
  console.log(user);
  console.log(user.email);
  console.log(user.nickname);

  return (
    <div className='userinfoContainer'>
      <div className='mypage'>
        <h1>My Page</h1>
        <div className='contentContainer'>
          <div className='profile'></div>
          <div className='pointContainer'>
            <UserPoint />
          </div>
        </div>
        <div className='userbox'>
          <div className='userInfo'>
            <p>{user.email}</p>
            <p>{user.nickname}</p>

            <button className='change' onClick={() => navigate('/point')}>
              유저 정보 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
