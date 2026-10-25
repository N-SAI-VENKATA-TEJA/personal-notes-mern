import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteModal from './components/NoteModal';
import DeleteConfirm from './components/DeleteConfirm';
import EmptyState from './components/EmptyState';
import { getNotes, createNote, updateNote, deleteNote, togglePin, toggleFavorite, getTags } from './api/notes';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewFilter, setViewFilter] = useState('all'); // all, pinned, favorites
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedTag) params.tag = selectedTag;
      if (viewFilter === 'pinned') params.pinned = 'true';
      if (viewFilter === 'favorites') params.favorite = 'true';
      if (sortBy === 'oldest') params.sort = 'oldest';
      if (sortBy === 'title') params.sort = 'title';

      const response = await getNotes(params);
      setNotes(response.data);
    } catch (err) {
      toast.error('Failed to load notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedTag, sortBy, viewFilter]);

  const fetchTags = useCallback(async () => {
    try {
      const response = await getTags();
      setTags(response.data);
    } catch (err) {
      console.error('Failed to load tags:', err);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
    fetchTags();
  }, [fetchNotes, fetchTags]);

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      toast.success('Note created successfully!');
      setShowModal(false);
      fetchNotes();
      fetchTags();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create note');
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      await updateNote(id, noteData);
      toast.success('Note updated successfully!');
      setShowModal(false);
      setEditingNote(null);
      fetchNotes();
      fetchTags();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update note');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      toast.success('Note deleted successfully!');
      setDeleteConfirm(null);
      fetchNotes();
      fetchTags();
    } catch (err) {
      toast.error('Failed to delete note');
    }
  };

  const handleTogglePin = async (id) => {
    try {
      await togglePin(id);
      fetchNotes();
    } catch (err) {
      toast.error('Failed to toggle pin');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await toggleFavorite(id);
      fetchNotes();
    } catch (err) {
      toast.error('Failed to toggle favorite');
    }
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
  };

  const totalNotes = notes.length;

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateNote={openCreateModal}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        totalNotes={totalNotes}
      />

      <div className="app-layout">
        <Sidebar
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          viewFilter={viewFilter}
          setViewFilter={setViewFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isOpen={sidebarOpen}
          totalNotes={totalNotes}
        />

        <main className={`main-content ${sidebarOpen ? '' : 'sidebar-closed'}`}>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your notes...</p>
            </div>
          ) : notes.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              viewFilter={viewFilter}
              onCreateNote={openCreateModal}
              onClearFilters={() => {
                setSearchQuery('');
                setSelectedTag('');
                setViewFilter('all');
              }}
            />
          ) : (
            <NoteList
              notes={notes}
              onEdit={openEditModal}
              onDelete={(note) => setDeleteConfirm(note)}
              onTogglePin={handleTogglePin}
              onToggleFavorite={handleToggleFavorite}
              onTagClick={(tag) => setSelectedTag(tag)}
            />
          )}
        </main>
      </div>

      {showModal && (
        <NoteModal
          note={editingNote}
          onSave={editingNote
            ? (data) => handleUpdateNote(editingNote._id, data)
            : handleCreateNote
          }
          onClose={closeModal}
          existingTags={tags.map(t => t.name)}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirm
          note={deleteConfirm}
          onConfirm={() => handleDeleteNote(deleteConfirm._id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#1a1a3e',
          border: '1px solid rgba(108, 92, 231, 0.2)',
          borderRadius: '12px',
        }}
      />
    </div>
  );
}

export default App;
