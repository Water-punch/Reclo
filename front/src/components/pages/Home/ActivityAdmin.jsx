import { Button } from "@mui/material"
import useUserStore from "../../../stores/user"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

// 여기서 게시글 & 거래 신청 관리
const ActivityAdmin = () => {
  const navigate = useNavigate()
  const { user } = useUserStore()

  const { isPending, error, data } = useQuery({ 
    queryKey: ['activitypage'], 
    queryFn: async () => {
      try {
        const res = await Api.get(`items/user/${user._id}`)
        console.log(res.data)
        return res.data
      } catch (error) {
        throw error
      }
    },
  })

  if (isPending) return 'Loading...'
  if (error) return '오류가 발생했습니다.' + error.message 

  const deleteMutation = useMutation({
    mutationFn: async (userId) => {
      try {
        const result = await Api.del(`item/${userId}`)
        console.log('API 호출 결과:', result)
        return result
      } catch (error) {
        console.error('API 호출 중 오류:', error)
      }
    }
  })

  return (
    <div>
      <Button 
        onClick={() => {navigate('/write', { state : { edit: false } })}}>
          물품 등록
      </Button>
      <Grid container spacing={2} mx={5} my={5} >
        {data.userItems.map((item) => ( // 테스트용임
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
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
              onClick={() => deleteMutation.mutate(item.userId)}>
              삭제
            </Button>
          </Grid> 
        ))}
      </Grid>
    </div>
  )
}

export default ActivityAdmin