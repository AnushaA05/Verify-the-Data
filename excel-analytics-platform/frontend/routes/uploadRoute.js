const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up multer storage (in memory for now)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint (single file named 'file')
router.post('/excel', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  // For now just respond with file info
  res.json({
    filename: req.file.originalname,
    size: req.file.size,
  });
});

module.exports = router;
