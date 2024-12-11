import createHttpError from 'http-errors';
import { sendMessage, updateUser } from '../services/user.js';
import { UsersCollection } from '../db/models/user.js';
import { saveImage } from '../utils/saveImage.js';
import { BASE_URL_USER_PHOTO } from '../constants/index.js';

export const updateUserController = async (req, res, next) => {
  console.log('Request Params:', req.params);
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  try {
    const { userId } = req.params;

    const user = await UsersCollection.findOne({ _id: userId });
    if (!user) {
      console.log(`User with ID ${userId} not found.`);
      throw createHttpError(404, 'User not found');
    }

    const newPhoto = req.file;
    let photoUrl;

    if (newPhoto) {
      photoUrl = await saveImage(newPhoto);
    } else {

      photoUrl = req.body.photo || user.photo || BASE_URL_USER_PHOTO;
    }

    const updatedUser = await updateUser({
      userId,
      ...req.body,
      photo: photoUrl,
    });

    if (!updatedUser) {
      console.log('Failed to update user.');
      throw createHttpError(500, 'Failed to update user');
    }
    
    res.status(200).json({
      status: 200,
      message: 'Successfully updated the user!',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    next(createHttpError(500, 'An error occurred while updating the user.'));
  }
};


export const sendMessageController = async (req, res) => {

  const { name, email, message } = req.body;

  await sendMessage({ name, email, message });

  res.json({
    message: 'Message was successfully sent!',
    status: 200,
    data: {},
  });
};
