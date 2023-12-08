// import "bootstrap/dist/css/bootstrap.min.css";
// import Carousel from "react-bootstrap/Carousel";
// import styles from "../../../styles/TestCompo.module.css";
// import { Stack } from '@mui/material'
// import * as Api from '../../../api/api'
// import { useEffect, useState } from "react";

// // "https://source.unsplash.com/random"

// function TestCompo() {
//   const [trendItem, setTrendItem] = useState([])

//   const getTrendItem = async () => {
//     try {
//       const res = await Api.get('items/likedMost')
//       setTrendItem(res.data.likedMost)
//     } catch {
//       console.log('트렌드 아이템 요청에 실패했습니다.')
//     }
//   } 

//   useEffect(() => {
//     getTrendItem()
//   }, [])

//   const chunkSize = 4
//   const dividedItems = []
//   for (let i = 0; i < trendItem.length; i += chunkSize) {
//     dividedItems.push(trendItem.slice(i, i + chunkSize));
//   }

//   return (
//     <>
//       <div className={styles.container}>
//         <Carousel>
//           {trendItem.map((item, index) => {
//             return (
//               <Carousel.Item key={index}>
//                 <Stack direction='row'>
//                   <Stack direction='column'>
//                     <div className={styles.wrapper}>
//                       <img
//                         src={item[0].item}
//                         alt="img"
//                         className={styles.slideImg}
//                       />
//                       <div className={styles.contents}>
//                         <h2 className={styles.contentTitle}>{item.title}</h2>
//                         <p className={styles.contentDescription}>{item.contents}</p>
//                         <div className={styles.innerContents}>
//                           <p className={styles.countInfo}>❤ {item.like}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Stack>
//                 </Stack>
                
                
//               </Carousel.Item>
//             );
//           })}
//         </Carousel>
//       </div>
//     </>
//   );
// }

// export default TestCompo;
