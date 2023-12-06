import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import FilterBar from '../../features/Items/FilterBar'
import ContentsCard from '../../features/Items/ContentsCard'
import * as Api from '../../../api/api'
import { useQuery } from '@tanstack/react-query'
import { Grid, Box, Button } from '@mui/material'
import useUserStore from '../../../stores/user'
import Contents from '../../features/Items/Contents'
import ScrollPagination from '../../features/Items/ScrollPagination'

const ContentsPage = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [seachParams, setSearchParams] = useSearchParams()
  const filter = seachParams.get('category')
  // const location = useLocation()
  // const searchedData = location.state
  // console.log('searchedData' , searchedData)

  const filterSearch = async () => {
    try {
      const res = await Api.get(`items?category=${filter}`)
      console.log(res.data)
      setItems(res.data.items)
    } catch (error) {
      console.log('필터링에 실패했습니다.')
    }
  }

  // useEffect(() => {
  //   if (searchedData) {
  //     setItems(searchedData.items)
  //     }

  //   if (filter) {
  //     filterSearch()
  //     }
  // }, [filter, searchedData])

  console.log('filter, searchedData : ' , filter)

  // useEffect(() => {
  //   if (searchedData) {
  //     setItems(searchedData)
  //     }
  // }, [searchedData])

  return (
    <Box sx={{display: 'flex'}}>
      <Box>
        <FilterBar/>
      </Box>
      <Box 
        sx={{ flexGrow: 1, marginLeft: '20vh' }}
        // sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Button 
          onClick={() => {navigate('/write', { state : { edit: false } })}}>
            물품 등록
        </Button>
        {filter ? (<Contents items={items}/>) : (<ScrollPagination />)}
      </Box>   
    </Box>
  )
}

export default ContentsPage