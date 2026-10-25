import React from 'react';
import { FiEdit2, FiTrash2, FiMapPin, FiStar } from 'react-icons/fi';

function NoteCard({ note, index, onEdit, onDelete, onTogglePin, onToggleFavorite, onTagClick }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  };

  const colorBarStyle = note.color && note.color !== '#1e1e2e'
    ? { backgroundColor: note.color }
    : {};

  return (
    <div
      className={`note-card ${note.isPinned ? 'pinned' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onEdit(note)}
      id={`note-card-${note._id}`}
    >
      {note.color && note.color !== '#1e1e2e' && (
        <div className="note-color-bar" style={colorBarStyle}></div>
      )}

      <div className="note-card-top">
        <h3 className="note-card-title">{note.title}</h3>
        <div className="note-card-actions">
          <button
            className={`note-action-btn ${note.isPinned ? 'pin-active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onTogglePin(note._id); }}
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            <FiMapPin />
          </button>
          <button
            className={`note-action-btn ${note.isFavorite ? 'fav-active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(note._id); }}
            title={note.isFavorite ? 'Remove favorite' : 'Add to favorites'}
          >
            <FiStar />
          </button>
          <button
            className="note-action-btn"
            onClick={(e) => { e.stopPropagation(); onEdit(note); }}
            title="Edit"
          >
            <FiEdit2 />
          </button>
          <button
            className="note-action-btn delete"
            onClick={(e) => { e.stopPropagation(); onDelete(note); }}
            title="Delete"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <p className="note-card-content">{note.content}</p>

      <div className="note-card-footer">
        <div className="note-card-tags">
          {note.tags && note.tags.map((tag) => (
            <span
              key={tag}
              className="note-tag"
              onClick={(e) => { e.stopPropagation(); onTagClick(tag); }}
            >
              #{tag}
            </span>
          ))}
        </div>
        <span className="note-card-date">{formatDate(note.updatedAt)}</span>
      </div>

      {/* Pin indicator always visible when pinned */}
      {note.isPinned && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          opacity: 1,
          color: 'var(--accent-primary)',
          fontSize: 12
        }}>
          <FiMapPin />
        </div>
      )}

      {/* Favorite indicator */}
      {note.isFavorite && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: note.isPinned ? 30 : 12,
          opacity: 1,
          color: '#ef4444',
          fontSize: 12
        }}>
          <FiStar />
        </div>
      )}
    </div>
  );
}

export default NoteCard;
