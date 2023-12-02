import ContentWriteForm from "../../features/Items/ContentWriteForm"




const ContentsAddPage = () => {
  const handleSubmit = async () => {
    try {
      alert('게시글 업로드')
    } catch {
        console.log(`게시글 등록에 실패했습니다.`)
    }

  }



    return (
        <>
          <h1>ContentsAddPage</h1>
          <ContentWriteForm />
        </>
    )
}

export default ContentsAddPageimport ContentWriteForm from "../../features/Items/ContentWriteForm"

const ContentsAddPage = () => {
  
    return (
        <>
          <h1>ContentsAddPage</h1>
          <ContentWriteForm />
        </>
    )
}

export default ContentsAddPage