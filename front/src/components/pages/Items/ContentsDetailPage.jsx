import { useLocation } from "react-router-dom"



const ContentsDetailPage = () => {
  const {
    state: { item : { itemId, name, title, price, content, like, share, tradeState, categorySave, tag } }
  } = useLocation



    return (
        <>
          <h1>ContentsDetailPage</h1>
        </>
    )
}

export default ContentsDetailPage