import { QueryClient } from "@tanstack/react-query"
import ContentWriteForm from "../../features/Items/ContentWriteForm"
import * as Api from '../../../api/api'
import { useLocation, useParams } from "react-router-dom"
import ContentEditForm from "../../features/Items/ContentEditForm"
import useUserStore from "../../../stores/user"

const ContentsWritePage = () => {
  const params = useParams()
  const location = useLocation()
  const edit = location.state.edit
  const { user } = useUserStore() 

    return (
        <>
          <h1>ContentsWritePage</h1>
          {edit ? (<ContentEditForm />) : 
          (<ContentWriteForm userId={user.userId}/>)}
        </>
    )
}

export default ContentsWritePage