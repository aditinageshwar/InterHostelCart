const pool = require('../config/db');
const { verifyReport } = require('../controllers/itemController');

const Item = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM item");
    return rows;
  },

  create: async (itemData) => {
    const sql = `
      INSERT INTO item (
        sellerID, itemName, itemPrice, itemDescription, itemTags, 
        listingDate, reportflag, itemVisit, itemPhotoURL, gender
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, itemData);
    return result;
  },

  getByGender: async (gender) => {
    const sql = "SELECT * FROM item WHERE gender = ?";
    const [rows] = await pool.query(sql, [gender]);
    return rows;
  },

  getByName: async (itemName) => {
    const sql = "SELECT * FROM item WHERE itemName LIKE ?";
    const [rows] = await pool.query(sql, [`%${itemName.toLowerCase()}%`]);
    return rows;
  },

  getByHostel: async (hostelNo) => {
    const sql = "SELECT  i.itemNO, i.itemName, i.itemDescription, i.itemPrice, i.itemTags, i.itemVisit, i.itemPhotoURL FROM item i JOIN usertable u ON i.sellerId = u.userID WHERE u.hostelNo = ?";
    const [rows] = await pool.query(sql, [parseInt(hostelNo, 10)]);
    return rows;
  },

  getByTag: async ({ tag }) => {
    const sql = "SELECT * FROM item WHERE LOWER(itemTags) LIKE ?";
    const [rows] = await pool.query(sql, [`%${tag.toLowerCase()}%`]);
    return rows;
  },

  getById: async (itemNO) => {
    const sql = `SELECT i.*, u.* FROM item i JOIN usertable u ON i.sellerId = u.userID WHERE itemNO = ?`;
    const [rows] = await pool.query(sql, [itemNO]);
    return rows;
  },

  reportItem: async (itemNO) => {
    const [result] = await pool.query("SELECT reportflag FROM item WHERE itemNO = ?", [itemNO]);
    if (result.length > 0 && result[0].reportflag) {
      return { message: 'Item has already been reported' };
    }
    await pool.query("UPDATE item SET reportflag = true WHERE itemNO = ?", [itemNO]);
    return { message: 'Item reported successfully' };
  },

  removeById: async (itemNO) => {
    const [result] = await pool.query("DELETE FROM item WHERE itemNO = ?", [itemNO]);
    return result;
  },

  markSafe: async (itemNO) => {
     await pool.query("UPDATE item SET reportflag = false WHERE itemNO = ?", [itemNO]);
     return { message: 'Item verified successfully' };
  } 
};

module.exports = Item;