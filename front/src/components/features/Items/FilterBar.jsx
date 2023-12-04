import '../../../styles/filter.css'
import { useState } from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Toolbar, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import * as Api from '../../../api/api'

function FilterBar() {
  const [value, setValue] = useState('1')
  const [condition, setCondition] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const findByCategory = async (e) => { //조건 = 성별, 분류1 이후에 선택한 **분류2**
    setCondition(e.target.value)
    searchParams.set('category', condition)
    setSearchParams(searchParams)
  }

  return (
    <div style={{ position: 'static' }}>
      <Box 
        component="nav"
        sx={{ maxWidth: 200 }}  
      >
        <Typography variant='h3'>카테고리</Typography>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label='남성' value='1'/>
            <Tab label='여성' value='2'/>
          </TabList>

          <TabPanel value='1'>
            <TabList onChange={handleChange}>
              <Tab label='상의' value='3'/>
              <Tab label='하의' value='4'/>
              <Tab label='아우터' value='5'/>
            </TabList>
            <TabPanel value='3'>
              <List>
                {['티셔츠', '셔츠', '니트', '맨투맨', '후드'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton value={text} onClick={findByCategory}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel value='4'>
              <List>
                {['데님', '반바지', '슬랙스', '면바지', '트레이닝'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton value={text} onClick={findByCategory}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel value='5'>
              <List>
                {['자켓', '패딩', '코트', '점퍼', '정장'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton value={text} onClick={findByCategory}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>  
          </TabPanel>

          <TabPanel value='2'>
            <TabList onChange={handleChange}>
              <Tab label='상의' value='6'/>
              <Tab label='하의' value='7'/>
              <Tab label='아우터' value='8'/>
            </TabList>
            <TabPanel value='6'>
              <List>
                {['티셔츠', '셔츠', '니트', '맨투맨', '후드'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton value={text} onClick={findByCategory}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel value='7'>
              <List>
                {['데님', '반바지', '슬랙스', '면바지', '트레이닝'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton value={text} onClick={findByCategory}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel value='8'>
              <List>
                {['자켓', '패딩', '코트', '점퍼', '정장'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton value={text} onClick={findByCategory}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default FilterBar;
