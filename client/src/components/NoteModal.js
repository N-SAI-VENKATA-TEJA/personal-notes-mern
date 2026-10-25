import React, { useState, useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

const NOTE_COLORS = [
  { value: '#1e1e2e', label: 'Default' },
  { value: '#ef4444', label: 'Red' },
  { value: '#f97316', label: 'Orange' },
  { value: '#eab308', label: 'Yellow' },
  { value: '#22c55e', label: 'Green' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#10b981', label: 'Emerald' },
];

function NoteModal({ note, onSave, onClose, existingTags }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [color, setColor] = useState(note?.color || '#1e1e2e');
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddTag = (tagValue) => {
    const cleaned = tagValue.trim().toLowerCase();
    if (cleaned && !tags.includes(cleaned)) {
      setTags([...tags, cleaned]);
    }
    setTagInput('');
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput);
    } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onSave({
      title: title.trim(),
      content: content.trim(),
      tags,
      color,
      isPinned,
    });
  };

  // Filter suggestions: existing tags not already selected
  const suggestions = existingTags
    .filter(t => !tags.includes(t))
    .filter(t => !tagInput || t.includes(tagInput.toLowerCase()))
    .slice(0, 8);

  const isValid = title.trim() && content.trim();

  return (
    <div className="modal-overlay" onClick={onClose} id="note-modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()} id="note-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {note ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button className="modal-close" onClick={onClose} id="modal-close-btn">
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="note-title">Title</label>
            <input
              ref={titleRef}
              type="text"
              className="form-input"
              id="note-title"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label className="form-label" htmlFor="note-content">Content</label>
            <textarea
              className="form-textarea"
              id="note-content"
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Tags */}
          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="tags-input-container" onClick={() => document.getElementById('tag-input').focus()}>
              {tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  #{tag}
                  <button
                    className="tag-chip-remove"
                    onClick={() => handleRemoveTag(tag)}
                    type="button"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="tag-input"
                id="tag-input"
                placeholder={tags.length === 0 ? "Type a tag and press Enter..." : "Add more tags..."}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => tagInput && handleAddTag(tagInput)}
              />
            </div>
            {suggestions.length > 0 && (
              <div className="tag-suggestions">
                {suggestions.map((tag) => (
                  <button
                    key={tag}
                    className="tag-suggestion"
                    onClick={() => handleAddTag(tag)}
                    type="button"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color & Pin */}
          <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <label className="form-label">Color Label</label>
              <div className="color-picker">
                {NOTE_COLORS.map((c) => (
                  <button
                    key={c.value}
                    className={`color-option ${color === c.value ? 'selected' : ''}`}
                    style={{ backgroundColor: c.value }}
                    onClick={() => setColor(c.value)}
                    title={c.label}
                    type="button"
                  />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  style={{ accentColor: 'var(--accent-primary)', width: 16, height: 16 }}
                />
                Pin note to top
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose} id="cancel-btn">
            Cancel
          </button>
          <button
            className="btn-save"
            onClick={handleSubmit}
            disabled={!isValid}
            id="save-note-btn"
          >
            {note ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
