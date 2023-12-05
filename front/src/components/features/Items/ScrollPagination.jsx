import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Api from '../../../api/api'
import Contents from './Contents';

const ScrollPagination = () => {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [itemCursor, setItemCursor] = useState(null)

  useEffect(() => {
    //초기 아이템 로딩
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const limit = 12 //페이지당 아이템 수
      const res = await Api.get(`/items?itemCursor=${itemCursor}&limit=${limit}`)
      const data = await res.json()

      if (data.length === 0) {
        setHasMore(false); //데이터 없으면 무한 스크롤 종료
      } else {
        setItems([...items, ...data]);
        setItemCursor(data[data.length - 1].cursor); // 다음 페이지를 위해 cursor 업데이트
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