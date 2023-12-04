import { TextField, Button, Box, Stack } from "@mui/material"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const SearchBar = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const searchByKeyword = async (e) => { //조건 = 성별, 분류1 이후에 선택한 **분류2**
    e.preventDefault()
    searchParams.set('searchItem', keyword)
    setSearchParams(searchParams)
   
    try {
      const res = await Api.get(`itemsearch?searchItem=${encodeURIComponent(keyword)}`)
      console.log(`"${keyword}" 검색결과:`,res.data)
      navigate(`/contents?${searchParams}`, { state : { items : res.data }})
    } catch (error) {
      throw error
    }


  }

  return (
    <Box component='form' onSubmit={searchByKeyword}>
      <Stack direction='row'>
        <TextField fullWidth label='제목 검색' id='fullWidth' value={keyword} onChange={e => setKeyword(e.target.value)} />
      </Stack>
      <Button type='submit' size='small'>검색</Button>
    </Box>
  )

}

export default SearchBar