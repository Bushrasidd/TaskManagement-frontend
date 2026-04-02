import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SearchBar from './Components/SearchBar';

function App() {
  const [showModel, setShowModel] = useState(false);

  const handleCloseModel = () => {
    setShowModel(false);
    console.log("Model closed");
  }
  const handleOpenModel = () => {
    setShowModel(true);
    console.log("Model opened");
  }
  const handleSearchAction = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  return (
    <Router>
      <div className="app-container">
      <Navbar />   
      <main className='content-area'>
        <div className='d-flex justify-content-center align-items-center mt-4'>
        <h1>Task Management App</h1>
        </div>
        <div className='d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 gap-md-5'>
          <SearchBar onSearch={handleSearchAction} />
          <button className='btn create-btn ms-4' onClick={handleOpenModel}>Create</button>
        </div>
        <div className='container-fluid p-5 mt-4'>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px"}}>
            <h5 className="text-warning">PENDING</h5>
            {/* <div className="border p-2 mt-2">Pending</div> */}
          </div>
        </div>
          <div className="col-12 col-md-6 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
            <h5 className="text-warning ">IN PROGRESS</h5>
            {/* <div className="border p-2 mt-2">In-progress</div> */}
          </div>
        </div>
          <div className="col-12 col-md-6 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
            <h5 className="text-warning">COMPLETED</h5>
            {/* <div className="border p-2 mt-2">Completed</div> */}
          </div>
        </div>
          <div className="col-12 col-md-6 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
            <h5 className="text-warning">REVIEW</h5>
            {/* <div className="border p-2 mt-2">Review</div> */}
          </div>
        </div>
        </div>
        </div>
        </main> 
        {showModel && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Task</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModel}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.target);
                    const task = { title: data.get('title'), description: data.get('description') };
                    console.log('Create task', task);
                    handleCloseModel();
                  }}>
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input name="title" type="text" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea name="description" className="form-control" rows="3" />
                    </div>
                      <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleCloseModel}>Close</button>
                      <button type="submit" className="btn btn-primary">Save Task</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </Router>
  );
}

export default App

