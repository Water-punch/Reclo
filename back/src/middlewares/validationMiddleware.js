const { body, param, validationResult } = require('express-validator');

const validationCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidation = [
  body('user.email').notEmpty().withMessage('이메일을 입력해주세요'),
  body('user.password').notEmpty().withMessage('패스워드를 입력해주세요'),
  body('user.nickname').notEmpty().withMessage('닉네임을 입력해주세요'),
  validationCheck,
];

const userLoginValidation = [
  body('email').notEmpty().withMessage('이메일을 입력해주세요'),
  body('password').notEmpty().withMessage('패스워드를 입력해주세요'),
  validationCheck,
];

const pointValidation = [
  body('pointdetails.userId').notEmpty().withMessage('userId가 필요합니다.'),
  body('pointdetails.itemId').notEmpty().withMessage('itemId가 필요합니다.'),
  body('pointdetails.point').notEmpty().withMessage('point 수치를 입력해 주세요'),
  validationCheck,
];

export { userValidation, userLoginValidation, pointValidation };
