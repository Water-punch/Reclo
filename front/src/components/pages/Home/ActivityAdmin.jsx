import { Button, Box, Grid } from '@mui/material';
import useUserStore from '../../../stores/user';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import * as Api from '../../../api/api';
import ContentsCard from '../../features/Items/ContentsCard'

// 여기서 게시글 & 거래 신청 관리
const ActivityAdmin = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [items, setItems] = useState();
  const [singleItem, setSingleItem] = useState()

  console.log(user._id);

  const loadUserActivity = async () => {
    try {
      const res = await Api.get2(`items/user`);
      console.log(res.data.userItems);
      setItems(res.data.userItems);
    } catch (error) {
      console.log('유저 활동내역 로딩실패');
    }
  };

  const deleteItem = async (itemId) => {
    try { 
      const res = await Api.del(`item/${itemId}`)
        console.log('API 호출 결과:', res)
      alert('게시글이 삭제되었습니다.')
    } catch (err) {
      alert('게시글 삭제에 실패했습니다.')
    }
  }

  useEffect(() => {
    loadUserActivity();
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          navigate('/write', { state: { edit: false } });
        }}
      >
        물품 등록
      </Button>
      <Button
        onClick={() => {
          navigate('/chatlist');
        }}
      >
        ✉채팅리스트 
      </Button>
      <Grid container spacing={2}>
        { items &&
        items.map((item, idx) => ( // 테스트용임
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={idx}>
            <Box key={idx} >
              <ContentsCard
              mt={2} 
              item={item}
              />
              <Button 
                variant="outlined" 
                color="success"
                onClick={() => navigate('/write', { state: { edit: true, item: item } })}>
                  수정
              </Button>
              <Button 
                variant="outlined" 
                color="success"
                onClick={() => {deleteItem(item._id)}}>
                  삭제
              </Button>
            </Box>
          </Grid>
          ))
        }
      </Grid> 
    </div>
  );
};

export default ActivityAdmin;
