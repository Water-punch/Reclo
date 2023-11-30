import React, { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Box, Button, Stack, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import '../../../styles/contents.css'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import * as Api from '../../../api/api'
import { useBoundStore } from "../../../stores/boundStore"
import CategorySelect from "./CategorySelect"

const ContentWriteForm = ({ userId }) => {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [content, setContent] = useState('')
  const [share, setShare] = useState(false)
  const [tag, setTag] = useState('')
  const [tradeState, setTradeState] = useState('거래가능')
  const [category1, setCategory1] = useState('')
  const [category2, setCategory2] = useState('')
  const [category3, setCategory3] = useState('')
  const { categorySave, setCategorySave }  = useBoundStore

  const postMutation = useMutation({
    mutationFn: (endpoint, data) => Api.post(endpoint, data) 
  })

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
    // ImageResize: { modules: ['Resize'] } 나중에 추가하자
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      postMutation.mutate(`/item/${userId}`, {
        userId,
        title,
        name,
        price,
        content,
        categorySave,
        share,
        tradeState,
        tag,
        time: setTime(new Date())
      })
      console.log(`categorySave: ${categorySave}`)
      alert('게시글이 업로드되었습니다.')
    } catch {
        alert(`게시글 등록에 실패했습니다.\n 필수항목을 채워주세요.`)
    }
  }

  return (
    <div className="addBox">
      <Box sx={{
        bgcolor: '#fff',
        boxShadow: 2,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '80%',
        },
      }}>
        <Stack spacing={'10%'} direction="row">
          <TextField onChange={setTitle}
            id="standard-basic" label="제목" 
            sx={{ width: '100%' }} variant="standard" />
          <FormControl sx={{ minWidth: '20%'}}>
            <InputLabel id="demo-simple-select-autowidth-label">나눔/판매</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={share}
              label="나눔/판매"
              onChange={e => {
                setShare(e.target.value)
              }}
            >
              <MenuItem value={true}>나눔</MenuItem>
              <MenuItem value={false}>판매</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <CategorySelect />
      
          <Stack spacing={'20%'} direction="row">
            <TextField onChange={e=>setName(e.target.value)}
              id="standard-basic" label="상품명" 
              sx={{ width: '40%' }}
              variant="standard" />
            {!share && <TextField onChange={e=>setPrice(e)}
              id="standard-basic" label="가격(숫자를 입력하세요: ₩)" 
              sx={{ width: '20%' }}
              variant="standard" />}
          </Stack>

          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            onChange={e=>setContent(e)}
            style={{width: '82%', height: '60vh', marginBottom: '5vh', marginTop: '2.5vh'}}
          />

          {/* 태그는 deletable Chip으로 구현하자 */}
          <TextField onChange={e=>setTag(e.target.value)}
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