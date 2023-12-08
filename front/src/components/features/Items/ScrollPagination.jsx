import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Api from '../../../api/api'
import Contents from './Contents';

const limit = 4 //페이지당 아이템 수

const ScrollPagination = () => {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [itemCursor, setItemCursor] = useState('')

  console.log('scrollPagination 실행')

  useEffect(() => {
    //초기 아이템 로딩
    loadItems();
  }, []);

  const loadItems = async () => {
    console.log('(itemCursor) = ', itemCursor)
    try {
      const apiUrl = `items?itemCursor=${itemCursor}&limit=${limit}`

      const res = await Api.get2(apiUrl)
      const data = res.data
      console.log('scrollPagination 데이터로딩 실행', data)

      if (data.cursor === null || data.items.length < limit) {
        setHasMore(false); //데이터 없으면 무한 스크롤 종료
      } 
      else {
        setItems(prev => [...prev, ...data.items]);
        setItemCursor(data.cursor)
        setTimeout(500)
      }
    } catch (error) {
      console.error('아이템 로딩 실패:', error);
    }
  };

  const fetchMoreData = () => {
    console.log(hasMore, itemCursor)
    loadItems();
  }

  // const scrollToTop = () => {
  //   setHasMore(true)
  //   if (cursorSave.length >= 2) {
  //     const prevCursor = cursorSave[-2]
  //   }
  //   searchParams.set('itemCursor', cursorSave[(cursorSave.length-3) <= 0 ? (cursorSave.length-3) : '' ])
  //   setItemCursor('')
  // }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      // loader={<h4>Loading...</h4>}
      // scrollableTarget='scrollableDiv'
      // scrollToTop={scrollToTop}
    >
      <Contents items={items}/>
    </InfiniteScroll>
  );
};

export default ScrollPagination