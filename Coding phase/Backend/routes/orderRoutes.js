const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/seller', authenticateToken, orderController.getOrderBySellerId);
router.get('/buyer', authenticateToken, orderController.getOrderByBuyerId);

module.exports = router;