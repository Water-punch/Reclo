import { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, Stack } from '@mui/material'
import { useBoundStore } from '../../../stores/boundStore';
// 스토어를 한 곳에서 꺼내 쓸 수 있게 모아둔 파일

export default function CategorySelect() {
  const [category1, setCategory1] = useState('')
  const [category2, setCategory2] = useState('')
  const [category3, setCategory3] = useState('')
  const { categorySave, setCategorySave } = useBoundStore

  return (
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
              setCategorySave(e.target.value)
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
                setCategorySave(e.target.value)
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
                setCategorySave(e.target.value)
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
                  setCategorySave(e.target.value)
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
                  setCategorySave(e.target.value)
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
                setCategorySave(e.target.value)
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
                  setCategorySave(e.target.value)
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
                  setCategorySave(e.target.value)
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

  );
}