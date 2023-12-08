import '../../../styles/wish.css';
import * as Api from '../../../api/api';
import { Box, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LikeToggleButton from '../../common/LikeToggleButton';

const WishItemCard = ({ wishItem }) => {
  const itemId = wishItem.itemId;
  const navigate = useNavigate();
  console.log(wishItem.itemId);
  const likeOrDelete = async () => {
    const res = await Api.put(`item/${itemId}/likes`);
    console.log(res.data);
  };

  return (
    <Box onClick={() => navigate(`/detail/${itemId}`)}
    sx={{boxShadow: 2, borderRadius: 2}}>
      <Card sx={{minHeight: 150}}>
        <div>{wishItem.wishItemId.itemsImgUrl}</div>
        <div>{wishItem.wishItemId.title}</div>
        <div>{wishItem.wishItemId.price}</div>
        <div>{wishItem.wishItemId.state}</div>
        <div>{wishItem.wishItemId.category}</div>
        <LikeToggleButton onClick={likeOrDelete}> 삭제</LikeToggleButton>
      </Card>
    </Box>
  );
};

export default WishItemCard;
