import React from 'react';
import { FiMenu, FiPlus, FiSearch, FiX } from 'react-icons/fi';

function Header({ searchQuery, setSearchQuery, onCreateNote, sidebarOpen, setSidebarOpen, totalNotes }) {
  return (
    <header className="header" id="header">
      <div className="header-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title="Toggle sidebar"
          id="toggle-sidebar-btn"
        >
          <FiMenu />
        </button>
        <div className="logo">
          <div className="logo-icon">📝</div>
          <span className="logo-text">NoteVault</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            id="search-input"
            placeholder="Search notes by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              id="clear-search-btn"
            >
              <FiX />
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        <span className="note-count" id="note-count">
          {totalNotes} {totalNotes === 1 ? 'note' : 'notes'}
        </span>
        <button
          className="create-note-btn"
          onClick={onCreateNote}
          id="create-note-btn"
        >
          <FiPlus size={18} />
          <span>New Note</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
