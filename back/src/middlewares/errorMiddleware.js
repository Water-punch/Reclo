function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error);
  const status = error.status || 500;
  res.status(status).send(error.message);
}

export { errorMiddleware };
