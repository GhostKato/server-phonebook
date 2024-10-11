import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { TEMPLATES_PATH } from '../constants/index.js';

const template = (
    await fs.readFile(path.join(TEMPLATES_PATH, 'reset-password-email.html'))
  ).toString();

export const generateResetPasswordEmail = ({ name, resetLink }) => {
  const handlebarsTemplate = handlebars.compile(template);

  return handlebarsTemplate({ name, resetLink });
};



