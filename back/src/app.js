import cors from 'cors';
import express from 'express';
import { userAuthRouter } from './routers/userRouter';
import { itemAuthRouter } from './routers/itemRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

// CORS 에러 방지
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('2차 프로젝트');
});

app.use(userAuthRouter);
app.use(itemAuthRouter);
// 에러 핸들링
app.use(errorMiddleware);

export { app };
