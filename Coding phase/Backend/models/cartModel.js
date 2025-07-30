const pool = require('../config/db');

const Cart = {
  // Retrieve all items in the cart for a specific user
  findByUserId: async (userId) => {
    try {
      const sqlSelect = `
        SELECT cart.*, item.itemname, item.itemprice, item.itemphotourl
        FROM cart
        JOIN item ON cart.itemno = item.itemno
        WHERE cart.buyerid = ?
      `;
      const [rows] = await pool.query(sqlSelect, [userId]);
      return rows;
    } 
    catch (error) {
      throw error;
    }
  },

  // Add an item to the cart
  addItem: async (userId, itemId) => {
    try {
      const sqlInsert = `
        INSERT INTO cart (buyerid, itemno)
        VALUES (?, ?)
      `;
      const [result] = await pool.query(sqlInsert, [userId, itemId]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  },

  // Remove an item from the cart
  removeItem: async (userId, itemId) => {
    try {
      const sqlDelete = "DELETE FROM cart WHERE buyerid = ? AND itemno = ?";
      const [result] = await pool.query(sqlDelete, [userId, itemId]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  }
};

module.exports = Cart;