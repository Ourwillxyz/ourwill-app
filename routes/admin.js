const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const User = require('../models/User');

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Delete a user (admin only)
router.delete('/users/:id', isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
