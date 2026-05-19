import React from 'react';

const TaskModel = (props) => {
    if (!props.showModel) return null;

  return(
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" aria-label="Close" onClick={props.handleCloseModel}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.target);
                    const taskData = {
                      id:Date.now(),
                      title: data.get('title'),
                      status: data.get('status'),
                      description: data.get('description')
                    };
                    props.onSubmit(taskData);
                    props.handleCloseModel();
                  }}>
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
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea name="description" className="form-control" rows="3" />
                    </div>
                      <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={props.handleCloseModel}>Close</button>
                      <button type="submit" className="btn btn-primary">Save Task</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
)};

export default TaskModel;