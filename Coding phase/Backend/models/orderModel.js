const pool = require('../config/db');

const Order = {
  create: async (buyerId, itemNO, sellerId, totalamount) => {
    try {
      const rows = await pool.query("SELECT itemName, itemDescription, itemPhotoURL FROM item WHERE itemNO = ? " , [itemNO]);
      const { itemName, itemDescription, itemPhotoURL } = rows[0][0];
      const sqlInsert = `INSERT INTO orderHistory (buyerId, itemName, itemDescription, itemPhotoURL , sellerId, orderDate, status, totalamount) VALUES (?, ?, ?, ?, ?, NOW(), 'Done', ?)`;
      const [result] = await pool.query(sqlInsert, [buyerId, itemName, itemDescription, itemPhotoURL, sellerId, totalamount]);
      return result;
    } 
    catch (err) {
      throw err;
    }
  },

  findBySellerId: async (userId) => {
    try {
      const sqlSelect = `SELECT  
        usertable.*, 
        orderHistory.*
        FROM orderHistory
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
        usertable.*, 
        orderHistory.*
        FROM orderHistory
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