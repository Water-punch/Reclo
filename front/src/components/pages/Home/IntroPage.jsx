import "../../../styles/IntroPage.css";
import Chart from "./Chart";

import cloth_waste from "./img/cloth_waste.jpg";

const IntroPage = () => {
  return (
    <div className="IntroPage">
      <h1>IntroPage</h1>

      <div id="world"></div>

      <div id="chart">
        <Chart />
        <a
          id="temp_url"
          href="https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land/1/12/1850-2023"
        >
          출처: Global Times Series
        </a>
      </div>

      <div id="cloth_waste">
        <a href="https://earth.org/statistics-about-fast-fashion-waste/">
          <img src={cloth_waste} />
        </a>
        <p>
          매년 1,000억개의 의류 쓰레기 중 9천2백만 톤이 매립되 고있습니다. 의류
          산업의 성장세를 보았을 때 2030년까지의 의류 배출량은 50% 증가 할 것을
          보입니다.
        </p>
      </div>
    </div>
  );
};

export default IntroPage;
