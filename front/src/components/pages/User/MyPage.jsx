import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../styles/MyPage.css';
import useUserStore from '../../../stores/user';
import { useQuery } from '@tanstack/react-query';
import UserInfo from '../../features/User/UserInfo';

const MyPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const userInfo = location.state.user; 

  return (
    <div>
      <UserInfo user={userInfo} />
    </div>
  );
};

export default MyPage;
