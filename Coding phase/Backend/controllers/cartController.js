const Cart = require('../models/cartModel');

const cartController = {
  addItemToCart: async (req, res) => {
    const userId = req.user.userId;
    const { itemId, quantity } = req.body;
    try {
      await Cart.addItem(userId, itemId); 
      res.status(201).json({ message: 'Item added to cart successfully' });
    } 
    catch (err) {
      console.error('Error adding item to cart:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getCartItems: async (req, res) => {
    const userId = req.user.userId;
    try {
      const items = await Cart.findByUserId(userId);
      res.status(200).json(items);
    } 
    catch (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  removeItemFromCart: async (req, res) => {
    const userId = req.user.userId;
    const { itemId } = req.body;
    try {
      await Cart.removeItem(userId, itemId);
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } 
    catch (err) {
      console.error('Error removing item from cart:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = cartController;