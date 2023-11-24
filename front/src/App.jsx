import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home, IntroPage } from './components/pages/Home'
import { TestPage, TestResultPage } from './components/pages/Test'
import { ChatListPage, ChattingRoomPage } from './components/pages/Chat'
import { EventPage, ShopPage, ShopAddPage, ShopDetailPage, SharePage, ShareAddPage, ShareDetailPage} from './components/pages/Items'
import { LoginPage, PointPage, MyPage, RegisterPage, WishListPage } from './components/pages/User'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/intro' element={<IntroPage />} />

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/wishlist' element={<WishListPage />} />
          <Route path='/point' element={<PointPage />} />

          <Route path='/test' element={<TestPage />} />

          <Route path='/shop' element={<ShopPage />} />
          <Route path='/share' element={<SharePage />} />
          <Route path='/event' element={<EventPage />} />

          <Route path='/chatlist' element={<ChatListPage />} />
          <Route path='/chatting' element={<ChattingRoomPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
