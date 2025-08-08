const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/message/:room', chatController.getMessages);
router.post('/', chatController.saveMessage);
router.get('/roomno/:userid', chatController.getRoom);

module.exports = router;