import React, { useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Box, Button, Stack, TextField, InputLabel, MenuItem, FormControl, Select, ImageList, ImageListItem } from '@mui/material'
import '../../../styles/contents.css'
import * as Api from '../../../api/api'
import { useNavigate } from "react-router-dom"
import useUserStore from "../../../stores/user"

const ContentEditForm = ({item}) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState(item.title)
  const [price, setPrice] = useState(item.price)
  const [description, setDescription] = useState(item.description)
  const [state, setState] = useState(item.state)
  const [category, setCategory] = useState(item.category)
  const [categories, setCategories] = useState(() => {
    const categoryString = item.category || ''
    return {
      1: item.category.slice(0,2), 
      2: item.category.includes('상의') ? '상의' : item.category.includes('하의') ? '하의': '아우터', 
      3: item.category
        .replace('남성', '')
        .replace('여성', '')
        .replace('상의', '')
        .replace('하의', '')
        .replace('아우터', '')
    }
  }
 )
  const [imgUrl, setImgUrl] = useState(item.itemsImgUrl)
  const [imgSrc, setImgSrc] = useState(item.itemsImgUrl)
  const [file, setFile] = useState('')
  const itemId = item._id
  const { user } = useUserStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      if(file) {
        console.log(file)
        const presignedUrl = await handlePresigned(file.name)
        setImgUrl(await handleImgToS3(presignedUrl))
        console.log('preUrl로 post요청', presignedUrl)
      }

      await Api.put(`item/${itemId}`, {
        toUpdate : {
          userId: user._id, 
          title: title, 
          price: Number(price), 
          description: description, 
          category: categories[1] + categories[2] + categories[3],
          state: state, 
          itemsImgUrl: imgUrl,
        }
      })
      alert('게시글이 업로드되었습니다.')
      navigate(`/contents`)
    } catch (err) {
      alert(`게시글 등록에 실패했습니다. 관리자에게 문의하세요.`)
      console.log('게시글 수정 실패', err)
      }
    } 

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

  const handlePresigned = async (fileName) => {
    try {
      const res = await Api.put(`itemURL/${fileName}`);
      console.log('PresignedURL을 받아왔습니다.', res.data.presignedUrl);
      return res.data.presignedUrl;
    } catch (err) {
      alert(`[presignedUrl 오류]`);
    }
  };

  const handleImgToS3 = async (preUrl) => {
    //서버에서 받아온 Presigned url, 저장한 파일로 api 호출
    try {
      const res = await Api.postImg(preUrl, file)
      const resUrl = res.request.responseURL
      const imageUrlWithoutQuery = resUrl.split('?')[0]
      console.log(res)
      console.log(imageUrlWithoutQuery)
      // setitemsImgUrl((prev) => [...prev, resUrl])
      return imageUrlWithoutQuery
    } catch {
      alert('이미지 등록에 실패했습니다. S3업로드')
    }
  };

  const imgPreview = (e) => {
    const files = e.target.files;
    const fileName = files[0].name;
    const imageSrcArray = [];
    setFile(files[0]);
    console.log(files);
    console.log(files[0]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        imageSrcArray.push(event.target.result);
        setImgSrc([...imageSrcArray]);
      };

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='addBox'>
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
        }}
      >
        <Box>
          <Stack>
            <input type='file' accept='image/*' onChange={imgPreview} />
            <ImageList cols={3} rowHeight={164}>
              {imgSrc.map((url, idx) => (
                <ImageListItem key={idx}>
                  <img src={url} />
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </Box>

        <Stack spacing={'10%'} direction='row'>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id='title'
            label='제목'
            sx={{ width: '100%' }}
            variant='standard'
          />
        </Stack>

        <Box>
          <Stack spacing={'3%'} direction='row'>
            <FormControl sx={{ minWidth: '30%' }}>
              <InputLabel id='demo-simple-select-autowidth-label'>분류: 성별</InputLabel>
              <Select
                labelId='demo-simple-select-autowidth-label'
                id='demo-simple-select-autowidth'
                value={categories[1]}
                label='성별'
                onChange={(e) => {
                  setCategories((prev) => ({
                    ...prev,
                    1: e.target.value,
                  }));
                }}
              >
                <MenuItem value={'남성'}>남성</MenuItem>
                <MenuItem value={'여성'}>여성</MenuItem>
              </Select>
            </FormControl>

            {categories[1] && (
              <FormControl sx={{ minWidth: '30%' }}>
                <InputLabel id='demo-simple-select-autowidth-label'>분류1</InputLabel>
                <Select
                  labelId='demo-simple-select-autowidth-label'
                  id='demo-simple-select-autowidth'
                  value={categories[2]}
                  label='분류1'
                  onChange={(e) => {
                    setCategories((prev) => ({
                      ...prev,
                      2: e.target.value,
                    }));
                  }}
                >
                  <MenuItem value={'상의'}>상의</MenuItem>
                  <MenuItem value={'하의'}>하의</MenuItem>
                  <MenuItem value={'아우터'}>아우터</MenuItem>
                </Select>
              </FormControl>
            )}

            {categories[2] &&
              categories[1] == '여성' &&
              (categories[2] == '상의' ? (
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-autowidth-label'>분류2</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={categories[3]}
                    label='분류2'
                    onChange={(e) => {
                      setCategories((prev) => ({
                        ...prev,
                        3: e.target.value,
                      }));
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
                  <InputLabel id='demo-simple-select-autowidth-label'>분류2</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={categories[3]}
                    label='분류2'
                    onChange={(e) => {
                      setCategories((prev) => ({
                        ...prev,
                        3: e.target.value,
                      }));
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
                  <InputLabel id='demo-simple-select-autowidth-label'>분류2</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={categories[3]}
                    label='분류2'
                    onChange={(e) => {
                      setCategories((prev) => ({
                        ...prev,
                        3: e.target.value,
                      }));
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

            {categories[1] == '남성' &&
              (categories[2] == '상의' ? (
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-autowidth-label'>분류2</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={categories[3]}
                    label='분류2'
                    onChange={(e) => {
                      setCategories((prev) => ({
                        ...prev,
                        3: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value={'티셔츠'}>티셔츠</MenuItem>
                    <MenuItem value={'맨투맨'}>맨투맨</MenuItem>
                    <MenuItem value={'후드'}>후드</MenuItem>
                    <MenuItem value={'셔츠'}>셔츠</MenuItem>
                    <MenuItem value={'니트'}>니트</MenuItem>
                  </Select>
                </FormControl>
              ) : categories[2] == '하의' ? (
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-autowidth-label'>분류2</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={categories[3]}
                    label='분류2'
                    onChange={(e) => {
                      setCategories((prev) => ({
                        ...prev,
                        3: e.target.value,
                      }));
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
                  <InputLabel id='demo-simple-select-autowidth-label'>분류2</InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={categories[3]}
                    label='분류2'
                    onChange={(e) => {
                      setCategories((prev) => ({
                        ...prev,
                        3: e.target.value,
                      }));
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
          </Stack>
        </Box>

        <Stack spacing={'20%'} direction='row'>
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id='price'
            label='가격(숫자를 입력하세요: ₩)'
            sx={{ width: '20%' }}
            variant='standard'
          />
        </Stack>

        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={description}
          onChange={(text) => setDescription(text)}
          style={{ width: '82%', height: '60vh', marginBottom: '5vh', marginTop: '2.5vh' }}
        />

        <Button variant='contained' color='success' size='small' type='submit'>
          등록
        </Button>
      </Box>
    </div>
  )
}

export default ContentEditForm
