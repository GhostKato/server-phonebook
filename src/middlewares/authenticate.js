import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  // Перевірка токену в Authorization header
  const authHeader = req.get('Authorization');
  const tokenFromHeader = authHeader ? authHeader.split(' ')[1] : null;

  // Якщо токен не знайдено в заголовку, перевіряємо токен у куках
  const tokenFromCookie = req.cookies.sessionId;

  // Якщо немає токену ані в заголовку, ані в куках
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return next(createHttpError(401, 'No token provided'));
  }

  // Перевірка наявності сесії
  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // Перевірка на термін дії токену
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  // Перевірка наявності користувача
  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  // Додаємо користувача в об'єкт запиту для подальшого використання
  req.user = user;
  next();
};

