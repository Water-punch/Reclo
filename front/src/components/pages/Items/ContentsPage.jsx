import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilterBar from '../../features/Items/FilterBar'
import ContentsCard from '../../features/Items/ContentsCard'
import * as Api from '../../../api/api'
import { useQuery } from '@tanstack/react-query'
import { Grid, Box } from '@mui/material'

const ContentsPage = () => {
  const navigate = useNavigate()
  const { isPending, error, data } = useQuery({ 
    queryKey: ['contentspage'], 
    queryFn: async () => {
      try {
        const res = await Api.get('items')
        return res.data
      } catch (error) {
        throw error
      }
    },
  })

  if (isPending) return 'Loading...'
  if (error) return '오류가 발생했습니다.' + error.message

  console.log(data)

    return (
      <Box sx={{display: 'flex'}}>
        <FilterBar />
        <Box 
          component="main"
          sx={{ flexGrow: 1, marginLeft: '20vh' }}
          // sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <button onClick={() => {navigate('/write', { state : { edit: false } })}}>물품 등록</button>
          <Grid container spacing={2} mx={5} my={5} >
            {data.items.map((item) => ( // 테스트용임
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <ContentsCard
                  mt={2} 
                  item={item}
                />
              </Grid> 
            ))}
          </Grid>
        </Box>   
      </Box>
    )
}

export default ContentsPage