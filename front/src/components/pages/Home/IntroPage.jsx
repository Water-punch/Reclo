import "../../../styles/IntroPage.css";
import Chart from "./Chart";

import cloth_waste from "./img/cloth_waste.jpg";

const IntroPage = () => {
  return (
    <div className="IntroPage">
      <h1>IntroPage</h1>

      <div>
        <img
          src="https://eco-business.imgix.net/ebmedia/fileuploads/Global_Shield_Arti…ure.jpeg?ar=16%3A10&auto=format&fit=crop&ixlib=django-1.2.0&q=85&width=320"
          alt="Global Shield Cover Picture"
          srcset="https://eco-business.imgix.net/ebmedia/fileuploads/Global_Shield_Arti…eg?ar=16%3A10&auto=format&dpr=2&fit=crop&ixlib=django-1.2.0&q=45&width=320 640w, https://eco-business.imgix.net/ebmedia/fileuploads/Global_Shield_Arti…ure.jpeg?ar=16%3A10&auto=format&fit=crop&ixlib=django-1.2.0&q=85&width=700 700w, https://eco-business.imgix.net/ebmedia/fileuploads/Global_Shield_Arti…eg?ar=16%3A10&auto=format&dpr=2&fit=crop&ixlib=django-1.2.0&q=45&width=480 960w, https://eco-business.imgix.net/ebmedia/fileuploads/Global_Shield_Arti…eg?ar=16%3A10&auto=format&dpr=2&fit=crop&ixlib=django-1.2.0&q=45&width=700 1400w, https://eco-business.imgix.net/ebmedia/fileuploads/Global_Shield_Arti…g?ar=16%3A10&auto=format&dpr=2&fit=crop&ixlib=django-1.2.0&q=45&width=1100 2200w"
          sizes="(min-width: 1300px) 1100px, (min-width: 740px) 700px, 100vw"
        />
      </div>

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

      <div id="news">
        <iframe
          id="world_news"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/aopyc8cAFzQ?si=NKrPQUY-jBxDLK89&amp;start=0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default IntroPage;
