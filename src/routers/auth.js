import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    registerUserSchema,
    loginUserSchema,
    resetEmailSchema,
    resetPasswordSchema
} from '../validation/auth.js';
import {
    registerUserController,
    loginUserController,
    refreshUserSessionController,
    logoutUserController,
    resetEmailController,
    resetPasswordController
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';


const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/send-reset-email', validateBody(resetEmailSchema), ctrlWrapper(resetEmailController));

router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;
