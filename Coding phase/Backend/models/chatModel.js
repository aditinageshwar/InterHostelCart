const pool = require('../config/db');

const Chat = {
  findByRoom: async (room) => {
    try {
      const sqlSelect = "SELECT * FROM chatService WHERE room = ? ORDER BY messageTime ASC";
      const [rows] = await pool.query(sqlSelect, [room]);
      return rows;
    } 
    catch (error) {
      throw error;
    }
  },

  saveMessage: async (room, senderID, receiverID, itemNO, messageContent) => {
    try {
      const sqlInsert = `
        INSERT INTO chatService (room, senderID, receiverID, itemNO, messageTime, messageContent, report)
        VALUES (?, ?, ?, ?, NOW(), ?, false)
      `;
      const [result] = await pool.query(sqlInsert, [room, senderID, receiverID, itemNO, messageContent]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  }
};

module.exports = Chat;