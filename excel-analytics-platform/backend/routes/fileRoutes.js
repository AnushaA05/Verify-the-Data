// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const UploadHistory = require('../models/UploadHistory');

// Storage config — using memoryStorage, which is fine unless you want to save files on disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route   POST /api/file/upload
 * @desc    Uploads the Excel file
 */
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File uploaded', filename: req.file.originalname });
});

/**
 * @route   POST /api/file/history
 * @desc    Saves upload record to DB
 */
router.post('/history', async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: 'userId and name required' });
  }

  try {
    const upload = new UploadHistory({ userId, name });
    await upload.save();
    res.json({ message: 'Upload history saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/file/history/:userId
 * @desc    Fetches upload history for the user
 */
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await UploadHistory.find({ userId: req.params.userId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;





