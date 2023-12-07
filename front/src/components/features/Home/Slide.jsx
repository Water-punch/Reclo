import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../../styles/TestCompo.module.css";

function TestCompo() {
  const data = [
    {
      title: "게시글 제목",
      contents: "내용",
      time: "1시간 전",
      like: 18,
      comments: 7,
    },
    {
      title: "게시글 제목2",
      contents: "내용2",
      time: "1시간 전",
      like: 1,
      comments: 1,
    },
    {
      title: "게시글 제목3",
      contents: "내용3",
      time: "1시간 전",
      like: 11,
      comments: 5,
    },
    {
      title: "게시글 제목4",
      contents: "내용4",
      time: "1시간 전",
      like: 28,
      comments: 9,
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <Carousel>
          {data.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <div className={styles.wrapper}>
                  <img
                    src="https://source.unsplash.com/random"
                    alt="img"
                    className={styles.slideImg}
                  />
                  <div className={styles.contents}>
                    <h2 className={styles.contentTitle}>{item.title}</h2>
                    <p className={styles.contentDescription}>{item.contents}</p>
                    <div className={styles.innerContents}>
                      <p className={styles.countInfo}>❤ {item.like}</p>
                      <p className={styles.countInfo}>📢 {item.comments}</p>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default TestCompo;
