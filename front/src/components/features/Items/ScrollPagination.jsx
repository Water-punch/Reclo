import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Api from '../../../api/api'
import Contents from './Contents';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ScrollPagination = () => {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [itemCursor, setItemCursor] = useState('')
  const [cursorSave, setCursorSave] = useState('')
  const limit = 4 //페이지당 아이템 수
  // const navigate = useNavigate()

  console.log('scrollPagination 실행')

  useEffect(() => {
    //초기 아이템 로딩
    searchParams.set('limit', limit)
    loadItems();
  }, []);

  const loadItems = async () => {
    console.log('(itemCursor) = ', itemCursor)
    try {

      let apiUrl = `items?limit=${limit}`;

      if (itemCursor) {
        apiUrl += `&itemCursor=${itemCursor}`;
      }

      const res = await Api.get(apiUrl)
      const data = res.data
      console.log('scrollPagination 데이터로딩 실행', data)

      if (data.length === 0) {
        setHasMore(false); //데이터 없으면 무한 스크롤 종료
      } else {
        setItems(prev => [...prev, ...data.items]);
        setItemCursor(data.cursor)
        // setCursorSave(prev => [...prev, itemCursor])
        searchParams.set('itemCursor', data.cursor); // 다음 페이지를 위해 cursor 업데이트
        // navigate(`?itemCursor=${data.cursor}`, {replace : true})
      }
    } catch (error) {
      console.error('아이템 로딩 실패:', error);
    }
  };

  const fetchMoreData = () => {
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
      loader={<h4>Loading...</h4>}
      // scrollableTarget='scrollableDiv'
      // scrollToTop={scrollToTop}
    >
      <Contents items={items}/>
    </InfiniteScroll>
  );
};

export default ScrollPagination