import 'dotenv/config';
import { app } from './src/app';
import path from 'path';

const envPath = path.join(__dirname, '.env');

const { SERVER_PORT, JWT_SECRET_KEY, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME, S3_REGION } = process.env;

const basic_port = 5001;
const PORT = process.env.SERVER_PORT || basic_port;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
