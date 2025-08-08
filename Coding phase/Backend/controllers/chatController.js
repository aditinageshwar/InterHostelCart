const Chat = require('../models/chatModel');

const chatController = {
  getMessages: async (req, res) => {
    const { room } = req.params;
    try {
      const messages = await Chat.findByRoom(room);
      res.json(messages);
    } 
    catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  saveMessage: async (req, res) => {
    const { room, senderId, receiverId, itemNO, messageContent } = req.body;
    try {
      await Chat.saveMessage(room, senderId, receiverId, itemNO, messageContent);
      res.status(201).json({ message: 'Message saved successfully' });
    } 
    catch (err) {
      console.error('Error saving message:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getRoom: async (req, res) => {
    const { userid } = req.params;
    try {
      const rooms = await Chat.findByUser(userid);
      res.json(rooms);
    } 
    catch (err) {
      console.error('Error fetching room:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = chatController;