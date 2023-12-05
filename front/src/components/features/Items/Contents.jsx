import { Grid } from "@mui/material"
import ContentsCard from "./ContentsCard"

 const Contents = ({items}) => {
    console.log(items)
    return (
        <Grid container spacing={2} mx={5} my={5} >
          {items.map((item) => ( // 테스트용임
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <ContentsCard
                my={2} 
                item={item}
              />
            </Grid> 
          ))}
        </Grid>
    )
}

export default Contents