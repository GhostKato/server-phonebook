import Joi from 'joi';

export const messageSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  message: Joi.string(),
});
