const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/notes - Get all notes with optional filtering
router.get('/', async (req, res) => {
  try {
    const { search, tag, pinned, favorite, sort } = req.query;
    let query = {};

    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by tag
    if (tag) {
      query.tags = tag.toLowerCase();
    }

    // Filter by pinned
    if (pinned === 'true') {
      query.isPinned = true;
    }

    // Filter by favorite
    if (favorite === 'true') {
      query.isFavorite = true;
    }

    // Sort options
    let sortOption = { isPinned: -1, updatedAt: -1 };
    if (sort === 'oldest') {
      sortOption = { isPinned: -1, createdAt: 1 };
    } else if (sort === 'title') {
      sortOption = { isPinned: -1, title: 1 };
    }

    const notes = await Note.find(query).sort(sortOption);
    res.json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
});

// GET /api/notes/:id - Get single note
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    console.error('Error fetching note:', err);
    res.status(500).json({ message: 'Server error while fetching note' });
  }
});

// POST /api/notes - Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, tags, color, isPinned } = req.body;

    // Clean and deduplicate tags
    const cleanTags = tags
      ? [...new Set(tags.map(t => t.trim().toLowerCase()).filter(t => t.length > 0))]
      : [];

    const note = new Note({
      title,
      content,
      tags: cleanTags,
      color: color || '#1e1e2e',
      isPinned: isPinned || false
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    console.error('Error creating note:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error while creating note' });
  }
});

// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags, color, isPinned, isFavorite } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (tags !== undefined) {
      updateData.tags = [...new Set(tags.map(t => t.trim().toLowerCase()).filter(t => t.length > 0))];
    }
    if (color !== undefined) updateData.color = color;
    if (isPinned !== undefined) updateData.isPinned = isPinned;
    if (isFavorite !== undefined) updateData.isFavorite = isFavorite;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    console.error('Error updating note:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error while updating note' });
  }
});

// PATCH /api/notes/:id/pin - Toggle pin status
router.patch('/:id/pin', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.isPinned = !note.isPinned;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error('Error toggling pin:', err);
    res.status(500).json({ message: 'Server error while toggling pin' });
  }
});

// PATCH /api/notes/:id/favorite - Toggle favorite status
router.patch('/:id/favorite', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.isFavorite = !note.isFavorite;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error('Error toggling favorite:', err);
    res.status(500).json({ message: 'Server error while toggling favorite' });
  }
});

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Server error while deleting note' });
  }
});

module.exports = router;
