import createHttpError from 'http-errors';
import { sendLetter } from '../utils/sendLetter.js';
import { SMTP_ENV_VARS } from '../constants/index.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { TEMPLATES_PATH } from '../constants/index.js';
import { env } from '../utils/env.js';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';


export const updateUser = async (payload) => {
  try {

    const user = await UsersCollection.findOne({ _id: payload.userId });

    if (!user) {
      throw new Error('User not found');
    }

    let encryptedPassword = user.password;

    if (payload.password) {
      encryptedPassword = await bcrypt.hash(payload.password, 10);
    }

    const updatedUser = await UsersCollection.findOneAndUpdate(
      { _id: payload.userId },
      {
        ...payload,
        password: encryptedPassword,
      },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

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
