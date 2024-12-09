import { Router } from 'express';
import {  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {  createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);
router.use('/:contactId', isValidId);

router.get('/', ctrlWrapper(getContactsController));
router.post('/', upload.single('photo'), validateBody(createContactSchema),  ctrlWrapper(createContactController));
router.patch('/:contactId', upload.single('photo'), validateBody(updateContactSchema),  ctrlWrapper(updateContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
