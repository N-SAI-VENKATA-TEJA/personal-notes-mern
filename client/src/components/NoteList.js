import React from 'react';
import NoteCard from './NoteCard';

function NoteList({ notes, onEdit, onDelete, onTogglePin, onToggleFavorite, onTagClick }) {
  const pinnedNotes = notes.filter(n => n.isPinned);
  const unpinnedNotes = notes.filter(n => !n.isPinned);

  return (
    <div id="note-list">
      {pinnedNotes.length > 0 && (
        <>
          <h2 style={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: 'var(--text-muted)',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            📌 Pinned
          </h2>
          <div className="note-grid" style={{ marginBottom: 32 }}>
            {pinnedNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                note={note}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
                onToggleFavorite={onToggleFavorite}
                onTagClick={onTagClick}
              />
            ))}
          </div>
        </>
      )}

      {unpinnedNotes.length > 0 && (
        <>
          {pinnedNotes.length > 0 && (
            <h2 style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: 'var(--text-muted)',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              📋 Others
            </h2>
          )}
          <div className="note-grid">
            {unpinnedNotes.map((note, index) => (
              <NoteCard
                key={note._id}
                note={note}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
                onToggleFavorite={onToggleFavorite}
                onTagClick={onTagClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default NoteList;
