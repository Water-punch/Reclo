import { Grid } from "@mui/material"
import ContentsCard from "./ContentsCard"

 const Contents = ({ items }) => {
    console.log('출력할 items..' ,items)
    return (
        <Grid container spacing={1} mx={1} my={5} >
          {items != [] ?
          (items.map((item) => ( // 테스트용임
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <ContentsCard
                my={2} 
                item={item}
              />
            </Grid> 
          ))) : <h3> 존재하는 상품이 없네요. 첫 등록의 주인공이 되어보세요! </h3>
        }
        </Grid>
    )
}

export default Contents