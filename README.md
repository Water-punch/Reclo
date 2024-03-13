👕 서비스명: RE:CLO 👖

의류 폐기물을 줄임으로써 기후변화 문제에 소비자가 직접 기여하는 중고 의류 거래 및 나눔 서비스입니다.

## 프로젝트 구성 안내
- 프로젝트 명: RE:CLO
- 프로젝트 주제 : 중고 의류 공유/교환 서비스 
- 팀 구성: FE 2 명, BE 3 명  
- 언어 및 프레임워크: JavaScript, React, Mongo, Express.js  
- 라이브러리 
Front: Chart.js, Zustand, React-Quill, mui
Back: Mongoose
- 클라우드: GCP , S3 
- 사용 데이터: 전세계 기후 온도 변화, 의류산업의 CO2 배출량 

## 1. 프로젝트 소개

1) 기획의도  
환경을 주제로 지구가 당면한 문제에 대해 논의한 결과, 해결해야 할 시급한 문제로 기후변화가 선정되었습니다. 그리고 이에 대한 해결책은 탄소배출량을 줄이는 것입니다. 저희 팀은 '어떻게 하면 시민들이 환경문제에 관심을 가지고 일상생활에서 탄소배출량 감소를 위한 노력을 하게 할 수 있을까?'에 대해 고민했습니다. 그 결과 팀원들의 공통 관심사인 패션을 주제로 중고 의류 거래 및 나눔을 통해서 의류 생산과 폐기물을 줄이는 서비스를 기획했습니다. 

2) 서비스 내용
RE:CLO란 Recycle Clothes, Reset Closet이라는 의미를 가진 중고 의류 거래 및 나눔 서비스입니다.
거래나 나눔을 할 때마다 줄어든 탄소배출량을 시각적으로 보여주고 혜택을 제공합니다. 사용자는 이 서비스를 통해서 사회문제 해결에 기여한다는 자긍심을 얻고 비슷한 생각을 가진 사람들과 연대할 수 있습니다. 

3) 사용한 프레임워크와 라이브러리
- 언어 및 프레임워크
JavaScript, React, MongoDB, Express.js

- 프론트엔드
데이터 시각화: Chart.js
상태관리 라이브러리: Zustand
텍스트 에디터: React-Quill
스타일: mui

- 백엔드
DB : MongoDB 
MongoDB 객체 모델링 도구 : Mongoose

- 클라우드
S3 GCP

## 2. 프로젝트 목표

1) 문제 인식을 위한 [통계자료, 계산식](https://www.notion.so/elice/4e1ca65251a048f09d943f64b7579009)
- 의류 종류별 탄소 배출량 계산식, 한국과 미국의 의류 폐기물 통계, 직물 생산~폐기 과정에서 사용되는 물의 양에 대한 통계자료


2) 데이터 분석 결과로 도출되는 인사이트와 웹서비스의 해결과제
- 사용하는 데이터: [글로벌 온도 변화 데이터](https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series)
[의류산업의 CO2 배출량](https://quantis.com/wp-content/uploads/2018/03/measuringfashion_globalimpactstudy_full-report_quantis_cwf_2018a.pdf)

- 인사이트: 문제 인식 단계에서 파악한 의류 산업이 환경에 미치는 영향을 바탕으로 실제로 우리가 살고 있는 지구가 이 영향을 받고 있음을 평균 기온 상승 데이터로 증명합니다. 그리고 일상생활에서 이를 해결할 방법이 있음을 제시합니다.
 
- 웹사이트의 해결과제: 이용자가 실제로 서비스를 이용하면서 자신이 환경문제 해결에 기여하고 있다는 느낌을 제공해야 합니다.


## 3. 프로젝트 기능 설명

- 주요 기능 및 서브 기능
1) 거래 / 나눔 게시판
원하는 제품을 찾기 쉽도록 이름을 통한 검색과 카테고리 필터링을 추가했습니다.

2) 관심상품 등록
관심있는 상품을 언제든지 마이페이지에서 다시 조회할 수 있습니다.

3) 판매자와 쪽지로 상품 거래 
상품의 상세 페이지에서 판매자와의 쪽지를 통해 거래 방법을 결정할 수 있습니다.


## 4. 프로젝트 구성도

✏[와이어프레임](https://www.figma.com/file/GsnH0NfkOFOtJUAV9GpICO/Untitled?type=design&node-id=106-715&mode=design&t=mBvJSbF1NTJ2hvoO-0)
✏[기능 명세서](https://www.notion.so/elice/53e4fbd5fb1d41c18d085800a64fa6b6)
✏[API 명세서](https://www.notion.so/elice/API-871f638f3c504cb6b07f0d5af7aad865)


## 5. 프로젝트 팀원 역할 분담

- 파트 분배
프론트엔드: 김수산, 김진영(팀장)
백엔드: 배현진, 차봉준, 최원민
