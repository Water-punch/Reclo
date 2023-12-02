import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; //useQueryClient는 Queryclient를 사용할 컴포넌트에서
import { Home, IntroPage, ActivityAdmin } from "./components/pages/Home";
import { TestPage, TestResultPage } from "./components/pages/Test";
import { ChatListPage, ChattingRoomPage } from "./components/pages/Chat";
import {
  EventPage,
  ContentsPage,
  ContentsWritePage,
  ContentsDetailPage,
} from "./components/pages/Items";
import {
  LoginPage,
  PointPage,
  MyPage,
  RegisterPage,
  WishListPage,
} from "./components/pages/User";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/activity" element={<ActivityAdmin />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/point" element={<PointPage />} />

          <Route path="/test" element={<TestPage />} />

          <Route path="/contents" element={<ContentsPage />} />
          <Route path="/write" element={<ContentsWritePage />} />
          <Route path="/detail/:itemId" element={<ContentsDetailPage />} />
          <Route path="/event" element={<EventPage />} />

          <Route path="/chatlist" element={<ChatListPage />} />
          <Route path="/chatting" element={<ChattingRoomPage />} />
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
