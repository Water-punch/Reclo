import { Button, Grid } from '@mui/material';
import useUserStore from '../../../stores/user';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import * as Api from '../../../api/api';

// 여기서 게시글 & 거래 신청 관리
const ActivityAdmin = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [items, setItems] = useState();

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

  const deleteItems = async () => {
    try {
      const result = await Api.del(`item/${user._id}`);
      console.log('API 호출 결과:', result);
    } catch (error) {
      console.error('삭제 실패', error);
    }
  };

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
      <Grid container spacing={2} mx={5} my={5}>
        {items &&
          items.map(
            (
              item // 테스트용임
            ) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <ContentsCard mt={2} item={item} />
                <Button
                  variant='outlined'
                  color='success'
                  onClick={() => navigate('/write', { state: { edit: true, item: item } })}
                >
                  수정
                </Button>
                <Button variant='outlined' color='success' onClick={deleteItems}>
                  삭제
                </Button>
              </Grid>
            )
          )}
      </Grid>
    </div>
  );
};

export default ActivityAdmin;
