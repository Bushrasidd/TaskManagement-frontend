import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import SearchBar from '../Components/SearchBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';

function Dashboard({ alltasks, handleOpenModel, handleSearchAction, onEditClick, onDeleteClick }) {
  
  const renderTaskColumn = (statusLabel, statusCode, bootstrapTextColor) => {
    return (
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card border-warning p-3 bg-white shadow-sm" style={{ minHeight: "400px" }}>
          <h5 className={`fw-bold text-uppercase ${bootstrapTextColor}`}>{statusLabel}</h5>
          
          {alltasks
            .filter(task => task.status === statusCode)
            .map(task => (
              <Stack
                key={task.id}
                direction="row"
                alignItems="center"
                className="task_container border p-2 mt-2 bg-white"
                sx={{ width: '100%' }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <p className="small mb-0 text-dark fw-medium">{task.title}</p>
                </Box>

                <IconButton 
                  aria-label="edit" 
                  size="small" 
                  onClick={() => onEditClick(task)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>

                <IconButton 
                  aria-label="delete" 
                  size="small" 
                  sx={{ color: '#d32f2f' }}
                  onClick={() => onDeleteClick(task)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
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
        
        <div className="container-fluid p-5 mt-2">
          <div className="row g-4">
            {renderTaskColumn("Pending", "pending", "text-danger")}
            {renderTaskColumn("In Progress", "in-progress", "text-warning")}
            {renderTaskColumn("Completed", "completed", "text-success")}
            {renderTaskColumn("Review", "review", "text-info")}
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;