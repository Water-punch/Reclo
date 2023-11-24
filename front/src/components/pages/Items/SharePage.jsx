import { useNavigate } from 'react-router-dom'



const SharePage = () => {
  const navigate = useNavigate()



    return (
        <>
          <h1>SharePage</h1>
          <p onClick={() => {navigate('/ShareDetailPage')}}>ShareDetail</p>
          <p onClick={() => {navigate('/ShareAddPage')}}>ShareAdd</p>
        </>
    )
}

export default SharePage