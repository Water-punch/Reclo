import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../../styles/TestCompo.module.css";
import { Stack } from '@mui/material'
import * as Api from '../../../api/api'
import { useEffect, useState } from "react";

// "https://source.unsplash.com/random"

function TestCompo() {
  const [trendItem, setTrendItem] = useState([])

  const getTrendItem = async () => {
    try {
      const res = await Api.get('items/likedMost')
      setTrendItem(res.data.likedMost)
    } catch {
      console.log('트렌드 아이템 요청에 실패했습니다.')
    }
  } 

  useEffect(() => {
    getTrendItem()
  }, [])

  const chunkSize = 4
  const dividedItems = []
  for (let i = 0; i < trendItem.length; i += chunkSize) {
    dividedItems.push(trendItem.slice(i, i + chunkSize));
  }

  return (
    <>
      <div className={styles.container}>
        <Carousel>
          {trendItem.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <Stack direction='row'>
                  <Stack direction='column'>
                    <div className={styles.wrapper}>
                      {item[0]?.itemsImgUrl[0] && (<img
                        src={item[0].itemsImgUrl[0]}
                        alt="img"
                        className={styles.slideImg}
                      />)}
                      <div className={styles.contents}>
                        <h2 className={styles.contentTitle}>{item[0].title}</h2>
                        <p className={styles.contentDescription}>{item[0].contents}</p>
                        <div className={styles.innerContents}>
                          <p className={styles.countInfo}>❤ {item[0].like}</p>
                        </div>
                      </div>
                    </div>
                  </Stack>
                  <Stack direction='column'>
                    <div className={styles.wrapper}>
                      {item[1]?.itemsImgUrl[0] && (<img
                        src={item[1].itemsImgUrl[0]}
                        alt="img"
                        className={styles.slideImg}
                      />)}
                      <div className={styles.contents}>
                        <h2 className={styles.contentTitle}>{item[1].title}</h2>
                        <p className={styles.contentDescription}>{item[1].contents}</p>
                        <div className={styles.innerContents}>
                          <p className={styles.countInfo}>❤ {item[1].like}</p>
                        </div>
                      </div>
                    </div>
                  </Stack>
                  <Stack direction='column'>
                    <div className={styles.wrapper}>
                      {item[2]?.itemsImgUrl[0] && (<img
                        src={item[0].itemsImgUrl[0]}
                        alt="img"
                        className={styles.slideImg}
                      />)}
                      <div className={styles.contents}>
                        <h2 className={styles.contentTitle}>{item[2].title}</h2>
                        <p className={styles.contentDescription}>{item[2].contents}</p>
                        <div className={styles.innerContents}>
                          <p className={styles.countInfo}>❤ {item[2].like}</p>
                        </div>
                      </div>
                    </div>
                  </Stack>
                  <Stack direction='column'>
                    <div className={styles.wrapper}>
                      {item[3]?.itemsImgUrl[0] && (<img
                        src={item[0].itemsImgUrl[0]}
                        alt="img"
                        className={styles.slideImg}
                      />)}
                      <div className={styles.contents}>
                        <h2 className={styles.contentTitle}>{item[3].title}</h2>
                        <p className={styles.contentDescription}>{item[3].contents}</p>
                        <div className={styles.innerContents}>
                          <p className={styles.countInfo}>❤ {item[3].like}</p>
                        </div>
                      </div>
                    </div>
                  </Stack>
                </Stack>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default TestCompo;
