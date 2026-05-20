import React from 'react';
import { createTask, getAllUsers } from '../services/authService';
import { useEffect, useState } from 'react';
// import { useState } from 'react';

const TaskModel = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  if (!props.showModel) return null;
  const canAssignTask = props.userRole === 'super_admin' || props.userRole === 'manager';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const taskData = {
      title: formData.get('title'),
      status: formData.get('status'),
      priority: formData.get('priority'),
      description: formData.get('description'),
      assignedTo: canAssignTask ? formData.get('assignedTo') : null
    };

    try {
      // 1. Attempt the request
      const response = await createTask(taskData);

      setMessage({ type: 'success', text: 'Task successfully created!' });
      setTimeout(() => {
        if (props.onTaskAdded) props.onTaskAdded(response.task);
        props.handleCloseModel();
      }, 1500);
      // if (props.onTaskAdded) {
      //   props.onTaskAdded(response.task);
      // }
      // props.handleCloseModel();

    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message);
      setMessage({ type: 'danger', text: err.message || 'Failed to create task. Please try again.' });
    } finally {
      // 4. Always runs
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" aria-label="Close" onClick={props.handleCloseModel}></button>
          </div>
          <div className="modal-body">
            {message.text && (
              <div className={`alert alert-${message.type}`} role="alert">
                {message.text}
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input name="title" type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" required>
                  <option value="">Select status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="review">Review</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select name="priority" className="form-select" required>
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {canAssignTask && (
                <div className="mb-3">
                  <label className="form-label">Assign Task To</label>
                  <select name="assignedTo" className="form-select">
                    <option value="">Self (Default)</option>

                    {/* Map through the users passed from the parent */}
                    {Array.isArray(props.users) && props.users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" rows="3" />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={props.handleCloseModel}>Close</button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TaskModel;