import { useEffect, useState } from 'react';
import * as Api from '../../../api/api'
import useUserStore from '../../../stores/user';
import { Box } from '@mui/material';
import WishItemCard from '../../features/User/WishItemCard';

const WishListPage = () => {
  const { user } = useUserStore() //로그인한 유저 정보 꺼내옴
  const [items, setItems] = useState([])

  //유저별 관심상품 조회 -> 클릭하면 상세내용 조회
  const handleSearch = async() => {
    const res = await Api.get2(`item/user-likes/${user._id}`)
    console.log(res.data.userwishItems)
    setItems(res.data.userwishItems)
  }

  //관심상품 추가 & 삭제 --> 여기서는 삭제만?

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <Box>
      {items.map((item) => (
        <Box key={item._id}>
          <WishItemCard item={item}/>
        </Box>
      ))}
    </Box>
  );
};

export default WishListPage;
