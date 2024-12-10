import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import userRouter from './user.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
