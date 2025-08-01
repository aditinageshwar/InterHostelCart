const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb)
  {
    return cb(null, 'uploads'); 
  },
  filename: function (req, file, cb)
  {
    return cb(null, `${Date.now()} - ${file.originalname}`);
  }
});
const upload = multer({ storage: storage, limits: {fileSize: 10 * 1024 * 1024}});

router.post('/uploadImage', upload.single('itemPhotoURL'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: req.file.path
  });
});

module.exports = router;