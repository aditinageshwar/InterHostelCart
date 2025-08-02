const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', itemController.getAllItems);
router.post('/', itemController.createItem);
router.get('/gender/:gender', itemController.getItemsByGender);
router.get('/hostel/:hostelNo',itemController.getItemsByHostel);
router.get('/:tag',itemController.getItemsByTag);
router.put('/item/:id', itemController.removeItem);
router.get('/item/:id',itemController.getItemById);

router.get('/:gender/:id', itemController.getItemsByGenderAndSeller);
router.post('/report',authenticateToken ,itemController.reportItem);

module.exports = router;