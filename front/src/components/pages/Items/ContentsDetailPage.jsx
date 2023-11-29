import { useLocation } from "react-router-dom"
import FilterBar from "../../features/Items/FilterBar"
import { Box, CardMedia, Grid, ImageList, ImageListItem } from '@mui/material'



const ContentsDetailPage = () => {
  const {
    state: { item : { itemId, name, title, price, content, like, share, tradeState, categorySave, tag } }
  } = useLocation

    return (
      <>
        <Box sx={{
          boxShadow: 2,
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          width: '80%'
        }}>
          <Grid container spacing={2} mx={5} my={5}>
            <Grid item xs={12} sm={8} md={6} lg={5}>
              <Card>
                <CardMedia 
                  component="img"
                  height="50%"
                  src="/맥가이버칼.jpg" //이미지 경로는 public 기준, {imgUrl}로 서버에서 받은 이미지 url을 넣을 수 있음.
                  alt="맥가이버칼"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={5}>
              
            </Grid>
          </Grid>
        </Box>
      </>
    )
}

export default ContentsDetailPage