import { useNavigate } from 'react-router-dom'
import '../../styles/NavBar.css'
import { Box, Stack, Typography, Button } from '@mui/material'
import SearchBar from './SearchBar'

const NavBar = () => {
  const navigate = useNavigate()

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
                onClick={() => {navigate('/contents', {state: {normal: true}})}}>
                거래/나눔
              </Button>
              <Button 
                variant="text" 
                color="success"
                size="large"
                onClick={() => {navigate('/wishlist')}}>
                관심상품
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
