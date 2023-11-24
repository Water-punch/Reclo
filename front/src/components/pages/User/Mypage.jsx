import { useNavigate } from "react-router-dom";
import styles from "./Mypage.module.css";

const MyPage = () => {
  const navigate = useNavigate();

  function Tap() {
    return (
      <div className={styles.buttoncontainer}>
        <button className={styles.service}>서비스소개</button>
        <button className={styles.wish} onClick={() => navigate("/wishlist")}>
          거래하기
        </button>
        <button className={styles.some} onClick={() => navigate("/some-route")}>
          나눔
        </button>
        <button className={styles.event} onClick={() => navigate("/event")}>
          이벤트
        </button>
      </div>
    );
  }

  function Userinfocomponents() {
    return (
      <div className={styles.userinfoContainer}>
        <div className={styles.mypage}>
          <h1>My Page</h1>
          <div className={styles.contentContainer}>
            <div className={styles.profile}></div>
            <div className={styles.pointContainer}>
              <Point></Point>
            </div>
          </div>
          <div className={styles.userbox}>
            <div className={styles.userInfo}>
              <p>이메일</p>
              <input className={styles.email}></input>
              <p>주소</p>
              <input className={styles.address}></input>
              <button
                className={styles.change}
                onClick={() => navigate("/point")}
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
      <div className={styles.pointbox}>
        <div>포인트 IMAGE</div>
        <div>레벨 IMAGE</div>
        <div>포인트 IMAGE</div>
      </div>
    );
  }

  return (
    <>
      <Tap />
      <Userinfocomponents />
    </>
  );
};

export default MyPage;
