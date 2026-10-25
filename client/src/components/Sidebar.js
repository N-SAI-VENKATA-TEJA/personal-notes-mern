import React from 'react';
import { FiFileText, FiStar, FiMapPin, FiTag, FiHash } from 'react-icons/fi';

function Sidebar({ tags, selectedTag, setSelectedTag, viewFilter, setViewFilter, sortBy, setSortBy, isOpen, totalNotes }) {
  return (
    <aside className={`sidebar ${isOpen ? '' : 'closed'}`} id="sidebar">
      {/* View Filters */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Views</div>
        <button
          className={`sidebar-item ${viewFilter === 'all' ? 'active' : ''}`}
          onClick={() => { setViewFilter('all'); setSelectedTag(''); }}
          id="filter-all"
        >
          <span className="sidebar-item-icon"><FiFileText /></span>
          All Notes
          <span className="sidebar-item-count">{totalNotes}</span>
        </button>
        <button
          className={`sidebar-item ${viewFilter === 'pinned' ? 'active' : ''}`}
          onClick={() => { setViewFilter('pinned'); setSelectedTag(''); }}
          id="filter-pinned"
        >
          <span className="sidebar-item-icon"><FiMapPin /></span>
          Pinned
        </button>
        <button
          className={`sidebar-item ${viewFilter === 'favorites' ? 'active' : ''}`}
          onClick={() => { setViewFilter('favorites'); setSelectedTag(''); }}
          id="filter-favorites"
        >
          <span className="sidebar-item-icon"><FiStar /></span>
          Favorites
        </button>
      </div>

      {/* Sort */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Sort By</div>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          id="sort-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      {/* Tags */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <FiTag style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Tags
        </div>
        {tags.length === 0 ? (
          <p style={{ padding: '8px 12px', fontSize: 13, color: 'var(--text-muted)' }}>
            No tags yet
          </p>
        ) : (
          <>
            <button
              className={`sidebar-tag-item ${selectedTag === '' ? 'active' : ''}`}
              onClick={() => { setSelectedTag(''); setViewFilter('all'); }}
              id="tag-all"
            >
              <FiHash size={12} />
              All Tags
            </button>
            {tags.map((tag) => (
              <button
                key={tag.name}
                className={`sidebar-tag-item ${selectedTag === tag.name ? 'active' : ''}`}
                onClick={() => { setSelectedTag(tag.name); setViewFilter('all'); }}
                id={`tag-${tag.name}`}
              >
                <span className="sidebar-tag-dot"></span>
                {tag.name}
                <span className="sidebar-tag-count">{tag.count}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
