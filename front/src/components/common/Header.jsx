import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import '../../styles/home.css'
import useUserStore from '../../stores/user';
import * as Api from '../../api/api'

const Header = () => {
    const navigate = useNavigate()
    const { login, setLogout, user } = useUserStore()

    const handleSubmit = async (e) => {
      console.log(`로그아웃 이전 login ${login}`)
      e.preventDefault()
      try {
        await Api.post('user/logout')
        await setLogout()
        console.log(`로그아웃 이후 login ${login}`)
        alert('로그아웃 완료')
    
      } catch (err) {
        console.log('로그아웃 실패')
        navigate('/login')
      }
    }

    const handleMyPage = () => {
      console.log('mypage 클릭은 됨, login: ', login)
      if(login) {
        navigate('/mypage', { state: { user: user }})
      }
      else {
        alert('로그인이 필요한 서비스입니다')
        navigate('/login')
      }
    }

    return (
      <>
        <Box 
          component='form'
          className='header'
          onSubmit={handleSubmit}
        >
          <ButtonGroup 
          color='success'
          variant="text" aria-label="text button group">
            {login==false ? (<Button 
              sx={{ color: 'black'}} 
              variant="text" 
              onClick={() => {
                navigate('/login')}}>
              로그인
            </Button>) : (<Button 
              type="submit"
              sx={{ color: 'black'}} 
              variant="text" 
            >
              로그아웃
            </Button>)}
            <Button
              sx={{ color: 'black'}} 
              onClick={() => {
                navigate('/register')}}>
              회원가입
            </Button>
            <Button 
              sx={{ color: 'black'}} 
              onClick={handleMyPage}>
              마이페이지
            </Button>
          </ButtonGroup>
        </Box>
      </>
    )
}

export default Header
