import React, { useState } from "react"
import ReactQuill, {Quill} from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Box, Button, Stack, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import '../../../styles/contents.css'
import * as Api from '../../../api/api'
import { useMutation } from "@tanstack/react-query"

const ContentEditForm = ({item}) => {
  
  const [title, setTitle] = useState(item.title)
  const [price, setPrice] = useState(item.price)
  const [description, setDescription] = useState(item.description)
  const [state, setState] = useState(item.state)
  const [category1, setCategory1] = useState(item.category[0])
  const [category2, setCategory2] = useState(item.category[1])
  const [category3, setCategory3] = useState(item.category[2])
  const [category, setCategory] = useState(item.category)
  const itemId = item._id
  
  const editMutation = useMutation({
    mutationFn: async (data) => {
      try {
        const result = await Api.put(`item/${itemId}`, data);
        console.log('API 호출 결과:', result);  // 콘솔에 결과를 출력해봅니다.
        return result;
      } catch (error) {
        console.error('API 호출 중 오류:', error);  // 오류 발생 시 콘솔에 출력합니다.
        throw error;  // 오류를 다시 throw하여 상위 수준에서도 처리할 수 있도록 합니다.
      }
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      editMutation.mutate({ userId: item.userId, title, price, description, category, state })
      alert('게시글이 업로드되었습니다.')
    } catch (err) {
      alert(`게시글 등록에 실패했습니다. 모든 항목을 채워주세요.`)
      }
    } 

  //  const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const res = await Api.put(`item/${itemId}`, {
  //         userId : item.userId,
  //         title,
  //         price,
  //         description,
  //         category,
  //         state,
  //       })
  //     alert('게시글이 업로드되었습니다.')
  //   } catch {
  //       alert(`게시글 등록에 실패했습니다.\n 필수항목을 채워주세요.`)
  //   }
  // }

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

    return (
        <div className="addBox">
          <Box
            component='form'
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
              <TextField 
                value={title}
                onChange={e=> setTitle(e.target.value)}
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
                  setCategory(prev=> prev + e.target.value)
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
                    setCategory(prev=> prev + e.target.value)
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
                    setCategory(prev=> prev + e.target.value)
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
                      setCategory(prev=> prev + e.target.value)
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
                      setCategory(prev=> prev + e.target.value)
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
                    setCategory(prev=> prev + e.target.value)
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
                      setCategory(prev=> prev + e.target.value)
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
                      setCategory(prev=> prev + e.target.value)
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
                  value={price} 
                  onChange={e=>setPrice(e.target.value)}
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

export default ContentEditForm
