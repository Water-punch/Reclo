import { useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

const ContentsCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Card sx={{ width: '60vh', height: '30vh' }}>
      <CardActionArea onClick={() => navigate(`/detail/${item._id}`) }>
        <CardMedia
          component="img"
          height="50%"
          src="/맥가이버칼.jpg" //이미지 경로는 public 기준, {imgUrl}로 서버에서 받은 이미지 url을 넣을 수 있음.
          alt="맥가이버칼"
        />
        <CardContent>
          <Stack direction='row' spacing={1} mb={1}>
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
          <Stack direction='row' spacing={1} mt={1} >
            <Chip label={'❤' + item.like}/>
            {item.state === '거래가능' ? (<Chip label={item.state}/>) : item.state === '거래중' ? (<Chip label={item.state} color='primary'/>) : (<Chip label={item.state} color='success'/>)}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  </Box>  
  );
};

export default ContentsCard;
