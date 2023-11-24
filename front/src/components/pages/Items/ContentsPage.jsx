import { useNavigate } from 'react-router-dom'

const ContentsPage = () => {
  const navigate = useNavigate()

    return (
        <>
          <h1>ContentsPage</h1>
          <p onClick={() => {navigate('/add')}}>ContentsDetail</p>
          <p onClick={() => {navigate('/detail')}}>ContentsAdd</p>
        </>
    )
}

export default ContentsPage