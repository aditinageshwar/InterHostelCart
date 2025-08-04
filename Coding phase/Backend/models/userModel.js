const pool = require('../config/db');

const User = {
  create: async (email, hostel, room, username, dob, phone, hash, dept, course) => {
    const sqlInsert = `
      INSERT INTO usertable (
        emailid, hostelno, roomno, username, userdob,
        userphoneno, userpassword, userdept, usercourse
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const [result] = await pool.query(sqlInsert, [email, hostel, room, username, dob, phone, hash, dept, course]);
      return result;
    } catch (err) {
      console.error("Error in create:", err);
      throw err;
    }
  },

  findByEmail: async (email) => {
    const sqlSelect = "SELECT * FROM usertable WHERE emailid = ?";
    try {
      const [rows] = await pool.query(sqlSelect, [email]);
      return rows;
    } catch (err) {
      console.error("Error in findByEmail:", err);
      throw err;
    }
  },
  
  findById: async (userId) => {
    const sqlSelect = "SELECT * FROM usertable WHERE userid = ?";
    try {
      const [rows] = await pool.query(sqlSelect, [userId]);
      return rows;
    } catch (err) {
      console.error("Error in findById:", err);
      throw err;
    }
  },

  updateProfileDetails: async (userId, details) => {
    const sqlUpdate = "UPDATE usertable SET userphoneno = ?, hostelno = ?, roomno = ? WHERE userid = ?";
    try {
      const [result] = await pool.query(sqlUpdate, [details.mobileNumber, details.hostelNumber, details.roomNumber, userId]);
      return result;
    } catch (err) {
      console.error("Error in updateProfileDetails: ", err);
      throw err;
    }
  },

  updateProfileImage: async (userId, image) => {
    const sqlUpdate = "UPDATE usertable SET profileImage = ? WHERE userid = ?";
    try {
      const [result] = await pool.query(sqlUpdate, [image, userId]);
      return result;
    } catch (err) {
      console.error("Error in updateProfileImage:", err);
      throw err;
    }
  },

  getAll: async () => {
    const sqlSelect = "SELECT * FROM usertable";
    try {
      const [rows] = await pool.query(sqlSelect);
      return rows;
    } catch (err) {
      console.error("Error in getAll:", err);
      throw err;
    }
  },
  
  getBlocked: async () => {
    const sqlSelect = "SELECT * FROM usertable WHERE reported = TRUE";
    try {
      const [rows] = await pool.query(sqlSelect);
      return rows;
    } catch (err) {
      console.error("Error in getAll:", err);
      throw err;
    }
  },

  reportById: async (userId) => {
    const sqlUpdate = 'UPDATE usertable SET reported = TRUE WHERE userid = ?';
    try {
      const [result] = await pool.query(sqlUpdate, [userId]);
      return result;
    } catch (err) {
      console.error("Error in updateProfileImage:", err);
      throw err;
    }
  }
};

module.exports = User;