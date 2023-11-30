import '../../../styles/filter.css'
import * as React from 'react';
import {Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Toolbar } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

// 카테고리 박스 | 가격/태그/나눔 필터 | 정렬기준

// category =[성별, 상/하/겉, 세부]

// 남자
// > 상의 : 티셔츠, 맨투맨, 셔츠, 니트
// > 아우터: 자켓, 패딩, 점퍼, 코트, 정장
// > 하의: 데님, 반바지, 슬랙스, 면바지, 트레이닝
// 여자
// > 상의: 티셔츠, 맨투맨, 셔츠, 니트, 원피스
// > 아우터: 자켓, 패딩, 점퍼, 코트, 정장
// > 하의: 스커트, 데님, 반바지, 슬랙스, 면바지, 트레이닝


function FilterBar() {

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['상의', '하의', '아우터'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div style={{ position: 'static' }}>
      <Box
        component="nav"
      >
        <Drawer>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '20vh' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
      >
      </Box>
    </div>
  );
}

export default FilterBar;


