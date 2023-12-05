import { useNavigate } from 'react-router-dom'
import '../../styles/NavBar.css'
import { Box, Stack, Typography, Button } from '@mui/material'
import SearchBar from './SearchBar'

const NavBar = () => {
  const navigate = useNavigate()
  const navMenus = [ {variant:'text', color:"success", size:"large", } ] // map으로 정리하기

    return (
        <Box className='navbar'>
          <Stack spacing={30} direction="row" my={3}>
            <Typography variant='h3' onClick={()=>{navigate('/')}}>
              RE:CLO
            </Typography>
            <SearchBar />
            <Stack direction='row'>
              <Button 
                variant="text" 
                color="success"
                size="large"
                onClick={() => {navigate('/intro')}}
                sx={{ maxHeight: 200 }}>
                서비스 소개
              </Button>
              <Button 
                variant="text"
                color="success"
                size="large"
                onClick={() => {navigate('/contents')}}>
                거래/나눔
              </Button>
              <Button 
                variant="text" 
                color="success"
                size="large"
                onClick={() => {navigate('/event')}}>
                이벤트
              </Button>
              <Button 
                variant="text" 
                color="success"
                size="large"
                onClick={() => {navigate('/activity')}}>
                💬거래진행
              </Button>
            </Stack>
          </Stack>
        </Box>
    )
}

export default NavBar;
