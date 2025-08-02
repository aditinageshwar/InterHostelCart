const Cart = require('../models/cartModel');

const cartController = {
  addItemToCart: async (req, res) => {
    const { itemNO, userID } = req.body;
    try {
      await Cart.addItem(itemNO, userID); 
      res.status(201).json({ message: 'Item added to cart successfully' });
    } 
    catch (err) {
      console.error('Error adding item to cart:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getCartItems: async (req, res) => {
    const userID = req.user.userId;                       //from login credentials
    try {
      const items = await Cart.findByUserId(userID);
      res.status(200).json(items);
    } 
    catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  removeItemFromCart: async (req, res) => {
    const userID = req.user.userId;
    const { itemNO } = req.body;
    try {
      await Cart.removeItem(itemNO, userID);
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } 
    catch (err) {
      console.error('Error removing item from cart:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = cartController;