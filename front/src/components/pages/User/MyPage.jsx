import { useNavigate } from "react-router-dom";
import "../../../styles/MyPage.css";
import useUserStore from "../../../stores/user";

const MyPage = () => {
  const navigate = useNavigate()
  const { login, user } = useUserStore()

  return (
    <div>
      <UserInfo user={user}>

      </UserInfo>
    </div>
  );
};

export default MyPage;
