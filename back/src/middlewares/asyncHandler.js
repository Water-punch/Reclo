const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next); // 여기서 발생되는 에러들은 catch에서 잡힘
    } catch (err) {
      next(err);
    }
  };
};

export { asyncHandler };
