const Order = require('../models/orderModel');
const Auction = require('../models/auctionModel');

const orderController = {
  createOrder: async (req, res) => {
    const { auctionId } = req.body;

    try {
      const bidResult = await Auction.getHighestBid(auctionId);
      const highestBid = bidResult[0];

      if (!highestBid) {
        return res.status(400).json({ error: 'No bids placed on this auction' });
      }

      const orderResult = await Order.create(
        highestBid.sellerid,
        highestBid.userid,
        highestBid.itemid,
        highestBid.bidamount
      );

      res.status(201).json({
        message: 'Order created successfully',
        order: orderResult
      });

    } 
    catch (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getUserOrders: async (req, res) => {
    const userId = req.user.userId;
    try {
      const orders = await Order.findByUserId(userId);
      res.json({ orders });
    } 
    catch (err) {
      console.error('Error retrieving orders:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getOrderById: async (req, res) => {
    const orderId = req.params.id;
    try {
      const order = await Order.findById(orderId);

      if (order.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ order: order[0] });
    } 
    catch (err) {
      console.error('Error retrieving order:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = orderController;