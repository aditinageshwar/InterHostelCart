const Auction = require("../models/auctionModel");
const Order = require("../models/orderModel");

const auctionController = (io) => ({
  createAuction: async (req, res) => {
    try {
      const {itemNO} = req.body;
      const result = await Auction.createAuction(itemNO);
      res.status(201).json({
        message: "Auction created successfully",
        auction: result[0],
      });
    } catch (err) {
      console.error("Error creating auction:", err);
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

  getAuctionDetails: async (req, res) => {
    try {
      const { auctionId } = req.params;
      const result = await Auction.getAuctionDetails(auctionId);
      res.json({ auction: result });
    } catch (err) {
      console.error("Error fetching auction:", err);
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

  placeBid: async (req, res) => {
    try {
      const { auctionId, userid, bidAmount } = req.body;
      const result = await Auction.placeBid(auctionId, userid, bidAmount); 
      io.to(auctionId).emit("newBid", result[0]);
      res.status(201).json({ message: "Bid placed successfully", bid: result[0] });
    } catch (err) {
      console.error("Error placing bid:", err);
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
        highestBid.userID,
        highestBid.itemNO,
        highestBid.sellerId,      
        highestBid.bidAmount
      );

      res.status(201).json({
        message: "Auction stopped and order created successfully",
        order: {
          sellerId: highestBid.sellerId,
          buyerId: highestBid.userID,
          itemNO: highestBid.itemNO,
          bidAmount: highestBid.bidAmount
        },
        auction: { auctionId, status: "stopped" },
      });
    } catch (err) {
      console.error("Error stopping auction:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
});

module.exports = auctionController;