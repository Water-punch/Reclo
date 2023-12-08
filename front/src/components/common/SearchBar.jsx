import { TextField, Button, Box, Stack } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Api from '../../api/api'

const SearchBar = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const searchByKeyword = async (e) => { //조건 = 성별, 분류1 이후에 선택한 **분류2**
    e.preventDefault()
   
    try {
      const res = await Api.get2(`itemsearch?searchItem=${keyword}`)
      console.log(`"${keyword}" 검색결과:`, res.data.items)
      if (res.data.items.length === 0) {
        alert('검색결과가 존재하지 않습니다. 다른 검색어를 입력하세요')
        setKeyword('')
        navigate('/contents', { state : { items : res.data.items}})
      }
      else {
        navigate(`/contents`, { state : { items : res.data.items }})
      }
    } catch (error) { //ErrorBoundary 설정도 고려
      alert('검색에 실패했습니다.')
    }
  }

  return (
    <Box component='form' onSubmit={searchByKeyword}>
      <Stack direction='row'>
        <TextField fullWidth label='제목 검색' id='fullWidth' value={keyword} onChange={e => setKeyword(e.target.value)} />
        <Button type='submit' size='small'>검색</Button>
      </Stack>
      
    </Box>
  )

}

export default SearchBar