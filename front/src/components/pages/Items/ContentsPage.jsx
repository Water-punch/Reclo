import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilterBar from '../../features/Items/FilterBar'
import ContentsCard from '../../features/Items/ContentsCard'
import * as Api from '../../../api/api'
import { useQuery } from '@tanstack/react-query'
import { Grid, Box } from '@mui/material'

const ContentsPage = () => {
  const navigate = useNavigate()
  // const items = useQuery({ queryKey: ['contentspage'], queryFn: Api.get(`/items`)})
  const item1 = {
    itemId: 1,
    name: '장인의 검',
    title: '좋은 물건 팝니다',
    price: 1000,
    content: '좋아요. 사세요.',
    like: 100,
    share: false,
    categorySave: [],
    tag: ['#'],
    tradeState: '거래가능',
  }

  const item2 = {
    itemId: 2,
    name: '장난감칼',
    title: '안쓰는 물건 나눔',
    price: 0,
    content: '좋아요. 사세요.',
    like: 3,
    share: true,
    categorySave: [],
    tag: ['#'],
    tradeState: '거래중',
  }
  const items = [item1, item2]

    return (
      <div>
        <h1>ContentsPage</h1>
        <FilterBar />
        <button onClick={() => {navigate('/add')}}>물품 등록</button>
        <button onClick={() => {navigate('/detail')}}>아이템</button>
        {/* {items.data?.map((item) => ( */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Grid container spacing={2} mx={5} my={5}>
            {items.map((item) => ( // 테스트용임
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ContentsCard
                  mt={2} 
                  key={item.itemId}
                  item={item}
                />
              </Grid> 
            ))}
          </Grid>
        </Box>   
      </div>
    )
}

export default ContentsPage