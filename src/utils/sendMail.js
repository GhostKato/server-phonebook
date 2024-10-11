import nodemailer from 'nodemailer';
import { SMTP_ENV_VARS } from '../constants/index.js';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP_ENV_VARS.SMTP_HOST),
  port: Number(env(SMTP_ENV_VARS.SMTP_PORT)),
  auth: {
    user: env(SMTP_ENV_VARS.SMTP_USER),
    pass: env(SMTP_ENV_VARS.SMTP_PASSWORD),
  },
});

console.log('SMTP Config:', {
  SMTP_HOST: env(SMTP_ENV_VARS.SMTP_HOST),
  SMTP_PORT: Number(env(SMTP_ENV_VARS.SMTP_PORT)),
  SMTP_USER: env(SMTP_ENV_VARS.SMTP_USER),
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
