import createHttpError from 'http-errors';
import { sendLetter } from '../utils/sendLetter.js';
import { SMTP_ENV_VARS } from '../constants/index.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { TEMPLATES_PATH } from '../constants/index.js';
import { env } from '../utils/env.js';

export const sendMessage = async ({ name, email, message }) => {

  const messageTemplatePath = path.join(
    TEMPLATES_PATH,
    'message.html',
  );

  const templateSource = (
    await fs.readFile(messageTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: name,
    message: message,

  });

  try {
    await sendLetter({
      from: env(SMTP_ENV_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
