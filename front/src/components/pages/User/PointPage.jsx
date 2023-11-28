import { useNavigate } from "react-router-dom";
import "../../../styles/Mypage.css"

const MyPage = () => {
  const navigate = useNavigate();
  
  function Userinfocomponents() {
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
              <button
                className="change"
                onClick={() => navigate("/mypage")}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Point() {
    return (
      <div className="pointbox">
        <div>포인트 IMAGE</div>
        <div>레벨 IMAGE</div>
        <div>포인트 IMAGE</div>
      </div>
    );
  }

  return (
    <>
      <Userinfocomponents />
    </>
  );
};

export default MyPage;
