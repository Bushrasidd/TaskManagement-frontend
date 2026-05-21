import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import SearchBar from '../Components/SearchBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';
import { useState, useEffect } from 'react';
import { fetchDashboardData } from '../services/authService';

function Dashboard({ alltasks, handleOpenModel, handleSearchAction, onEditClick, onDeleteClick, stats, tasks, fetchStats }) {
  const rawUserData = localStorage.getItem('user');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const userRole = loggedInUser ? loggedInUser.role : null;

  useEffect(() => {
    if (localStorage.getItem('token')) {
        fetchStats(); 
    }
}, []);
 

  const dashboardCards = [
    { label: 'Total Tasks', value: stats.total || 0, color: '#D9654D' },
    { label: 'Pending Tasks', value: stats.pending || 0, color: '#D9654D' },
    { label: 'In Progress', value: stats.inProgress || 0, color: '#D9654D' },

  ];

  const renderTaskColumn = (statusLabel, statusCode, bootstrapTextColor) => {
    return (
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card border-warning p-3 bg-white shadow-sm" style={{ minHeight: "400px" }}>
          <h5 className={`fw-bold text-uppercase ${bootstrapTextColor}`}>{statusLabel}</h5>

          {tasks
            .filter(task => task.status === statusCode)
            .map(task => (
              <Stack
                key={task.id}
                direction="column" // Changed to column to stack elements vertically
                className="task_container border p-2 mt-2 bg-white"
                sx={{ width: '100%' }}
              >
                {/* Title and Action Icons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className="small mb-0 text-dark fw-medium">{task.title}</p>
                  <Box>
                    <IconButton size="small" onClick={() => onEditClick(task)}><EditIcon fontSize="small" /></IconButton>
                   
                    <IconButton size="small" sx={{ color: '#d32f2f' }} onClick={() => onDeleteClick(task)}><DeleteIcon fontSize="small" /></IconButton>
                  </Box>
                </Box>

                {/* Display Assignee Name */}
                <p className="xsmall text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                  Assigned to: <strong>{task.assignee?.name || "Unassigned"}</strong>
                </p>
              </Stack>
            ))
          }
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="content-area">

        <div className="d-flex justify-content-center align-items-center mt-4">
          <h1 className="fw-bold" style={{ color: '#D9654D' }}>Task Management App</h1>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 gap-md-3">
          <SearchBar onSearch={handleSearchAction} />
          <button className="btn create-btn ms-md-3 mt-3 mt-md-0" onClick={handleOpenModel}>
            Create
          </button>
        </div>
        <div className="row g-3 mt-5 justify-content-center">
          {dashboardCards.map((card, index) => (
            <div key={index} className="col-12 col-md-3">
              <div className="card border-0 shadow-sm rounded-3 py-3 text-center" style={{ backgroundColor: '#FFF5F2' }}>
                <div className="card-body">
                  <h6 className="text-uppercase fw-bold small mb-1 tracking-wider" style={{ color: card.color, opacity: 0.9, letterSpacing: '0.5px' }}>
                    {card.label}
                  </h6>
                  <h2 className="display-6 fw-bold mb-0" style={{ color: card.color }}>
                    {card.value}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="container-fluid p-4 mt-2">
          <div className="row g-4">
            {renderTaskColumn("Pending", "pending", "text-danger")}
            {renderTaskColumn("In Progress", "in-progress", "text-warning")}
            {renderTaskColumn("Completed", "completed", "text-success")}
            {renderTaskColumn("Review", "review", "text-info")}
          </div>
          <footer className="w-100 py-3 mt-5 text-center">
            <div className="container">
              <p className="mb-1 small fw-bold text-muted">
                &copy; {new Date().getFullYear()} <span style={{ color: '#D9654D' }}>Task Management App</span>. All rights reserved.
              </p>
              <p className="mb-2 xsmall text-muted" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                Created by <span className="fw-bold" style={{ color: '#D9654D' }}>Bushra</span>
              </p>
              <div className="d-flex justify-content-center gap-3 small">
                <a href="#privacy" className="text-decoration-none text-muted" style={{ fontSize: '0.75rem' }}>Privacy Policy</a>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>&bull;</span>
                <a href="#terms" className="text-decoration-none text-muted" style={{ fontSize: '0.75rem' }}>Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;