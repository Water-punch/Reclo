import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [filtered, setFiltered] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    if (filtered === true) {
      const { isPending, error, data } = useQuery({ 
          queryKey: ['filterBar'], 
          queryFn: async () => {
            try {
              const res = await Api.get(`items?category=${encodeURIComponent(condition)}`)
              console.log(res.data)
              setItems(res.data.items)
              return res.data
            } catch (error) {
              throw error
            }
          },
        })
      
        if (isPending) return 'Loading...'
        if (error) return '오류가 발생했습니다.' + error.message
        console.log(data)
      }
  }, [setFiltered])

  console.log(filtered)

  const handleFilter = () => {
    setFiltered(true)
  }

  return (
    <Box sx={{display: 'flex'}}>
      <Box>
        <FilterBar onClick={handleFilter}/>
      </Box>
      <Box 
        component="main"
        sx={{ flexGrow: 1, marginLeft: '20vh' }}
        // sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Button 
          onClick={() => {navigate('/write', { state : { edit: false } })}}>
            물품 등록
        </Button>
        {filtered ? (<Contents items={items}/>) : (<ScrollPagination />)}
      </Box>   
    </Box>
  )
}

export default ContentsPage