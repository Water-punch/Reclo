import '../../../styles/filter.css'
import * as React from 'react';
import {Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Toolbar } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

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
