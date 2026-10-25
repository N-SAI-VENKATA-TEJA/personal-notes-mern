import React from 'react';
import { FiPlus, FiSearch, FiX } from 'react-icons/fi';

function EmptyState({ searchQuery, selectedTag, viewFilter, onCreateNote, onClearFilters }) {
  const hasFilters = searchQuery || selectedTag || viewFilter !== 'all';

  if (hasFilters) {
    return (
      <div className="empty-state" id="empty-state">
        <div className="empty-icon">🔍</div>
        <h2 className="empty-title">No notes found</h2>
        <p className="empty-subtitle">
          {searchQuery && `No results for "${searchQuery}". `}
          {selectedTag && `No notes tagged with "${selectedTag}". `}
          {viewFilter === 'pinned' && 'No pinned notes yet. '}
          {viewFilter === 'favorites' && 'No favorite notes yet. '}
          Try adjusting your filters or search terms.
        </p>
        <button className="clear-filters-btn" onClick={onClearFilters} id="clear-filters-btn">
          <FiX style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state" id="empty-state">
      <div className="empty-icon">✨</div>
      <h2 className="empty-title">Welcome to NoteVault</h2>
      <p className="empty-subtitle">
        Your personal notes organizer. Create your first note to get started — add tags, colors, and pin important notes!
      </p>
      <button className="empty-btn" onClick={onCreateNote} id="create-first-note-btn">
        <FiPlus size={18} />
        Create Your First Note
      </button>
    </div>
  );
}

export default EmptyState;
