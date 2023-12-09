import * as Api from '../../../api/api'
import { useEffect, useState } from "react"
import useChatStore from "../../../stores/chat"
import { TextField, Box, Button, Stack } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom'

const ChattingRoom = ({ userId, itemId }) => {
  const [myMessage, setMyMessage] = useState([])
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

  const receiveMessage = async () => {
    const eventSource = new EventSource(`http://localhost:5173/sse`)

    try {
      const res = await Api.get2(`chat/room/${roomId}`)
      eventSource.onopen = () => {
        console.log('SSE 연결이 시작되었습니다.');
      }

      eventSource.onmessage = async (e) => {
        try {
          setServerData(res.chats)
        } catch (err) {
          console.log('서버 응답을 받는데 실패했습니다.', err)
        }
      }

    } catch (err) {
        console.log('서버연결에 실패했습니다.', err)
        alert('서버와의 연결에 실패했습니다. 관리자에게 문의하세요.')
    }
  }

  const sendMessage = async () => {

    setMyMessage(prev => [...prev, typing])
    try {
      const res = await Api.post(`chat/send/${roomId}`, {meesageText : myMessage})
      console.log('메세지 :', myMessage , res.ok)
    } catch {
      alert('메세지 전송에 실패했습니다.')
    }
  }

  useEffect(() => {
    receiveMessage()
  }, [])

  return (
    <Box sx={{height: '100vh', backgroundColor: '#abdfab'}}>
      <Button onClick={quitChattingRoom}>채팅방 나가기</Button>
      <Button onClick={navigate('/chatlist')}>채팅목록으로 돌아가기</Button>
      <div>here</div>
      
      <ul>
        {serverData.map((message, index) => (
          <li key={index} style={{ textAlign: 'right', paddingRight: '10px' }}> {message} </li>
        ))}
      </ul>
        
      {myMessage.map((message, index) => (
         <li key={index} style={{ textAlign: 'left', paddingLeft: '10px' }}> {message} </li>
      ))}
      
      <Box
        className='sendbar' 
        component='form' 
        onSubmit={sendMessage}
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