const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const authController = {
  signup: async (req, res) => {
    try {
      const {emailid, hostelno, roomno, username, userdob, userphoneno, userpassword, userdept, usercourse} = req.body;
      const hashedPassword = await bcrypt.hash(userpassword, 10);

      await User.create(emailid, hostelno, roomno, username, userdob, userphoneno, hashedPassword, userdept, usercourse);
      res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) {
      console.error('Signup error:', error);
      if (error.code === 'ER_DUP_ENTRY' && error.sqlMessage.includes('emailid')) {
        return res.status(400).json({
          message: 'This email is already registered. Try logging in.'
        });
      }

      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  },

login: async (req, res) => {
  const { emailid, userpassword } = req.body;
  try {
    const result = await User.findByEmail(emailid);

    if (!result || result.length === 0) {
      return res.status(401).json({ error: 'Email does not exist. Please sign up to continue.' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(userpassword, user.userPassword);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.userID, admin: user.admin || false }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, admin: user.admin || false });
  } 
  catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
};

module.exports = authController;