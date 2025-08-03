const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

module.exports = (io) => {
  const auctionController = require('../controllers/auctionController')(io);

  router.post('/create', authenticateToken, auctionController.createAuction);
  router.get('/item/:itemId', auctionController.getAuctionByItemId);
  router.get('/:auctionId', auctionController.getAuctionDetails);
  router.get('/:auctionId/bids', auctionController.getBidsByAuctionId);
  router.post('/new/bid', authenticateToken, auctionController.placeBid);
  router.post('/stop', authenticateToken, auctionController.stopAuction);

  return router;
};
