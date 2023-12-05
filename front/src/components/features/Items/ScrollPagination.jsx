import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Api from '../../../api/api'
import Contents from './Contents';
import { useSearchParams } from 'react-router-dom';

const ScrollPagination = () => {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [itemCursor, setItemCursor] = useState('')
  const limit = 1 //페이지당 아이템 수

  console.log('scrollPagination 실행')

  useEffect(() => {
    //초기 아이템 로딩
    searchParams.set('limit', limit)
    loadItems();
  }, []);

  const loadItems = async () => {
    console.log('(itemCursor) = ', itemCursor)
    try {
      const res = await Api.get(`items?itemCursor=${itemCursor}&limit=${limit}`)
      const data = res.data
      console.log('scrollPagination 데이터로딩 실행', data)

      if (data.length === 0) {
        setHasMore(false); //데이터 없으면 무한 스크롤 종료
      } else {
        setItems(data.items);
        setItemCursor(data.cursor)
        searchParams.set('itemCursor', itemCursor); // 다음 페이지를 위해 cursor 업데이트
      }
    } catch (error) {
      console.error('아이템 로딩 실패:', error);
    }
  };

  const fetchMoreData = () => {
    loadItems();
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <Contents items={items}/>
    </InfiniteScroll>
  );
};

export default ScrollPagination