import '../../../styles/wish.css';
import * as Api from '../../../api/api';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LikeToggleButton from '../../common/LikeToggleButton';

const WishItemCard = ({ wishItem }) => {
  const itemId = wishItem.itemId;
  const navigate = useNavigate();
  console.log(wishItem);
  const likeOrDelete = async () => {
    const res = await Api.put(`item/${itemId}/likes`);
    console.log(res.data);
  };

  return (
    <Box onClick={() => navigate(`detail/${itemId}`)}>
      {/* <div>{item.itemsImgUrl}<//div> */}
      <div>{wishItem.title}</div>
      <div>{wishItem.price}</div>
      <div>{wishItem.state}</div>
      <div>{wishItem.category}</div>
      <LikeToggleButton onClick={likeOrDelete}> 삭제</LikeToggleButton>
    </Box>
  );
};

export default WishItemCard;
