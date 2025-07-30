const Auction = require("../models/auctionModel");
const Order = require("../models/orderModel");

const auctionController = (io) => ({
  createAuction: async (req, res) => {
    try {
      const { itemId, startingBid, endTime } = req.body;
      const result = await Auction.createAuction(itemId, startingBid, endTime);
      res.status(201).json({
        message: "Auction created successfully",
        auction: result[0],
      });
    } catch (err) {
      console.error("Error creating auction:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAuctionById: async (req, res) => {
    try {
      const { auctionId } = req.params;
      const result = await Auction.getAuctionById(auctionId);
      res.json({ auction: result });
    } catch (err) {
      console.error("Error fetching auction:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  placeBid: async (req, res) => {
    try {
      const { auctionId, userId, bidAmount } = req.body;
      const result = await Auction.placeBid(auctionId, userId, bidAmount);
      io.to(auctionId).emit("newBid", result[0]);
      res.status(201).json({ message: "Bid placed successfully", bid: result[0] });
    } catch (err) {
      console.error("Error placing bid:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getHighestBid: async (req, res) => {
    try {
      const { auctionId } = req.params;
      const result = await Auction.getHighestBid(auctionId);
      res.json({ highestBid: result });
    } catch (err) {
      console.error("Error fetching highest bid:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getBidsByAuctionId: async (req, res) => {
    try {
      const { auctionId } = req.params;
      const result = await Auction.getBidsByAuctionId(auctionId);
      res.json({ bids: result });
    } catch (err) {
      console.error("Error fetching bids:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  stopAuction: async (req, res) => {
    try {
      const { auctionId } = req.body;
      await Auction.stopAuction(auctionId);
      const highestBid = await Auction.getHighestBid(auctionId);

      if (!highestBid) {
        return res.status(400).json({ error: "No bids placed on this auction" });
      }

      const order = await Order.create(
        highestBid.sellerid,
        highestBid.userid,
        highestBid.itemno,
        highestBid.bidamount
      );

      res.status(201).json({
        message: "Auction stopped and order created successfully",
        order: order[0],
      });
    } catch (err) {
      console.error("Error stopping auction:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAuctionByItemId: async (req, res) => {
    try {
      const { itemId } = req.params;
      const result = await Auction.getAuctionByItemId(itemId);
      if (!result) {
        return res.status(404).json({ error: "Auction not found" });
      }
      res.json({ auctionId: result.auctionId });
    } catch (err) {
      console.error("Error fetching auction:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  finalizeAuction: async (req, res) => {
    try {
      const { auctionId } = req.params;

      const highestBid = await Auction.getHighestBid(auctionId);
      if (!highestBid) {
        return res.status(404).json({ error: "No bids found for this auction" });
      }

      const orderDetails = {
        auctionId,
        userId: highestBid.userid,
        bidAmount: highestBid.bidamount,
        itemId: highestBid.itemno,
        sellerId: highestBid.sellerid,
      };

      const orderResult = await Order.createOrder(orderDetails);
      await Auction.stopAuction(auctionId);

      res.status(200).json({
        message: "Auction finalized and order placed successfully",
        order: orderResult[0],
        auction: { auctionId, status: "stopped" },
      });
    } catch (err) {
      console.error("Error finalizing auction:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
});

module.exports = auctionController;