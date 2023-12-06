import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/MyPage.css";
import useUserStore from "../../../stores/user";
import { useQuery } from "@tanstack/react-query";
import UserInfo from "../../features/User/UserInfo";

const MyPage = () => {
  const navigate = useNavigate()
  // const { isPending, error, data } = useQuery({ 
  //   queryKey: ['mypage'], 
  //   queryFn: async () => {
  //     try {
  //       const res = await Api.get('user/current')
  //       return res.data
  //     } catch (error) {
  //       throw error
  //     }
  //   },
  // })

  // if (isPending) return 'Loading...'
  // if (error) return '오류가 발생했습니다.' + error.message

  const location = useLocation()
  const userInfo = location.state.user //user안에 user가 객체로 담겨있음
  console.log(location)

  return (
    <div>
      <UserInfo user={userInfo} />

    </div>
  );
};

export default MyPage;
