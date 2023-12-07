import * as Api from '../../../api/api'
import { useEffect, useState } from "react"
import useChatStore from "../../../stores/chat"
import { TextField, Box, Button, Stack } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom'

const ChattingRoom = ({ userId, itemId }) => {
  const [myMessage, setMyMessage] = useState([])
  const [receivedMessage, setReceivedMessage] = useState([])
  const [typing, setTyping] = useState('')
  const { myRooms, addRoom } = useChatStore()
  const navigate = useNavigate()
  const params = useParams()
  const roomId = params.roomId
  const [serverData, setServerData] = useState([])

  const quitChattingRoom = async () => {
    try {
      const res = await Api.post(`chat/leaveRoom/${roomId}`)
      alert('채팅방에서 나갔습니다.')
      navigate('/chatlist')
    } catch (err) {
        console.log('채팅방 퇴장에 실패했습니다.', err)
        alert('서버와의 연결에 실패했습니다. 관리자에게 문의하세요.')
    }
  }

  // const sendAndReceive = async () => {
  //   try {
  //     const res = await Api.get(`chat/room/${roomId}`)
  //     setServerData(res.chats)
  //   } catch (err) {
  //       console.log('서버연결에 실패했습니다.', err)
  //       alert('서버와의 연결에 실패했습니다. 관리자에게 문의하세요.')
  //   }
  // }

  // useEffect(() => {
  //   sendAndReceive()
  // }, [])

  return (
    <Box sx={{height: '100vh', backgroundColor: '#abdfab'}}>
      <Button>채팅방 나가기</Button>
      <Button onClick={quitChattingRoom}>채팅목록으로 돌아가기</Button>
      <div>here</div>
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
            fullWidth label='메세지를 입력하세요.' value={typing} onChange={e => setTyping(e.target.value)} />
          <Button 
            type='submit'
            variant='text'> 📤 
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default ChattingRoom