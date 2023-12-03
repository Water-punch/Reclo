import { useState, Suspense } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, Chip, Stack, Box, Button, Grid, Checkbox, Divider, Typography, MenuItem, Menu, IconButton } from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation, useQuery } from "@tanstack/react-query"
import * as Api from '../../../api/api'

const ContentsDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const itemId = params.itemId
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [checkLike, setCheckLike] = useState(false)
  const [updatedLike, setUpdatedLike] = useState(0)

  const { isPending, error, data } = useQuery({ 
    queryKey: ['detailpage', itemId], 
    queryFn: async () => {
      try {
        const res = await Api.get(`item/${itemId}`)
        return res.data
      } catch (error) {
        console.error('useQuery 에러:', error)
      }
    },
  })

  if (isPending) return 'Loading...'
  if (error) return '오류가 발생했습니다.' + error.message

  const item = data.items
  
  // const deleteMutation = useMutation(() => Api.del(`item/${itemId}`))
  // const deleteItem = async () => {
  //   deleteMutation.mutate()
  // }
  
  // const likeUpdateMutation = useMutation((endpoint, data) => Api.put(endpoint, data))

    // const updateLikeOnPageChange = async () => { //페이지 이동 시 좋아요 상태 업데이트
  //   try {
  //     likeUpdateMutation.mutate(`/item/${itemId}`, updatedLike)
  //   } catch {
  //     console.log('likeUpdateMutation 실패')
  //   }
  // }


  const editItem = () => {
    navigate('/write', { state: { edit: true, item: item } })
  }

  const handleLike = () => {
    setCheckLike(prev => !prev)
    checkLike ? (setUpdatedLike(prev => prev + 1)) : (setUpdatedLike(prev => prev - 1))  
  }

  const sendRequest = () => {
    console.log(`판매자에게 대화요청을 보냅니다.`)
  }

    return (
      // <Suspense fallback={'loading...'}>
      //   {error && <p></p>}
      //   {data && (
          <Box sx={{
            boxShadow: 2,
            justifyContent: 'center',
            width: '80%'
          }}>
            <Button onClick={editItem}>
              수정
            </Button>

            {/* <>
            {deleteMutation.isError && <p>삭제 실패</p>}
            {deleteMutation.isLoading && <p>삭제중..</p>}
            {deleteMutation.isSuccess && <p>삭제가 완료되었습니다.</p>}
            </>
            <Button onClick={deleteItem}>
              삭제
            </Button> */}

            <Grid container spacing={2} mx={5} my={5}>
              <Grid item xs={12} sm={8} md={6} lg={5}>
              <Card sx={{ height: '50%'}}>
                  <img/>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={5}>
                <Card sx={{ height: '50%'}}>
                  <Stack direction='row' spacing={1} mb={1}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Chip label={item.price == 0 ? '나눔' : '판매'}/>
                    {item.state === '거래가능' ? (<Chip label={item.state}/>) : item.state === '거래중' ? (<Chip label={item.state} color='primary'/>) : (<Chip label={item.state} color='success'/>)}
                  </Stack>
                  <Typography variant="body1" mb={1}>
                    {item.category}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" mb={1}>
                    판매가 {item.price} 원
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    {item.content}
                  </Typography>
                  <Divider />
                  <Stack direction='row'>
                    <Stack direction='row'>
                      <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleLike} />
                      <Typography variant="body2"> 좋아요 {updatedLike} </Typography>
                    </Stack>
                    <Button variant="contained"
                      color="success"
                      onClick={sendRequest}>
                      1:1 대화
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
            </Box> 
      //   )}
      // </Suspense>
    )
}

export default ContentsDetailPage