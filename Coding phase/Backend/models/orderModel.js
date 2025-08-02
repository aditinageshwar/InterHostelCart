const pool = require('../config/db');

const Order = {
  create: async (sellerId, buyerId, itemno, totalAmount) => {
    try {
      const sqlInsert = `INSERT INTO orderhistory (buyerid, sellerid, itemno, totalamount, orderdate, status) VALUES (?, ?, ?, ?, NOW(), 'placed')`;
      const [result] = await pool.query(sqlInsert, [buyerId, sellerId, itemno, totalAmount]);
      return result;
    } 
    catch (err) {
      throw err;
    }
  },

  findByUserId: async (userId) => {
    try {
      const sqlSelect = `
        SELECT 
          item.*, 
          usertable.*, 
          orderHistory.*
        FROM orderHistory
        JOIN item ON orderHistory.itemNO = item.itemNO
        JOIN usertable ON orderHistory.sellerId = usertable.userID
        WHERE orderHistory.buyerId = ?
      `;
      const [rows] = await pool.query(sqlSelect, [userId]);
      return rows;
    } 
    catch (err) {
      throw err;
    }
  },

  // Retrieve a specific order by order ID
  findById: async (orderId) => {
    try {
      const sqlSelect = "SELECT * FROM orderhistory WHERE orderID = ?";
      const [rows] = await pool.query(sqlSelect, [orderId]);
      return rows;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = Order;