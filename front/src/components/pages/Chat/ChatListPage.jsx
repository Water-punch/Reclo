import { useState } from 'react'
import * as Api from '../../../api/api'
import { Box, Grid } from '@mui/material'
import ChatPreview from '../../features/Chat/ChatPreview'

const ChatListPage = () => {
  const [chatData, setChatData] = useState()

  const getLastMessage = async () => {
      try {
        const res = await Api.get(`chat/current`)
        console.log('대화정보를 불러왔습니다.', res.lastchats)
        setChatData(res.lastchats)
        
      } catch (err) {
          console.log('채팅방 생성에 실패했습니다.', err)
          alert('서버와의 연결에 실패했습니다. 관리자에게 문의하세요.')
        }
    }

  return (
      <Box>
        {/* {chatData.map(()=> (
          <Grid key={id}>
            <ChatPreview></ChatPreview>
          </Grid>
        ))} */}
      </Box>
  )
}

export default ChatListPage