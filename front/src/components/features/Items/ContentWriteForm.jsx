import React, { useState } from "react"
import ReactQuill, {Quill} from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Box, Button, Stack, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import '../../../styles/contents.css'
import * as Api from '../../../api/api'
import { useMutation } from "@tanstack/react-query"

const ContentWriteForm = ({ userId }) => {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [state, setState] = useState('거래가능')
  const [category1, setCategory1] = useState('')
  const [category2, setCategory2] = useState('')
  const [category3, setCategory3] = useState('')
  const [category, setCategory] = useState([])

  const postMutation = useMutation({
    mutationFn: (data) => {
      return Api.post(`item/${userId}`, data)
    }
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
      try{
        postMutation.mutate({ userId, title, name, price, description, category, state, tag })
        alert('게시글이 업로드되었습니다.')
      } catch (err) {
        alert(`게시글 등록에 실패했습니다.\n 필수항목을 채워주세요.`)
        }
      } 
      
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await Api.post(`item/${userId}`, {
  //         userId,
  //         title,
  //         name,
  //         price,
  //         description,
  //         category,
  //         state,
  //         tag,
  //       })

  //     console.log(`category: ${category}`)
  //     alert('게시글이 업로드되었습니다.')
  //   } catch {
  //       alert(`게시글 등록에 실패했습니다.\n 필수항목을 채워주세요.`)
  //   }
  // }

  return (
    <div className="addBox">
      <Box
        onSubmit={handleSubmit} 
        sx={{
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
            id="title" label="제목" 
            sx={{ width: '100%' }} variant="standard" />
          {/* <FormControl sx={{ minWidth: '20%'}}>
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
                  <MenuItem id='share' value={true}>나눔</MenuItem>
                  <MenuItem id='sell' value={false}>판매</MenuItem>
                </Select>
              </FormControl> */}
        </Stack>
        
        <Box>   
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
              setCategory(e.target.value)
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
                setCategory(e.target.value)
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
                setCategory(e.target.value)
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
                  setCategory(e.target.value)
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
                  setCategory(e.target.value)
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
                setCategory(e.target.value)
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
                  setCategory(e.target.value)
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
                  setCategory(e.target.value)
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
    </Box>
      
          <Stack spacing={'20%'} direction="row">
            <TextField 
              value={name}
              onChange={e=>setName(e.target.value)}
              id='name' label="상품명" 
              sx={{ width: '40%' }}
              variant="standard" />
            <TextField onChange={e=>setPrice(e)}
              id="price" label="가격(숫자를 입력하세요: ₩)" 
              sx={{ width: '20%' }}
              variant="standard" />
          </Stack>

          <ReactQuill
            theme='snow'
            modules={modules}
            formats={formats}
            value={description}
            onChange={text=>setDescription(text)}
            style={{width: '82%', height: '60vh', marginBottom: '5vh', marginTop: '2.5vh'}}
          />

          <TextField
            value={tag} 
            onChange={e=>setTag(e.target.value)}
            id="tag" label="태그"
            sx={{ marginBottom: '5vh' }}
            variant="standard" /> 
          
          <Button 
            variant="contained"
            color="success" size='small'
            type='submit'>
              등록
          </Button>
      </Box>
    </div>  
  )
}

export default ContentWriteForm