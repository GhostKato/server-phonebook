import createHttpError from 'http-errors';
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveImage } from '../utils/saveImage.js';
import { BASE_URL_CONTACT_PHOTO } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';

export const getContactsController = async (req, res) => {

   const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({filter, userId: req.user._id});

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
  } else {
       photoUrl = req.body.photo || BASE_URL_CONTACT_PHOTO;
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

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await ContactsCollection.findOne({ _id: contactId });
    if (!contact) {
      console.log(`Contact with ID ${contactId} not found.`);
      throw createHttpError(404, 'Contact not found');
    }

    const oldPhotoUrl = contact.photo;

    const newPhoto = req.file;
    let photoUrl;

    if (newPhoto) {

      photoUrl = await saveImage(newPhoto);
    } else {
      photoUrl = req.body.photo || oldPhotoUrl || BASE_URL_CONTACT_PHOTO;

    }

    const updatedContact = await updateContact(contactId, req.user._id, {
      ...req.body,
      photo: photoUrl,
    });

    if (!updatedContact) {
      console.log('Failed to update contact.');
      throw createHttpError(500, 'Failed to update contact');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated the contact!',
      data: updatedContact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    next(createHttpError(500, 'An error occurred while updating the contact.'));
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};


