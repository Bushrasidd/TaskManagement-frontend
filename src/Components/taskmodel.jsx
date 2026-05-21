import React, { useEffect, useState } from 'react';

const TaskModel = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    priority: '',
    description: '',
    assignedTo: ''
  });

  useEffect(() => {
    if (props.editingTask) {
      setFormData({
        title: props.editingTask.title || '',
        status: props.editingTask.status || '',
        priority: props.editingTask.priority || '',
        description: props.editingTask.description || '',
        assignedTo: props.editingTask.assignedTo || ''
      });
    } else {
      setFormData({ title: '', status: '', priority: '', description: '', assignedTo: '' });
    }
  }, [props.editingTask, props.showModel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await props.onSubmit(formData);
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!props.showModel) return null;

  const canAssignTask = props.userRole === 'super_admin' || props.userRole === 'manager';

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.editingTask ? "Edit Task" : "Create Task"}</h5>
            <button type="button" className="btn-close" onClick={props.handleCloseModel}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input name="title" value={formData.title} onChange={handleChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="form-select" required>
                  <option value="">Select status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="form-select" required>
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {canAssignTask && (
                <div className="mb-3">
                  <label className="form-label">Assign Task To</label>
                  <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="form-select">
                    <option value="">Self (Default)</option>
                    {Array.isArray(props.users) && props.users.map((user) => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="3" />
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