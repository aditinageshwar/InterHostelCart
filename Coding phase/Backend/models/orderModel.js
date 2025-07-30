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

  // Retrieve all orders for a specific user
  findByUserId: async (userId) => {
    try {
      const sqlSelect = `
        SELECT 
          item.*, 
          usertable.username, 
          usertable.hostelno, 
          usertable.roomno, 
          usertable.userdept, 
          usertable.usercourse 
        FROM orderhistory
        JOIN item ON orderhistory.itemno = item.itemno
        JOIN usertable ON orderhistory.sellerid = usertable.userid
        WHERE orderhistory.buyerid = ?
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