import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

function DeleteConfirm({ note, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel} id="delete-modal-overlay">
      <div className="modal delete-modal" onClick={(e) => e.stopPropagation()} id="delete-modal">
        <div className="delete-icon">
          <FiTrash2 />
        </div>
        <h3 className="delete-title">Delete Note?</h3>
        <p className="delete-message">
          This action cannot be undone. Are you sure you want to delete:
        </p>
        <p className="delete-note-title">"{note.title}"</p>
        <div className="delete-actions">
          <button className="btn-cancel" onClick={onCancel} id="cancel-delete-btn">
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm} id="confirm-delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
