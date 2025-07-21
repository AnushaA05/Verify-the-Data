const express = require('express');
const router = express.Router();
const UploadHistory = require('../models/Upload');

// POST: Save upload to history
router.post('/history', async (req, res) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: 'userId and name are required' });
  }

  try {
    const newFile = new UploadHistory({ userId, name });
    await newFile.save();
    res.json({ message: 'Upload saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await UploadHistory.find({ userId: req.params.userId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
