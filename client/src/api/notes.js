import axios from 'axios';

const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Notes API
export const getNotes = (params = {}) => api.get('/notes', { params });
export const getNote = (id) => api.get(`/notes/${id}`);
export const createNote = (noteData) => api.post('/notes', noteData);
export const updateNote = (id, noteData) => api.put(`/notes/${id}`, noteData);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const togglePin = (id) => api.patch(`/notes/${id}/pin`);
export const toggleFavorite = (id) => api.patch(`/notes/${id}/favorite`);

// Tags API
export const getTags = () => api.get('/tags');

export default api;
