import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="card">
        <h1>User Management Dashboard</h1>
      </div>
    </Router>
  );
}

export default App
