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
          {/*if i dont give the justify conetnt center and align item center why is search bar taking whole width */}
          <SearchBar onSearch={handleSearchAction} />
        </div>
        </main> 
        </div> 
    </Router>
  );
}

export default App
