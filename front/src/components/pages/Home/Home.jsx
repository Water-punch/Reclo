import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slide from '../../features/Home/Slide';
import logo from '../../../../public/img/reclo.png';
import charity from '../../../../public/img/charity.png';
import ecology from '../../../../public/img/ecology.png';
import love from '../../../../public/img/giving-love.png';
import secondhand from '../../../../public/img/second-hand.png';
import '../../../styles/home.css';
import { Stack, Typography } from '@mui/material';

import test from '../../../../public/img/test.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='freespace'></div>
      <div
        className='introbanner'
        onClick={() => {
          navigate('/intro');
        }}
      >
        <h1> About us</h1>
        <div>
          <img src={logo} />
          <Stack direction='column'>
            <Typography variant='h3'>What is RE:CLO?</Typography>
            <Typography variant='body2'>구제의류 나눔 및 거래를 통해 환경을 지키는 플랫폼</Typography>
            <Stack direction='row' spacing={10} sx={{ marginRight: 20 }}>
              <img src={charity} style={{ height: 100 }}></img>
              <img src={ecology} style={{ height: 100 }}></img>
              <img src={love} style={{ height: 100 }}></img>
              <img src={secondhand} style={{ height: 100 }}></img>
            </Stack>
          </Stack>
        </div>
      </div>
      <div className='freespace'></div>
      <Slide />
      <div className='freespace'></div>
      <div
        className='testbanner'
        onClick={() => {
          navigate('/test');
        }}
        style={{ textAlign: 'center' }}
      >
        <img src={test} alt='Test Image' />
      </div>
      <div className='freespace'></div>
    </>
  );
};

export default Home;
