import { useNavigate } from "react-router-dom";
import "../../../styles/MyPage.css";
import Point from "../../features/Items/Pointform";

const MyPage = () => {
  const navigate = useNavigate();

  function Userinfo() {
    return (
      <div className="userinfoContainer">
        <div className="mypage">
          <h1>My Page</h1>
          <div className="contentContainer">
            <div className="profile"></div>
            <div className="pointContainer">
              <Point></Point>
            </div>
          </div>
          <div className="userbox">
            <div className="userInfo">
              <p>이메일</p>
              <input className="email"></input>
              <p>주소</p>
              <input className="address"></input>
              <button className="change" onClick={() => navigate("/point")}>
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Userinfo />
    </>
  );
};

export default MyPage;
