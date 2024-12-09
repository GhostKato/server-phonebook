import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import messageRouter from './message.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);
router.use('/', messageRouter);

export default router;
