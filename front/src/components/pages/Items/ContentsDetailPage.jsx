import { useNavigate, useParams } from "react-router-dom"
import { Card, Chip, Stack, Box, Button, Grid, Checkbox, Divider, Typography, MenuItem, Menu, IconButton } from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import * as Api from '../../../api/api'

const ContentsDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const itemId = params
  const buttonOptions = ['수정', '삭제', '공유']
  
  const likeUpdateMutation = useMutation((endpoint, data) => Api.put(endpoint, data))
  const editMutation = useMutation((endpoint, data) => Api.put(endpoint, data))
  const deleteMutation = useMutation((endpoint, data) => Api.del(endpoint, data))

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [checkLike, setCheckLike] = useState(false);
  const [updatedLike, setUpdatedLike] = useState(1)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleVertIcon = (e) => {
    navigate(``)
  }

  const handleLike = () => {
    setCheckLike(prev => !prev)
    checkLike ? setUpdatedLike(prev => prev + 1) : setUpdatedLike(prev => prev - 1)  
  }

  const sendRequest = () => {
    console.log(`판매자에게 대화요청을 보냅니다.`)
  }

  const updateLikeOnPageChange = async () => { //페이지 이동 시 좋아요 상태 업데이트
    try {
      likeUpdateMutation.mutate(`/item/${itemId}`, updatedLike)
    } catch {
      console.log('likeUpdateMutation 실패')
    }
  }

  // useEffect(() => {
  //   // 페이지 이동 감지를 위해 useEffect 사용
  //   const unlisten = navigate(updateLikeOnPageChange) 
  
  //   return () => { unlisten } // 메모리 누수 방지를 위한 클린업 함수
  // }, [navigate, updateLikeOnPageChange]);

    return true ? <></> : (
      <>
        <Box sx={{
          boxShadow: 2,
          justifyContent: 'center',
          width: '80%'
        }}>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              open={open}
            >
                <MenuItem key={option}  onClick={handleClose}>
                  {option}
                </MenuItem>
                <MenuItem key={option}  onClick={handleClose}>
                  {option}
                </MenuItem>
                <MenuItem key={option}  onClick={handleClose}>
                  {option}
                </MenuItem>
            </Menu>
          </div>

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
                    {name}
                  </Typography>
                  <Chip label={share ? '나눔' : '판매'}/>
                  {tradeState === '거래가능' ? (<Chip label={tradeState}/>) : tradeState === '거래중' ? (<Chip label={tradeState} color='primary'/>) : (<Chip label={tradeState} color='success'/>)}
                </Stack>
                <Typography variant="body1" mb={1}>
                  {categorySave}
                </Typography>
                <Typography variant="body1" mb={1}>
                  {title}
                </Typography>
                <Typography variant="body1" mb={1}>
                  판매가 {price} 원
                </Typography>
                <Typography variant="body2" mb={1}>
                  {content}
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
      </>
    )



}

export default ContentsDetailPage