import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import FilterBar from '../../features/Items/FilterBar'
import * as Api from '../../../api/api'
import { Grid, Box, Button } from '@mui/material'
import Contents from '../../features/Items/Contents'
import ScrollPagination from '../../features/Items/ScrollPagination'
import useItemsStore from '../../../stores/items'
import useUserStore from '../../../stores/user'

const ContentsPage = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [seachParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  let searchedData = location.state?.items || ''
  const { filter, setFilter } = useItemsStore()
  const { login } = useUserStore()

  console.log('searchedData: ' , searchedData)
  console.log('filter: ', filter )

  const handleWrite = () => {
    if(login) {
      navigate('/write', { state : { edit: false } })
    } else {
      alert('로그인이 필요한 서비스입니다.')
      navigate('/login')
    }
  }

  const filterSearch = async () => {
    try {
      const res = await Api.get2(`itemsCategory?category=${filter}`)
      console.log('필터링 결과로 데이터 요청', res.data.items)  
      setItems(res.data.items)
      console.log('items:', res.data.items)
    } catch (error) {
      console.log('필터링에 실패했습니다.')
    }
  }

  useEffect(() => {
    if (searchedData) {
      setFilter('')
      setItems(searchedData)
      console.log('검색실행, items:' ,items)
      // searchedData = ''
      // console.log('검색실행 후 검색어 초기화', searchedData)
      } 

    if (filter) {
      searchedData = ''
      filterSearch()
      console.log('필터적용, items:' ,items)
      }

  }, [searchedData, filter])

  useEffect(() => {
   

  }, [filter])

  return (
    <Box sx={{display: 'flex' }}>
      <Box position='sticky'>
        <FilterBar/>
      </Box>
      <Box 
        sx={{ flexGrow: 1, marginLeft: '20vh' }}
        // sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Button 
          onClick={handleWrite}>
            물품 등록
        </Button>
        {filter || searchedData && (<Contents items={items}/>)} 
        {!filter && !searchedData && (<ScrollPagination />)}
      </Box>   
    </Box>
  )
}

export default ContentsPage