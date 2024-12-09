import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { messageSchema} from '../validation/message.js';
import { sendMessageController } from '../controllers/message.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);
router.post('/send-message', validateBody(messageSchema), ctrlWrapper(sendMessageController));

export default router;
