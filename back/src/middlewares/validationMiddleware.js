const { body, param, validationResult } = require('express-validator');

const validationCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidation = [
  body('email').notEmpty().withMessage('이메일을 입력해주세요'),
  body('password').notEmpty().withMessage('패스워드를 입력해주세요'),
  body('nickname').notEmpty().withMessage('닉네임을 입력해주세요'),
  validationCheck,
];

const userLoginValidation = [
  body('email').notEmpty().withMessage('이메일을 입력해주세요'),
  body('password').notEmpty().withMessage('패스워드를 입력해주세요'),
  validationCheck,
];

export { userValidation, userLoginValidation };
