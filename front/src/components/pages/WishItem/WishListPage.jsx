import { useEffect, useState } from 'react';
import useUserStore from '../../../stores/user';
import * as Api from '../../../api/api';
import { Grid, Box, Button } from '@mui/material';
import WishItemCard from '../../features/WishItem/WishItemCard';

const WishListPage = () => {
  const { user } = useUserStore(); //로그인한 유저 정보 꺼내옴
  const [wishItem, setWishItem] = useState([]);

  const getWishItem = async () => {
    try {
      // console.log(user);
      const res = await Api.get2(`item/user-likes/${user._id}`);
      // console.log(res);
      console.log(res.data.userwishItems);
      setWishItem(res.data.userwishItems);
    } catch (error) {
      console.log('위시아이템 조회를 실패했습니다.');
    }
  };

  useEffect(() => {
    getWishItem();
  }, []);

  // setWishItem
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ marginTop: '20px' }}>오늘도 {user.nickname}님의 옷장에 새로운 가치를 더해 보세요👕</Box>
      <Box sx={{ marginTop: '10px' }}>{user.nickname}님 위시리스트 </Box>
      <Box sx={{ flexGrow: 1, marginLeft: '20vh' }}>
        <Box>
          {wishItem.map((item) => (
            <Box key={item._id}>
              <WishItemCard wishItem={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WishListPage;
