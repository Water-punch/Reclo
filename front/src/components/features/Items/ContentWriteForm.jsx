import React from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useBoundStore }  from '../../../stores/boundStore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import '../../../styles/contents.css'



const ContentWriteForm = () => {

  const { name, setName, title, setTitle, price, setPrice, content, setContent, category, setCategory, liked, setLiked, share, setShare, tag, setTag } = useBoundStore()

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
    // ImageResize: { modules: ['Resize'] },
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const handleSubmit = async () => {
    try {
      alert('게시글 업로드')
    } catch {
        console.log(`게시글 등록에 실패했습니다.`)
    }
  }

  const checkHandler = () => {
    setShare()
    setPrice(0)
    console.log(`(share, price) : ${share, price}`)
  }

  return (
    <div className="addBox">
      <Box sx={{
        bgcolor: '#fff',
        boxShadow: 1,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '80%',
        },
      }}>
          <TextField onChange={setTitle}
              id="standard-basic" label="제목" 
              sx={{ width: '50%' }} variant="standard" />
          <Checkbox
            {...label}
            onClick={checkHandler}>
              나눔 여부
          </Checkbox> 
          <Stack spacing={'20%'} direction="row">
            <TextField onChange={setName}
              id="standard-basic" label="상품명" 
              sx={{ width: '40%' }}
              variant="standard" />
            <TextField onChange={setPrice}
              id="standard-basic" label="가격(숫자를 입력하세요: ₩)" 
              sx={{ width: '20%' }}
              variant="standard" />
          </Stack>

          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            onChange={setContent}
            style={{width: '82%', height: '60vh', marginBottom: '5vh', marginTop: '2.5vh'}}
          />

          <TextField onChange={setTag}
            id="standard-basic" label="태그"
            sx={{ marginBottom: '5vh' }}
            variant="standard" /> 
          
          <Button variant="contained"
              color="success" size='small'
              onClick={handleSubmit}>
              등록
          </Button>
      </Box>
    
    </div>  
  )
}

export default ContentWriteForm