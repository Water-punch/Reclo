import { useNavigate } from "react-router-dom";
import "../../../styles/MyPage.css";
import useUserStore from "../../../stores/user";
import { useQuery } from "@tanstack/react-query";

const MyPage = () => {
  const navigate = useNavigate()
  const { isPending, error, data } = useQuery({ 
    queryKey: ['mypage'], 
    queryFn: async () => {
      try {
        const res = await Api.get('user/current')
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
    <div>
      <UserInfo user={data.user} />
    </div>
  );
};

export default MyPage;
