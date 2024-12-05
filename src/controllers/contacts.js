import createHttpError from 'http-errors';
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { saveImage } from '../utils/saveImage.js';

export const getContactsController = async (req, res) => {

  const { page, perPage } = parsePaginationParams(req.query);

  const contacts = await getAllContacts({page, perPage, userId: req.user._id});

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const createContactController = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const photo = req.file;
  let photoUrl;

  if (photo) {
      photoUrl = await saveImage(photo);
  }

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber or contactType',
    );
  }

  const contact = await createContact({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    userId: req.user._id,
     photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

const photo = req.file;
  let photoUrl;

  if (photo) {
      photoUrl = await saveImage(photo);
  }

  const updatedContact = await updateContact(contactId, req.user._id, { ...req.body, photo: photoUrl });

  if (!updatedContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const student = await deleteContact(contactId, req.user._id);

  if (!student) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
