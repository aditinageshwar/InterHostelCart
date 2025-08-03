const pool = require('../config/db');

const Order = {
  create: async (buyerId, itemNO, sellerId, totalamount) => {
    try {
      const sqlInsert = `INSERT INTO orderHistory (buyerId, itemNO, sellerId, orderDate, status, totalamount) VALUES (?, ?, ?, NOW(), 'Done', ?)`;
      const [result] = await pool.query(sqlInsert, [buyerId, itemNO, sellerId, totalamount]);
      return result;
    } 
    catch (err) {
      throw err;
    }
  },

  findBySellerId: async (userId) => {
    try {
      const sqlSelect = `SELECT 
        item.*, 
        usertable.*, 
        orderHistory.*
        FROM orderHistory
        INNER JOIN item ON orderHistory.itemNO = item.itemNO
        INNER JOIN usertable ON orderHistory.buyerId = usertable.userID
        WHERE orderHistory.sellerId = ?`;
      const [rows] = await pool.query(sqlSelect, [userId]);
      return rows;
    } 
    catch (err) {
      throw err;
    }
  },

  findByBuyerId: async (userId) => {
    try {
      const sqlSelect = `SELECT 
        item.*, 
        usertable.*, 
        orderHistory.*
        FROM orderHistory
        INNER JOIN item ON orderHistory.itemNO = item.itemNO
        INNER JOIN usertable ON orderHistory.sellerId = usertable.userID
        WHERE orderHistory.buyerId = ?`;
      const [rows] = await pool.query(sqlSelect, [userId]);
      return rows;
    } 
    catch (err) {
      throw err;
    }
  }
};

module.exports = Order;