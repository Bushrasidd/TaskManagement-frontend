import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import SearchBar from './Components/SearchBar';
import TaskModel from './Components/taskmodel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function App() {
  const [showModel, setShowModel] = useState(false);
  const [alltasks, setAllTasks] = useState([]);

  console.log("Current Bucket of Tasks:", alltasks);

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
            <h1>Task Manage   ment App</h1>
          </div>
          <div className='d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 gap-md-5'>
            <SearchBar onSearch={handleSearchAction} />
            <button className='btn create-btn ms-4' onClick={handleOpenModel}>Create</button>
          </div>
          <div className='container-fluid p-5 mt-4'>
            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
                  <h5 className="text-danger">PENDING</h5>
                  {alltasks
                    .filter(task => task.status === "pending")
                    .map(task => {
                      return ( // <--- Add this!
                        <Stack
                          key={task.id}
                          direction="row"
                          alignItems="center"
                          className="task_container border p-2 mt-2"
                          sx={{ width: '100%' }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <p className="small mb-0">{task.title}</p>
                          </Box>

                          <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      );
                    })
                  }
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
                  <h5 className="text-warning ">IN PROGRESS</h5>
                  {alltasks
                    .filter(task => task.status === "in-progress")
                    .map(task => {
                      return (
                        <Stack
                          key={task.id}
                          direction="row"
                          alignItems="center"
                          className="task_container border p-2 mt-2"
                          sx={{ width: '100%' }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <p className="small mb-0">{task.title}</p>
                          </Box>

                          <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      );
                    })
                  }
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
                  <h5 className="text-success">COMPLETED</h5>
                  {alltasks
                    .filter(task => task.status === "completed")
                    .map(task => {
                      return ( // <--- Add this!
                        <Stack
                          key={task.id}
                          direction="row"
                          alignItems="center"
                          className="task_container border p-2 mt-2"
                          sx={{ width: '100%' }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <p className="small mb-0">{task.title}</p>
                          </Box>

                          <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      );
                    })
                  }
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div className="card border-warning p-3" style={{ minHeight: "400px" }}>
                  <h5 className="text-info">REVIEW</h5>
                  {alltasks
                    .filter(task => task.status === "review")
                    .map(task => {
                      return (
                        <Stack
                          key={task.id}
                          direction="row"
                          alignItems="center"
                          className="task_container border p-2 mt-2"
                          sx={{ width: '100%' }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <p className="small mb-0">{task.title}</p>
                          </Box>

                          <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      );
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
        <TaskModel
          showModel={showModel}
          handleCloseModel={handleCloseModel}
          onSubmit={(newTask) => setAllTasks([...alltasks, newTask])}
        />

      </div>
    
    </Router>
  );
}

export default App

