import { check } from 'express-validator';

export const registerValidation = [
  check('email').isEmail().withMessage('Invalid email'),
  check('firstName').notEmpty().withMessage('Please enter your first name'),
  check('lastName').notEmpty().withMessage('Please enter your last name'),
  check('password')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters')
    .matches(/\d/).withMessage('Password must contain at least one digit'),
  check('passwordConfirm')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
];

export const loginValidation = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').notEmpty().withMessage('Please enter your password')
];
