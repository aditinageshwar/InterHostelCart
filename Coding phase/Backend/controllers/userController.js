const User = require('../models/userModel');

const userController = {
  getProfile: async (req, res) => {
    const userId = req.user.userId;

    try {
      const userResult = await User.findById(userId);

      if (!userResult || userResult.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user: userResult[0] });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  updateProfile: async (req, res) => {
    const userId = req.user.userId;
    const { mobileNumber, hostelNumber, roomNumber } = req.body;

    try {
      await User.updateProfileDetails(userId, { mobileNumber, hostelNumber, roomNumber });
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  uploadProfileImage: async (req, res) => {
    const userId = req.user.userId;
    const { image } = req.body;

    try {
      await User.updateProfileImage(userId, image);
      res.json({ message: 'Profile image updated successfully' });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getusers: async (req, res) => {
    try {
      const result = await User.getAll();
      res.send(result);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  blockusers: async (req, res) => {
    try {
      const result = await User.getBlocked();
      res.send(result);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  reportUser : async (req, res) => {
    const userId = req.params.id;
    try {
      await User.reportById(userId);
      res.json({ message: 'Profile reported successfully' });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  getByID: async (req, res) => {
    const { userid } = req.params;

    try {
      const userResult = await User.findById(userid);

      if (!userResult || userResult.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user: userResult[0] });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = userController;