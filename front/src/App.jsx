import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider ,} from '@tanstack/react-query' //useQueryClient는 Queryclient를 사용할 컴포넌트에서
import { Home, IntroPage, ActivityAdmin, LoginPage,  RegisterPage } from './components/pages/Home'
import { TestPage, TestResultPage } from './components/pages/Test'
import { ChatListPage, ChattingRoomPage } from './components/pages/Chat'
import { EventPage, ContentsPage, ContentsWritePage, ContentsDetailPage } from './components/pages/Items'
import { PointPage, MyPage, WishListPage } from './components/pages/User'
import Header from './components/common/Header'
import NavBar from './components/common/NavBar'
import useUserStore from './stores/user'

function App() {
  const queryClient = new QueryClient()
  const { login, setLogin, user } = useUserStore()

  const checkLogin = () => {
    if(localStorage.getItem('accessToken')) {
      setLogin(true)
      console.log('로그인 여부 확인: ', login)
      console.log(localStorage.getItem('accessToken'))
    }
  }

  useEffect(() => {
    checkLogin()
  }, [setLogin])

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

          <Route path='/test' element={<TestPage />} />

          <Route path='/contents' element={<ContentsPage />} />
          <Route path='/write' element={<ContentsWritePage />} />
          <Route path='/detail/:itemId' element={<ContentsDetailPage />} />
          <Route path='/event' element={<EventPage />} />

          <Route path='/chatlist' element={<ChatListPage />} />
          <Route path='/chatting' element={<ChattingRoomPage />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
