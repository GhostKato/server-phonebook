import { sendMessage } from '../services/message.js';

export const sendMessageController = async (req, res) => {

  const { name, email, message } = req.body;

  await sendMessage({ name, email, message });

  res.json({
    message: 'Message was successfully sent!',
    status: 200,
    data: {},
  });
};
