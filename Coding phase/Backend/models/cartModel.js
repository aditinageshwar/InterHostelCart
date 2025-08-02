const pool = require('../config/db');

const Cart = {
  findByUserId: async (userID) => {
    try {
      const sqlSelect = `
        SELECT wishlist.*, item.*
        FROM wishlist JOIN item ON wishlist.itemNO = item.itemNO
        WHERE wishlist.buyerId = ?
      `;
      const [rows] = await pool.query(sqlSelect, [userID]);
      return rows;
    } 
    catch (error) {
      throw error;
    }
  },

  addItem: async (itemNO, userID) => {
    try {
      const sqlInsert = `INSERT INTO wishlist (itemNO, buyerId) VALUES (?, ?)`;
      const [result] = await pool.query(sqlInsert, [itemNO, userID]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  },

  removeItem: async (itemNO, userID) => {
    try {
      const sqlDelete = "DELETE FROM wishlist WHERE itemNO = ? AND buyerId = ?";
      const [result] = await pool.query(sqlDelete, [itemNO, userID]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  }
};

module.exports = Cart;