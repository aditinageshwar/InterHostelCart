const Order = require('../models/orderModel');
const Auction = require('../models/auctionModel');

const orderController = {
  getOrderBySellerId: async (req, res) => {
    const userId = req.user.userId;
    try {
      const orders = await Order.findBySellerId(userId);

      if (orders.length === 0) {
        return res.status(200).json([]);
      }
      res.json(orders);
    } 
    catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getOrderByBuyerId: async (req, res) => {
    const userId = req.user.userId;
    try {
      const orders = await Order.findByBuyerId(userId);

      if (orders.length === 0) {
        return res.status(200).json([]);
      }
      res.json(orders);
    } 
    catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = orderController;