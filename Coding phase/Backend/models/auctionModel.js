const pool = require('../config/db');

const Auction = {
  createAuction: async (itemNO) => {
    try {
      const [itemRows] = await pool.query("SELECT itemPrice,listingDate FROM item WHERE itemNO = ?", [itemNO]);
      const { itemPrice, listingDate } = itemRows[0];
      const endTime = new Date(listingDate);
      endTime.setMonth(endTime.getMonth() + 2);

      const sqlInsert = "INSERT INTO auctions (itemNO, startingBid, endTime) VALUES (?, ?, ?)";
      const [result] = await pool.query(sqlInsert, [itemNO, itemPrice, endTime]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  },

  getAuctionByItemId: async (itemId) => {
    try {
      const sqlSelect = "SELECT auctionId FROM auctions WHERE itemNO = ?";
      const [rows] = await pool.query(sqlSelect, [itemId]);
      return rows[0];
    } 
    catch (error) {
      throw error;
    }
  },

  getAuctionDetails: async (auctionId) => {
    try {
      const sqlSelect = "SELECT * FROM auctions WHERE auctionId = ?";
      const [rows] = await pool.query(sqlSelect, [auctionId]);
      return rows[0];
    } 
    catch (error) {
      throw error;
    }
  },

  getBidsByAuctionId: async (auctionId) => {
    try {
      const sqlSelect = "SELECT * FROM bids WHERE auctionId = ? ORDER BY bidAmount DESC";
      const [rows] = await pool.query(sqlSelect, [auctionId]);
      return rows;
    } 
    catch (error) {
      throw error;
    }
  },

  placeBid: async (auctionId, userid, bidAmount) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      const sqlInsert = "INSERT INTO bids (auctionId, userID, bidAmount) VALUES (?, ?, ?)";
      const [result] = await connection.query(sqlInsert, [auctionId, userid, bidAmount]);

      await connection.commit();
      return result;
    } 
    catch (error) {
      await connection.rollback();
      throw error;
    } 
    finally {
      connection.release();
    }
  },

  stopAuction: async (auctionId) => {
    try {
      const sqlUpdate = "UPDATE auctions SET endTime = NOW() WHERE auctionId = ?";
      const [result] = await pool.query(sqlUpdate, [auctionId]);
      return result;
    } 
    catch (error) {
      throw error;
    }
  },

  getHighestBid: async (auctionId) => {
    try {
      const sqlSelect = `
        SELECT bids.*, item.itemNO, item.sellerId
        FROM bids
        JOIN auctions ON bids.auctionId = auctions.auctionId
        JOIN item ON auctions.itemNO = item.itemNO
        WHERE bids.auctionId = ?
        ORDER BY bids.bidAmount DESC
        LIMIT 1
      `;
      const [rows] = await pool.query(sqlSelect, [auctionId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Auction;