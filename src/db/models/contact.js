import { model, Schema } from 'mongoose';
import { URL_PHOTO } from '../../constants/index.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: 'none',
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
       userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    photo: {
      type: String,
      default: URL_PHOTO,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
