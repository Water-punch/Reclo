import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; //useQueryClient는 Queryclient를 사용할 컴포넌트에서
import { Home, IntroPage, ActivityAdmin, LoginPage, RegisterPage } from './components/pages/Home';
import { TestPage, TestResultPage } from './components/pages/Test';
import { ChatListPage, ChattingRoomPage } from './components/pages/Chat';
import { EventPage, ContentsPage, ContentsWritePage, ContentsDetailPage } from './components/pages/Items';
import { PointPage, MyPage } from './components/pages/User';
import { WishListPage } from './components/pages/WishItem';
import Header from './components/common/Header';
import NavBar from './components/common/NavBar';
import useUserStore from './stores/user';
import * as Api from './api/api';
import ChangeInfo from './components/features/User/Changeinfo';
import UserPoint from './components/features/User/UserPoint';

function App() {
  const queryClient = new QueryClient();
  const { login, setLogin, user, setUser } = useUserStore();

  const checkLogin = async () => {
    if (localStorage.getItem('accessToken')) {
      setLogin(true);
      console.log('로그인 여부 확인: ', login);

      const res = await Api.get('user/current');
      console.log(res);
      setUser(res.data.user);
      console.log(user);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/intro' element={<IntroPage />} />
          <Route path='/activity' element={<ActivityAdmin />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/mypage' element={<MyPage />} />
          <Route path='/wishlist' element={<WishListPage />} />
          <Route path='/point' element={<PointPage />} />
          <Route path='/changeinfo' element={<ChangeInfo />} />

          <Route path='/test' element={<TestPage />} />
          <Route path='/test/result' element={<TestResultPage></TestResultPage>} />

          <Route path='/contents' element={<ContentsPage />} />
          <Route path='/write' element={<ContentsWritePage />} />
          <Route path='/detail/:itemId' element={<ContentsDetailPage />} />
          <Route path='/event' element={<EventPage />} />

          <Route path='/chatlist' element={<ChatListPage />} />
          <Route path='/chatting/:roomId' element={<ChattingRoomPage />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
