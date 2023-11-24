import { useNavigate } from "react-router-dom"

const ShopPage = () => {
  const navigate = useNavigate()


    return (
        <>
          <h1>ShopPage</h1>
          <p onClick={() => {navigate('/ShopDetailPage')}}>ShopDetail</p>
          <p onClick={() => {navigate('/ShopAddPage')}}>ShopAdd</p>
        </>
    )
}

export default ShopPage