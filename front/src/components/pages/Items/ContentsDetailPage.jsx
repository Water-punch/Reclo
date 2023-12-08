import { useState, Suspense, useEffect, Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, Chip, Stack, Box, Button, Grid, Checkbox, Divider, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation, useQuery } from "@tanstack/react-query"
import * as Api from '../../../api/api'
import useUserStore from "../../../stores/user"

const ContentsDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const itemId = params.itemId
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [checkLike, setCheckLike] = useState(true)
  const [updatedLike, setUpdatedLike] = useState(0)
  const [item, setItem] = useState({})
  const { user } = useUserStore()
  const [open, setOpen] = useState(false)

  const getItemDetail = async () => {
    const res = await Api.get(`item/${itemId}`)
    setItem(res.data.itemDetails)
    console.log(res.data.itemDetails)
  }

  useEffect(() => {
    getItemDetail()
  }, [])
  
  const handleOpen = () => {
    console.log(user._id)
    if(user._id) {
      setOpen(true)
    } else {
      alert('로그인이 필요한 서비스입니다.')
      navigate('/login')
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteItem = async (e) => {
    e.preventDefault()
    try { 
      const res = await Api.del(`item/${item.userId}`)
        console.log('API 호출 결과:', res)
      alert('게시글이 삭제되었습니다.')
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.')
    }
  }

  const addWishList = async () => { 
    //페이지 이동 시 좋아요 상태 업데이트
    try {
      const res = await Api.put(`userLikes/${itemId}`, {
        likeInfo: {
          likeStatus: checkLike,
          userId: user._id,
          itemId: itemId
        }})
      console.log('위시리스트 반영 성공:', res)
    } catch (err) {
      console.log('위시리스트 반영 실패')
    }
  }

  const likeUpdate = async () => {
    try {
      const res = await Api.put(`item/${itemId}`, { 
        itemInfo : { 
          userId: user._id,
          title: title, 
          price: price, 
          description: description, 
          category: category,
          state: state, 
          like: updatedLike,
          itemsImgUrl: itemsImgUrl 
        }})
      console.log('좋아요 개수를 갱신했습니다. ')
    } catch (err) {
      console.log('좋아요 개수 수정에 실패했습니다.')
    }
  }

  useEffect(() => {
    addWishList()
    likeUpdate()
  }, [navigate])

  const editItem = () => {
    navigate('/write', { state: { edit: true, item: item } })
  }

  const handleLike = () => {
    setCheckLike(prev => !prev)
    console.log(checkLike)
    setUpdatedLike(prev => prev + (checkLike ? 1 : -1))
  }

  const sendRequest = async () => {
    handleClose()
    console.log(`판매자에게 대화요청을 보냅니다.`)
    navigate(`/chatting/${itemId}`, { state : { itemId : itemId, userId : user._id, prepare: true }})
  }

    return (
        <Box
          my={5}
          sx={{
            display: 'flex', 
            justifyContent: 'center', 
            minHeight: '80vh' }}>
          <Box 
            sx={{
            boxShadow: 2,
            width: '80%',
          }}>
            <Button onClick={editItem}>
              수정
            </Button>
            <Button onClick={deleteItem}>
              삭제
            </Button>
           
            <Card sx={{ minHeight: '30%', width: '70%', marginLeft: '15%' }}>
              유저 정보 넣을 공간
            </Card>

            <Grid container spacing={2} mx={5} my={5}>
              <Grid item xs={12} sm={8} md={6} lg={5}>
                <Card sx={{ height: '100%', width: '100%'}}>
                    <img src={item.itemsImgUrl[0]} alt='대표사진'/>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={5}>
                <Card sx={{ height: '100%', width: '100%'}}>
                  <Stack direction='row' spacing={1} my={1} mx={3}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Chip label={item.price == 0 ? '나눔' : '판매'}/>
                    {item.state === '거래 가능' ? (<Chip label={item.state} color='success'/>) : item.state === '거래중' ? (<Chip label={item.state} color='primary'/>) : (<Chip label={item.state} />)}
                  </Stack>

                  <Stack mx={1}>
                    <Typography variant="body2" mb={1}>
                      분류: [{item.category}]   판매가: {item.price} 원
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      <div dangerouslySetInnerHTML={{ __html: item.description }} />
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction='row' spacing={5}
                    sx={{display: 'flex', justifyContent: 'center'}}>
                    <Stack direction='row' sx={{display: "flex", alignItems: 'center'}}>
                      <Checkbox 
                      {...label} 
                      icon={<FavoriteBorder />} 
                      checkedIcon={<Favorite />}
                      // value={item.} 
                      onClick={handleLike} />
                      <Typography variant="body2"> 좋아요 {updatedLike} </Typography>
                    </Stack>
                    <Fragment>
                      <Button variant="text"
                        color="success"
                        size="small"
                        onClick={handleOpen}>
                         [💬대화 신청]
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"판매자와 채팅을 시작하겠습니까?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            채팅창으로 이동해 판매자와 대화를 시작합니다. <br />
                            매너있는 채팅을 부탁드립니다. 
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={sendRequest} autoFocus>
                              확인
                          </Button>
                          <Button onClick={handleClose}>취소</Button>
                        </DialogActions>
                      </Dialog>
                    </Fragment>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
    )
}

export default ContentsDetailPage