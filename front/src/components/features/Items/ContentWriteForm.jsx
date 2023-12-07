import React, { useState } from "react"
import ReactQuill, {Quill} from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Box, Button, Stack, TextField, InputLabel, MenuItem, FormControl, Select, ImageList, ImageListItem } from '@mui/material'
import '../../../styles/contents.css'
import * as Api from '../../../api/api'
import useUserStore from "../../../stores/user"
import { useNavigate } from "react-router-dom"


const ContentWriteForm = ( {userId} ) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [state, setState] = useState('거래 가능')
  const [categories, setCategories] = useState({1: '', 2: '', 3: ''})
  const [category, setCategory] = useState('')
  const [preUrl, setPreUrl] = useState('')
  const [itemsImgUrl, setitemsImgUrl] = useState([])
  const [imgSrc, setImgSrc] = useState([])
  const [file, setFile] = useState('')
  const navigate = useNavigate()

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
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
      await hadleImgToS3(file)
      await handleImgResult(file.name)
      await Api.post(`item/${userId}`, { 
        itemInfo : { 
          userId: userId,
          title: title, 
          price: Number(price), 
          description: description, 
          category: categories[1] + categories[2] + categories[3], 
          state: state, 
          itemsImgUrl: itemsImgUrl }})
          
      alert('게시글이 업로드되었습니다.')

      navigate('/activity')
    } catch (err) {
      alert(`게시글 등록에 실패했습니다.\n 필수항목을 채워주세요.`)
      }
  } 

  const handlePresigned = async (fileName) => {
    try{
      const res = await Api.put(`itemURL/${fileName}`)
      console.log('PresignedURL을 받아왔습니다.', res.data.presignedUrl )
      setPreUrl(res.data.presignedUrl)
    } catch (err) {
      alert(`[presignedUrl 오류]`)
      }
  }

  const handleImgResult = async (fileName) => {

    try{
      const res = await Api.post(`itemImage/${fileName}`,{})
      console.log('handleImgResult성공', res)

    } catch (err) {
      console.log(`handleImgResult 실패`)
      }
  }

  const hadleImgToS3 = async () => {

    try {
      const res = await Api.postImg(preUrl, file)
      console.log(res)
      console.log(res.data)
      console.log(res.data.imagePath)
      setitemsImgUrl(prev => [...prev, res.data.imagePath])

    } catch {
      alert('이미지 등록에 실패했습니다. S3업로드')
      }
  }

  const imgPreview = (e) => {
    const files = e.target.files
    const fileName = files.name
    const imageSrcArray = []
    setFile(files)
    console.log(files)
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
  
      reader.onload = (event) => {
        imageSrcArray.push(event.target.result)
        setImgSrc([...imageSrcArray])
      }
  
      reader.readAsDataURL(file)
      handlePresigned(fileName)
    }
  }
  

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

        <Box>
          <Stack>
            <input 
              multiple type="file" 
              accept="image/*"
              onChange={imgPreview}
            />
            <ImageList 
              cols={3} rowHeight={164}
            >
              {imgSrc.map((url, idx) => (
                <ImageListItem key={idx}>
                  <img
                    src={url}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </Box>

        <Stack spacing={'10%'} direction="row">
          <TextField 
            value={title}
            onChange={e=> setTitle(e.target.value)}
            id="title" label="제목" 
            sx={{ width: '100%' }} variant="standard" />
        </Stack>
        
        <Box>   
        <Stack spacing={'3%'} direction="row">
        <FormControl sx={{ minWidth: '30%' }}>
          <InputLabel id="demo-simple-select-autowidth-label">분류: 성별</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={categories[1]}
            label="성별"
            onChange={e => {
              setCategories(prev => 
                ({
                  ...prev,
                  1: e.target.value 
                }))
            }}
          >
            <MenuItem value={'남성'}>남성</MenuItem>
            <MenuItem value={'여성'}>여성</MenuItem>
          </Select>
        </FormControl>

        {categories[1] && (
          <FormControl sx={{ minWidth: '30%' }}>
            <InputLabel id="demo-simple-select-autowidth-label">분류1</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={categories[2]}
              label="분류1"
              onChange={e => {
                setCategories(prev => 
                  ({
                    ...prev,
                    2: e.target.value 
                  }))
              }}
            >
              <MenuItem value={'상의'}>상의</MenuItem>
              <MenuItem value={'하의'}>하의</MenuItem>
              <MenuItem value={'아우터'}>아우터</MenuItem>
            </Select>
          </FormControl>)}

        {categories[2] && categories[1] == '여성' && (categories[2] == '상의' ? (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={categories[3]}
              label="분류2"
              onChange={e => {
                setCategories(prev => 
                  ({
                    ...prev,
                    3: e.target.value 
                  }))
              }}
            >
              <MenuItem value={'티셔츠'}>티셔츠</MenuItem>
              <MenuItem value={'맨투맨'}>맨투맨</MenuItem>
              <MenuItem value={'셔츠'}>셔츠</MenuItem>
              <MenuItem value={'니트'}>니트</MenuItem>
              <MenuItem value={'후드'}>후드</MenuItem>
              <MenuItem value={'원피스'}>원피스</MenuItem>
            </Select>
          </FormControl>
          ) : categories[2] == '하의' ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={categories[3]}
                label="분류2"
                onChange={e => {
                  setCategories(prev => 
                    ({
                      ...prev,
                      3: e.target.value 
                    }))
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
                value={categories[3]}
                label="분류2"
                onChange={e => {
                  setCategories(prev => 
                    ({
                      ...prev,
                      3: e.target.value 
                    }))
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

        {categories[1] == '남성' && (categories[2] == '상의' ? (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={categories[3]}
              label="분류2"
              onChange={e => {
                setCategories(prev => 
                  ({
                    ...prev,
                    3: e.target.value 
                  }))
              }}
            >
              <MenuItem value={'티셔츠'}>티셔츠</MenuItem>
              <MenuItem value={'맨투맨'}>맨투맨</MenuItem>
              <MenuItem value={'후드'}>후드</MenuItem>
              <MenuItem value={'셔츠'}>셔츠</MenuItem>
              <MenuItem value={'니트'}>니트</MenuItem>
            </Select>
          </FormControl>
          ) :
          categories[2] == '하의' ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">분류2</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={categories[3]}
                label="분류2"
                onChange={e => {
                  setCategories(prev => 
                    ({
                      ...prev,
                      3: e.target.value 
                    }))
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
                value={categories[3]}
                label="분류2"
                onChange={e => {
                  setCategories(prev => 
                    ({
                      ...prev,
                      3: e.target.value 
                    }))
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

export default ContentWriteForm