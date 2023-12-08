import * as Api from '../../../api/api'
import { useState } from "react"
import useChatStore from "../../../stores/chat"
import { TextField, Box, Button, Stack } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import '../../../styles/chatting.css'

const PrepareRoom = ({ userId, itemId }) => {
  const [myMessage, setMyMessage] = useState([])
  const [receivedMessage, setReceivedMessage] = useState([])
  const [typing, setTyping] = useState('')
  const { myRooms, addRoom } = useChatStore()
  const navigate = useNavigate()

  const startChatting = async (e) => {
    e.preventDefault()

    try {
      const res = await Api.post(`chat/newRoom/${itemId}`, { message : typing })
      // addRoom(res.data.roomId)
      console.log(userId, itemId)
      navigate(`/chatting/${res.data.roomId}`, {state: { userId: userId, itemId: itemId, prepare: false }})
    } catch (err) {
        console.log('채팅방 생성에 실패했습니다.', err)
        alert('서버와의 연결에 실패했습니다. 관리자에게 문의하세요.')
    }
  }

  return (
    <Box sx={{height: '100vh', backgroundColor: '#abdfab'}}>
      <Button onClick={() => navigate('/chatlist')}>채팅목록으로 돌아가기</Button>
      <Box
        className='sendbar' 
        component='form' 
        onSubmit={startChatting}
        sx={{
          backgroundColor: 'white',
          boxShadow: 2,
          borderRadius: 3,
          textAlign: 'left',
          width: '100%'
        }}>
        <Stack direction='row'>
          <TextField 
            fullWidth label='메세지를 입력하여 대화를 시작하세요.' value={typing} onChange={e => setTyping(e.target.value)} />
          <Button 
            type='submit'
            variant='text'> 📤 
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default PrepareRoom