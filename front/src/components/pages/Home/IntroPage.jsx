import '../../../styles/IntroPage.css';

import intro_indonesia from '../../../../public/img/intro_indonesia.jpg';
import intro_nowater from '../../../../public/img/intro_nowater.jpg';
import intro_Heatwave from '../../../../public/img/intro_Heatwave.webp';
import intro_clothwaste from '../../../../public/img/intro_clothwaste.jpg';
import intro_water_co2_chart from '../../../../public/img/intro_water_co2_chart.png';
import cloth_waste from '../../../../public/img/cloth_waste.jpg';
import logo from '../../../../public/img/intro_logo.webp';

import Chart from './intropage/Chart';

import { useEffect } from 'react';

const IntroPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  });

  return (
    <div className='IntroPage'>
      <div id='chart'>
        <Chart />
        <a
          id='temp_url'
          href='https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land/1/12/1850-2023'
        >
          출처: Global Times Series
        </a>
      </div>
      <div id='intro_chart_pic'>
        <img src={intro_water_co2_chart} data-aos='fade-left' data-aos-anchor-placement='center-center' />
      </div>
      <div id='intro_pic'>
        <p data-aos='zoom-in' data-aos-anchor-placement='center-center'>
          지구의 온도가 지속적으로 상승함에 따라{' '}
        </p>
        <img src={intro_indonesia} data-aos='fade-right' data-aos-anchor-placement='center-center' />
        <p data-aos='zoom-in' data-aos-anchor-placement='center-center'>
          지구에 예상하지 못한 일들이{' '}
        </p>
        <img src={intro_nowater} data-aos='fade-right' data-aos-anchor-placement='center-center' />
        <p data-aos='zoom-in' data-aos-anchor-placement='center-center'>
          {' '}
          일어나고 있습니다.{' '}
        </p>
        <img src={intro_Heatwave} data-aos='fade-right' data-aos-anchor-placement='center-center' />

        <p data-aos='zoom-in' data-aos-anchor-placement='center-center'>
          {' '}
          우리는 우리가 할 수 있는 일을 해보려고 합니다.
        </p>
        <img src={intro_clothwaste} data-aos='fade-right' data-aos-anchor-placement='center-center' />

        <div id='cloth_waste' data-aos='fade-right' data-aos-anchor-placement='center-center'>
          <a href='https://earth.org/statistics-about-fast-fashion-waste/'>
            <img src={cloth_waste} />
          </a>
          <p>
            매년 1,000억개의 의류 쓰레기 중<br /> 9천2백만 톤이 매립되고 있습니다.
          </p>
        </div>
      </div>
      <div id='news' data-aos='zoom-in' data-aos-anchor-placement='center-center'>
        <p data-aos='zoom-in' data-aos-anchor-placement='center-center'>
          의류 산업의 성장세를 보았을 때 2030년까지의 의류 배출량은
          <br />
          50% 증가 할 것을 보입니다.
        </p>
      </div>
      <div id='ending' data-aos='zoom-in' data-aos-anchor-placement='center-center'>
        <p data-aos='zoom-in' data-aos-anchor-placement='center-center'>
          그래서 우리는 만들기로 했습니다.
        </p>
      </div>
      <div id='ending' data-aos='zoom-in' data-aos-anchor-placement='center-center'>
        <p data-aos='zoom-in' data-aos-anchor-placement='center-center'>
          우리가 우리의 지구를 돕기 위해.
        </p>
      </div>

      <div id='ending' data-aos='zoom-in' data-aos-anchor-placement='center-center'>
        <img src={logo} data-aos='zoom-in' data-aos-anchor-placement='center-center' />
      </div>

      <iframe
        id='world_news'
        width='1120'
        height='630'
        src='https://www.youtube.com/embed/aopyc8cAFzQ?si=NKrPQUY-jBxDLK89&amp;start=0'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default IntroPage;
