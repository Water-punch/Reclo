import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

    return (
        <>
          <h1>Home</h1>
          <button onClick={() => {navigate('/login')}}>로그인</button>
          <button onClick={() => {navigate('/register')}}>회원가입</button>
          <button onClick={() => {navigate('/mypage')}}>마이페이지</button>

          <div onClick={() => {navigate('/intro')}}>intro</div>
          <div onClick={() => {navigate('/test')}}>test</div>
          <div onClick={() => {navigate('/shop')}}>shop</div>
          <div onClick={() => {navigate('/share')}}>share</div>
          <div onClick={() => {navigate('/event')}}>event</div>
        </>
    )
}

export default Home