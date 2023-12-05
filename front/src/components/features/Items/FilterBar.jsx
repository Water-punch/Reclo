import '../../../styles/filter.css'
import { useState } from 'react'
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Toolbar, Tab, Typography, Stack } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import * as Api from '../../../api/api'

function FilterBar() {
  const [tabValues, setTabValues] = useState({1: '1', 2:'3'})
  const [open, setOpen] = useState({open1: false, open2: false, open3: false})
  const [condition, setCondition] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const handleTabChange1 = (event, newTabValue) => {
    setTabValues(prev => ({
      ...prev,
      1: newTabValue
    }))
  }

  const handleTabChange2 = (event, newTabValue) => {
    setTabValues(prev => ({
      ...prev,
      2: newTabValue
    }))
  }

  const handleOpen1 = (event) => {
    setOpen(prev => ({
      ...prev,
      open1: true,
      open2: false,
      open3: false,
    }))
  }

  const handleOpen2 = (event) => {
    setOpen(prev => ({
      ...prev,
      open1: false,
      open2: true,
      open3: false,
    }))
  }

  const handleOpen3 = (event) => {
    setOpen(prev => ({
      ...prev,
      open1: false,
      open2: false,
      open3: true,
    }))
  }

  const findByCategory = async (e, categoryValue) => { //조건 = 성별, 분류1 이후에 선택한 **분류2**
    setCondition(categoryValue)
    searchParams.set('category', categoryValue)
    setSearchParams(searchParams)
  }

  return (
    <div style={{ position: 'static' }}>
      <Box component="nav">
        <Typography variant='h5'>카테고리</Typography>
        <TabContext value={tabValues[1]}>

          <TabList onChange={handleTabChange1}>
            <Tab label='남성' value='1'/>
            <Tab label='여성' value='2'/>
          </TabList>

          <TabPanel value='1' >
            <List >
              <ListItem key='listitem' disablePadding sx={{ border: 1 }}>
                <ListItemButton onClick={handleOpen1}>
                  <ListItemText primary='상의' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider></Divider>
            <List>
              {open.open1 && ['티셔츠', '셔츠', '니트', '맨투맨', '후드'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={e => findByCategory(e,'남성상의'+ text )}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <List>
              <ListItem key='listitem' disablePadding sx={{ border: 1 }}>
                <ListItemButton onClick={handleOpen2}>
                  <ListItemText primary='하의' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider></Divider>
            <List>
              {open.open2 && ['데님', '반바지', '슬랙스', '면바지', '트레이닝'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={e => findByCategory(e,'남성하의'+ text )}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <List>
              <ListItem key='listitem' disablePadding sx={{ border: 1 }}>
                <ListItemButton onClick={handleOpen3}>
                  <ListItemText primary='아우터' />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider></Divider>
            <List>
              {open.open3 && ['자켓', '패딩', '코트', '점퍼', '정장'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={e => findByCategory(e,'남성아우터'+ text )}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> 
          </TabPanel>

          <TabPanel value='2'>
            <TabContext value={tabValues[2]} direction='column'>
              <TabList onChange={handleTabChange2} >
                <Tab label='상의' value='3'/>
                <Divider />
                <Tab label='하의' value='4'/>
                <Divider />
                <Tab label='아우터' value='5'/>
              </TabList>
              <TabPanel value='3'>
                <List>
                  {['티셔츠', '셔츠', '니트', '원피스', '맨투맨', '후드'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton onClick={e => findByCategory(e,'여성상의'+ text )}>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
              <TabPanel value='4'>
                <List>
                  {['치마','데님', '반바지', '슬랙스', '면바지', '트레이닝'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton onClick={e => findByCategory(e,'여성하의'+ text )}>
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
                      <ListItemButton onClick={e => findByCategory(e,'여성아우터'+ text )}>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </TabContext>
          </TabPanel>

        </TabContext>
      </Box>
    </div>
  );
}

export default FilterBar;
