const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/tags - Get all unique tags with counts
router.get('/', async (req, res) => {
  try {
    const tags = await Note.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1, _id: 1 } },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1
        }
      }
    ]);
    res.json(tags);
  } catch (err) {
    console.error('Error fetching tags:', err);
    res.status(500).json({ message: 'Server error while fetching tags' });
  }
});

module.exports = router;
