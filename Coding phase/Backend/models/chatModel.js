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

  saveMessage: async (room, senderId, receiverId, itemNO, messageContent) => {
    try {
      const sqlInsert = `
        INSERT INTO chatService (room, senderID, receiverID, itemNO, messageTime, messageContent, report)
        VALUES (?, ?, ?, ?, NOW(), ?, false)
      `;
      const [result] = await pool.query(sqlInsert, [room, senderId, receiverId, itemNO, messageContent]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  },

  findByUser: async (userid) => {
    try {
      const sqlSelect = "SELECT DISTINCT room FROM chatService WHERE room LIKE CONCAT('%_', ?, '_%') OR room LIKE CONCAT('%_', ?, '')";
      const [rows] = await pool.query(sqlSelect, [userid,userid]);
      return rows;
    } 
    catch (error) {
      throw error;
    }
  }
};

module.exports = Chat;