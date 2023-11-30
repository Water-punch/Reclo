import { useNavigate } from "react-router-dom";
import "../../../styles/MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  // function Tap() {
  //   return (
  //     <div className={buttoncontainer}>
  //       <button className={service}>서비스소개</button>
  //       <button className={wish} onClick={() => navigate("/wishlist")}>
  //         거래하기
  //       </button>
  //       <button className={some} onClick={() => navigate("/some-route")}>
  //         나눔
  //       </button>
  //       <button className={event} onClick={() => navigate("/event")}>
  //         이벤트
  //       </button>
  //     </div>
  //   );
  // }

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
              <button className="change" onClick={() => navigate("/mypage")}>
                확인
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
      {/* <Tap /> */}
      <Userinfocomponents />
    </>
  );
};

export default MyPage;
