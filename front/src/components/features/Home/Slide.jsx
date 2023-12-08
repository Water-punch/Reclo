import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../../styles/TestCompo.module.css";
import { Stack, Box } from '@mui/material'
import * as Api from '../../../api/api'
import { useEffect, useState } from "react";
import CarouselCard from '../../features/Home/CarouselCard'

// "https://source.unsplash.com/random"

function TestCompo() {
  const [trendItem, setTrendItem] = useState([])

  const getTrendItem = async () => {
    try {
      const res = await Api.get('items/likedMost')
      setTrendItem(res.data.likedMost)
    } catch {
      console.log('트렌드 아이템 요청에 실패했습니다.')
    }
  } 

  useEffect(() => {
    getTrendItem()
  }, [])

  const chunkSize = 4
  const dividedItems = []
  for (let i = 0; i < trendItem.length; i += chunkSize) {
    dividedItems.push(trendItem.slice(i, i + chunkSize));
  }

  console.log(dividedItems)

  return (
    <>
      <div className={styles.container}>
        <Carousel>
          {dividedItems.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <Box>
                  <Stack direction='row' spacing={20} my={3} sx={{marginLeft: 10}}>
                    <CarouselCard item={item[0]} />
                    <CarouselCard item={item[1]} />
                    <CarouselCard item={item[2]} />
                    <CarouselCard item={item[3]} />
                  </Stack>
                </Box>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default TestCompo;
