import { useLocation } from "react-router-dom"
import ChattingRoom from "../../features/Chat/ChattingRoom"
import PrepareRoom from "../../features/Chat/PrepareRoom"


const ChattingRoomPage = ( {roomId} ) => {
  const location = useLocation()
  const itemId = location.state?.itemId
  const userId = location.state?.userId
  const prepare = location.state?.prepare
  console.log('itemId, userId, prepare, roomId :', itemId, userId, prepare, roomId)

    return (
        <>
          <div>chatting room</div>
          {prepare ? (
            <PrepareRoom 
              itemId={itemId} 
              userId={userId}/>
              ) : (
            <ChattingRoom 
              itemId={itemId} 
              userId={userId}/>
          )}

        </>
    )
}

export default ChattingRoomPage