import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

  // useEffect(() => {
  //   if (filter) {
  //     const { isPending, error, data } = useQuery({ 
  //         queryKey: ['filterBar'], 
  //         queryFn: async () => {
  //           try {
  //             const res = await Api.get(`items?category=${filter}`)
  //             console.log(res.data)
  //             setItems(res.data.items)
  //             return res.data
  //           } catch (error) {
  //             throw error
  //           }
  //         },
  //       })
      
  //       if (isPending) return 'Loading...'
  //       if (error) return '오류가 발생했습니다.' + error.message
  //       console.log(data)
  //     }
  // }, [filter])

  console.log(filter)

  return (
    <Box sx={{display: 'flex'}}>
      <Box>
        <FilterBar />
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