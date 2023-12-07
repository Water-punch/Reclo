import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom"


const WishItemCard = (item) => {
  const navigate = useNavigate()
  const likeOrDelete = async() => {
    const res = await Api.put(`item/${item.itemId}/likes`)
    console.log(res.data)
  }

  return (
      <Box onClick={ ()=>navigate(`/detail/${item._id}`)}>
        <div>{item.title}</div>
        <div>{item.price}</div>
        <div>{item.state}</div>
        <div>{item.category}</div>
        <button onClick={likeOrDelete}>삭제</button>
      </Box>
  )
}

export default WishItemCard