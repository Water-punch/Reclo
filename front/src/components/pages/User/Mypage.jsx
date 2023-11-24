import { useNavigate } from "react-router-dom"

const MyPage = () => {
  const navigate = useNavigate()



    return (
        <>
          <h1>MyPage</h1>
          <button onClick={() => {navigate('/point')}}>point</button>
          <button onClick={() => {navigate('/wishlist')}}>wishlist</button>
        </>
    )
}

export default MyPage