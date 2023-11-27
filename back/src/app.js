import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { itemAuthRouter } from './routers/itemRouter';
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// CORS 에러 방지
app.use(cors());

app.use(
  cors({
    origin: ["http://localhost:5001", 'http://localhost:3000'],
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(cookieParser());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
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
