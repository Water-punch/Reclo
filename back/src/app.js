import cors from 'cors';
import express from 'express';
import { userAuthRouter } from './routers/userRouter.js';
import { itemRouter } from './routers/itemRouter.js';
import { imageRouter } from './routers/imgRouter.js';
import { chatRouter } from './routers/chatRouter.js';
import { wishItemRouter } from './routers/wishItemRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const cookieParser = require('cookie-parser');

const app = express();

// CORS 에러 방지
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://kdt-ai-9-team01.elicecoding.com/:5173',
      'http://kdt-ai-9-team01.elicecoding.com',
      'http://reclo.ddns.net',
    ],
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    exposedHeaders: ['set-cookie'],
  })
);

app.use(cookieParser());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요. Elice 2차 프로젝트 1팀 FF crew API입니다.');
});

app.use(userAuthRouter);
app.use(itemRouter);
app.use(imageRouter);
app.use(wishItemRouter);
app.use(chatRouter);

// 에러 핸들링
app.use(errorMiddleware);

export { app };
