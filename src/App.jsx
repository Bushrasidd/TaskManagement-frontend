import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="app-container">
      <Navbar />   
      <main className='content-area'>
        <h1>Welcome to the Task Management App</h1>
        </main> 
        </div> 
    </Router>
  );
}

export default App
