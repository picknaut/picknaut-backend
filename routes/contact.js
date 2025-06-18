const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.database();
const contactRef = db.ref('contacts');

// POST contact form data
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newMessage = {
    name,
    email,
    message,
    timestamp: Date.now()
  };

  try {
    await contactRef.push(newMessage);
    res.status(200).json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store message' });
  }
});

module.exports = router;
