import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SearchBar from './Components/SearchBar';

function App() {
  const handleSearchAction = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  return (
    <Router>
      <div className="app-container">
      <Navbar />   
      <main className='content-area'>
        <div className='d-flex justify-content-center align-items-center mt-4'>
        <h1>Welcome to the Task Management App</h1>
        {/* <button className='btn btn-light ms-5'>Create</button> */}
        </div>
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <SearchBar onSearch={handleSearchAction} />
        </div>
        <div className='container-fluid p-4 mt-4'>
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px"}}>
            <h5 className="text-warning">PENDING</h5>
            {/* <div className="border p-2 mt-2">Pending</div> */}
          </div>
        </div>
          <div className="col-12 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
            <h5 className="text-warning">IN PROGRESS</h5>
            {/* <div className="border p-2 mt-2">In-progress</div> */}
          </div>
        </div>
          <div className="col-12 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
            <h5 className="text-warning">COMPLETED</h5>
            {/* <div className="border p-2 mt-2">Completed</div> */}
          </div>
        </div>
          <div className="col-12 col-lg-3">
              <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
            <h5 className="text-warning">REVIEW</h5>
            {/* <div className="border p-2 mt-2">Review</div> */}
          </div>
        </div>
        </div>
        </div>
        </main> 
        </div> 
    </Router>
  );
}

export default App

