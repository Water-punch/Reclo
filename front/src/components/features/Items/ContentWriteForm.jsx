import React, { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Box, Button, Stack, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import '../../../styles/contents.css'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import * as Api from '../../../api/api'
import { useBoundStore } from "../../../stores/boundStore"
import { Category } from "@mui/icons-material"

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
  const { categorySave, setCategorySave } = useBoundStore


  const mutation = useMutation({
    mutationFn: Api.post(`/items/${userId}`) 
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      mutation.mutate({
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
        
        <Category />
        <Stack spacing={'3%'} direction="row">
          <FormControl sx={{ minWidth: '30%' }}>
            <InputLabel id="demo-simple-select-autowidth-label">분류: 성별</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={category1}
              label="성별"
              onChange={e => {
                setCategory1(e.target.value)
                setCategorySave(category1)
              }}
            >
              <MenuItem value={'남성'}>남성</MenuItem>
              <MenuItem value={'여성'}>여성</MenuItem>
            </Select>
          </FormControl>

          {category1 && (
            <FormControl sx={{ minWidth: '30%' }}>
              <InputLabel id="demo-simple-select-autowidth-label">분류1</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={category2}
                label="분류1"
                onChange={e => {
                  setCategory2(e.target.value)
                  setCategorySave(category2)
                }}
              >
                <MenuItem value={'상의'}>상의</MenuItem>
                <MenuItem value={'하의'}>하의</MenuItem>
                <MenuItem value={'아우터'}>아우터</MenuItem>
              </Select>
            </FormControl>)}

          {category2 && category1 == '여성' && (category2 == '상의' ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={category3}
                label="분류2"
                onChange={e => {
                  setCategory3(e.target.value)
                  setCategorySave(category3)
                }}
              >
                <MenuItem value={'티셔츠'}>티셔츠</MenuItem>
                <MenuItem value={'맨투맨'}>맨투맨</MenuItem>
                <MenuItem value={'셔츠'}>셔츠</MenuItem>
                <MenuItem value={'니트'}>니트</MenuItem>
                <MenuItem value={'원피스'}>원피스</MenuItem>
              </Select>
            </FormControl>
            ) : category2 == '하의' ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={category3}
                  label="분류2"
                  onChange={e => {
                    setCategory3(e.target.value)
                    setCategorySave(category3)
                  }}
                >
                  <MenuItem value={'치마'}>치마</MenuItem>
                  <MenuItem value={'데님'}>데님</MenuItem>
                  <MenuItem value={'반바지'}>반바지</MenuItem>
                  <MenuItem value={'슬랙스'}>슬랙스</MenuItem>
                  <MenuItem value={'면바지'}>면바지</MenuItem>
                  <MenuItem value={'트레이닝'}>트레이닝</MenuItem>
                </Select>
              </FormControl>
              ) : (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={category3}
                  label="분류2"
                  onChange={e => {
                    setCategory3(e.target.value)
                    setCategorySave(category3)
                  }}
                >
                  <MenuItem value={'자켓'}>자켓</MenuItem>
                  <MenuItem value={'패딩'}>패딩</MenuItem>
                  <MenuItem value={'코트'}>코트</MenuItem>
                  <MenuItem value={'점퍼'}>점퍼</MenuItem>
                  <MenuItem value={'정장'}>정장</MenuItem>
                </Select>
              </FormControl>
              ))}

          {category1 == '남성' && (category2 == '상의' ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={category3}
                label="분류2"
                onChange={e => {
                  setCategory3(e.target.value)
                  setCategorySave(category3)
                }}
              >
                <MenuItem value={'티셔츠'}>티셔츠</MenuItem>
                <MenuItem value={'맨투맨'}>맨투맨</MenuItem>
                <MenuItem value={'셔츠'}>셔츠</MenuItem>
                <MenuItem value={'니트'}>니트</MenuItem>
              </Select>
            </FormControl>
            ) :
            category2 == '하의' ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={category3}
                  label="분류2"
                  onChange={e => {
                    setCategory3(e.target.value)
                    setCategorySave(category3)
                  }}
                >
                  <MenuItem value={'데님'}>데님</MenuItem>
                  <MenuItem value={'반바지'}>반바지</MenuItem>
                  <MenuItem value={'슬랙스'}>슬랙스</MenuItem>
                  <MenuItem value={'면바지'}>면바지</MenuItem>
                  <MenuItem value={'트레이닝'}>트레이닝</MenuItem>
                </Select>
              </FormControl>
              ) : (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={category3}
                  label="분류2"
                  onChange={e => {
                    setCategory3(e.target.value)
                    setCategorySave(category3)
                  }}
                >
                  <MenuItem value={'자켓'}>자켓</MenuItem>
                  <MenuItem value={'패딩'}>패딩</MenuItem>
                  <MenuItem value={'코트'}>코트</MenuItem>
                  <MenuItem value={'점퍼'}>점퍼</MenuItem>
                  <MenuItem value={'정장'}>정장</MenuItem>
                </Select>
              </FormControl>))}
          </Stack>
      
          <Stack spacing={'20%'} direction="row">
            <TextField onChange={e=>setName(e)}
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

          <TextField onChange={e=>setTag()}
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