import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { JWT_SECRET } from '../constants/index.js';

export const generateResetToken = ({ id, email }) => {

    const resetToken = jwt.sign(
    {
      sub: id,
      email,
    },
    env(JWT_SECRET),
    {
      expiresIn: '5m',
    },
    );

  console.log('Generated Reset Token:', resetToken);

  return resetToken;
};







