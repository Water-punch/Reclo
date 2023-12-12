import '../../../styles/wish.css';
import * as Api from '../../../api/api';
import { Box, Card, CardActionArea, CardMedia, CardContent, Stack, Chip, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LikeToggleButton from '../../common/LikeToggleButton';

const WishItemCard = ({ wishItem }) => {
  const itemId = wishItem.wishItemId;
  const item = wishItem.wishItemId
  const navigate = useNavigate();
  console.log(wishItem.itemId);

  const likeOrDelete = async () => {
    const res = await Api.put(`item/${itemId}/likes`);
    console.log(res.data);
  };

  return (
    <Box my={2}>
      <Card sx={{ width: '100vh', height: 200 }}>
      <CardActionArea onClick={() => navigate(`/detail/${item._id}`) }>
        <Stack direction='row'>
          {item?.itemsImgUrl && (<CardMedia
            component="img"
            sx={{height: 200, width:300}}
            // width='30vh'
            src={item.itemsImgUrl[0]} //이미지 경로는 public 기준, {imgUrl}로 서버에서 받은 이미지 url을 넣을 수 있음.
            alt="대표이미지"
          />)}
          <Stack>
            <CardContent>
              <Stack direction='row' spacing={1} my={1}>
                <Chip label={item.price == 0 ? '나눔' : '판매'}/>
                <Typography gutterBottom variant="h6" component="div">
                  {item.name}
                </Typography>
              </Stack>
              <Typography variant="body2" mb={1}>
                {item.title}
              </Typography>
              {item.price != 0 && (<Typography variant="body2" color="text.secondary" mb={1}>
                가격: {item.price}
              </Typography>)}
              {item.price == 0 && (<Typography variant="body2" color="text.secondary" mb={1}>
                가격: -
              </Typography>)}
              <Divider />
              <Stack direction='row' spacing={1} mt={1}>
                <Chip label={'❤' + item.like}/>
                {item.state === '거래가능' ? (<Chip label={item.state}/>) : item.state === '거래중' ? (<Chip label={item.state} color='primary'/>) : (<Chip label={item.state} color='success'/>)}
                <LikeToggleButton onClick={likeOrDelete} />
                <Typography variant="body1">
                  삭제
                </Typography>
              </Stack>
         
            </CardContent>
          </Stack>
        </Stack>
        
      </CardActionArea>
    </Card>
  </Box>  
  );
};

export default WishItemCard;
