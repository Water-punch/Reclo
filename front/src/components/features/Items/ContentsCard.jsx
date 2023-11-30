import { useNavigate } from "react-router-dom"
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Stack, Typography} from '@mui/material'

const ContentsCard = ({item}) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea onClick={() => navigate(`/detail/${item.itemId}`, { state : {item} }) }>
        <CardMedia
          component="img"
          height="140"
          src="/맥가이버칼.jpg" //이미지 경로는 public 기준, {imgUrl}로 서버에서 받은 이미지 url을 넣을 수 있음.
          alt="맥가이버칼"
        />
        <CardContent>
          <Stack direction='row' spacing={1}>
            <Chip label={item.share}/>
            <Typography gutterBottom variant="h6" component="div">
              {item.name}
            </Typography>
          </Stack>
          <Typography variant="body2">
            {item.title}
          </Typography>
          {!item.share && (<Typography variant="body2" color="text.secondary">
            가격: {item.price}
          </Typography>)}
          <Stack direction='row' spacing={1} >
            <chip label={'❤' + item.like}/>
            {item.tradeState === '거래가능' ? (<chip label={item.tradeState}/>) : item.tradeState === '거래중' ? (<chip label={item.tradeState} color='primary'/>) : (<chip label={item.tradeState} color='success'/>)}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ContentsCard