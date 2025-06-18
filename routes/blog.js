const express = require('express');
const router = express.Router();

// Make sure Firebase admin is initialized in your project (do this once globally)
const db = require('../firebaseConfig'); // ✅ safely initialized
const blogRef = db.ref('blogs');

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const snapshot = await blogRef.once('value');
    const data = snapshot.val();
    res.json(data || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET single blog post by ID
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const snapshot = await blogRef.child(postId).once('value');
    const data = snapshot.val();
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

module.exports = router;
