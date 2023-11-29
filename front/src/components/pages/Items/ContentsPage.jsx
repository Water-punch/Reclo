import { useNavigate } from 'react-router-dom'
import FilterBar from '../../features/Items/FilterBar'

const ContentsPage = () => {
  const navigate = useNavigate()

    return (
        <>
          <h1>ContentsPage</h1>
          <FilterBar />
          <button onClick={() => {navigate('/add')}}>물품 등록</button>
          <button onClick={() => {navigate('/detail')}}>아이템</button>
        </>
    )
}

export default ContentsPage