import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slide from '../../features/Home/Slide';
import logo from '../../../../public/img/reclo.png';

import '../../../styles/home.css';

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
          <div>
            RE:CLO는 버려지는 의류를 줄이고자 만들어 진 서비스 입니다. <br />
            하고 싶은말 추가적으로 작성
          </div>
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
        <img src='/public/img/Test.png' alt='Test Image' />
      </div>
      <div className='freespace'></div>
    </>
  );
};

export default Home;
