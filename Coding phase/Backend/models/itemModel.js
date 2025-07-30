const pool = require('../config/db');

const Item = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM item");
    return rows;
  },

  create: async (itemData) => {
    const sql = `
      INSERT INTO item (
        sellerID, itemName, itemPrice, itemDescription, itemTags, 
        listingDate, reportflag, itemVisit, itemPhotoURL
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, itemData);
    return result;
  },

  getByGenderAndSeller: async (gender, sellerID) => {
    const sql = "SELECT * FROM item WHERE gender = ? AND sellerID = ?";
    const [rows] = await pool.query(sql, [gender, sellerID]);
    return rows;
  },

  getByTag: async ({ tag }) => {
    const sql = "SELECT * FROM item WHERE LOWER(itemTags) = ?";
    const [rows] = await pool.query(sql, [tag.toLowerCase()]);
    return rows;
  },

  getById: async ({ id }) => {
    const sql = `
      SELECT 
        item.*, 
        usertable.username, 
        usertable.hostelno, 
        usertable.roomno, 
        usertable.userdept, 
        usertable.usercourse 
      FROM item 
      JOIN usertable ON item.sellerID = usertable.userID 
      WHERE item.itemNo = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows;
  },

  reportItem: async ({ itemId }) => {
    const [result] = await pool.query("SELECT reportflag FROM item WHERE itemNo = ?", [itemId]);
    if (result.length > 0 && result[0].reportflag) {
      return { message: 'Item has already been reported' };
    }
    await pool.query("UPDATE item SET reportflag = true WHERE itemNo = ?", [itemId]);
    return { message: 'Item reported successfully' };
  },

  removeById: async ({ id }) => {
    const [result] = await pool.query("DELETE FROM item WHERE itemNo = ?", [id]);
    return result;
  },

  getByHostel: async ({ hostel }) => {
    const sql = `
      SELECT item.* 
      FROM item
      JOIN usertable ON item.sellerID = usertable.userID
      WHERE usertable.hostelno = ?
    `;
    const [rows] = await pool.query(sql, [hostel]);
    return rows;
  }
};

module.exports = Item;