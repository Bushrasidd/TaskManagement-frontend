import React from 'react';

const DeleteConfirmModal = ({ show, onClose, onConfirm, taskTitle }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
        <div className="modal-content border-0 shadow-lg rounded-3">
          
          <div className="modal-body p-4 text-center">
            <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger rounded-circle mb-3" style={{ width: '60px', height: '60px', fontSize: '28px' }}>
              ⚠️
            </div>
            
            <h5 className="fw-bold mb-2 text-dark">Delete Task?</h5>
            <p className="text-muted small px-2">
              Are you sure you want to permanently delete <strong className="text-dark">"{taskTitle || 'this task'}"</strong>? This action cannot be undone.
            </p>
          </div>

          <div className="modal-footer border-0 bg-light p-3 d-flex gap-2 justify-content-center rounded-bottom-3">
            <button type="button" className="btn btn-light px-4 fw-semibold text-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn text-white px-4 fw-bold shadow-sm" style={{ backgroundColor: '#d32f2f' }} onClick={onConfirm}>
              Yes, Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;