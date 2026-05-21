import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskModel from './Components/taskmodel';
import DeleteConfirmModal from './Components/DeleteConfirmModal';
import ProtectedRoute from './Components/ProtectedRoute';
import { getAllUsers } from './services/authService';
import { fetchDashboardData } from './services/authService';
import { useLocation } from 'react-router-dom';
import { DeleteTask } from './services/authService';
import { UpdateTask } from './services/authService';
import { createTask } from './services/authService';
import './App.css';
import { toast } from 'react-hot-toast';
function App() {
  const [showModel, setShowModel] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [stats, setStats] = useState([]);
  const [tasks, setTasks] = useState([]);


  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const userRole = loggedInUser ? loggedInUser.role : null;
  // const location = useLocation();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     fetchStats();
  //   }
  // }, [location.pathname]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setTeamMembers(data); // Store the list of executives
    } catch (err) {
      console.error("Could not load team members", err);
    }
  };
  fetchUsers();
}, []);

const fetchStats = async () => {
  try {
    console.log("Fetching dashboard stats with token:", localStorage.getItem('token')); // Debugging line
    const data = await fetchDashboardData();
    if (data && data.stats) {
      setStats(data.stats);
      setTasks(data.tasks);
    }
    console.log("Dashboard stats fetched successfully:", data); // Debugging line
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

useEffect(() => {
  fetchStats();
}, []);




const handleOpenDeleteConfirmation = (task) => {
  setTaskToDelete(task);
  setShowDeleteModal(true);
};

const handleExecuteDelete = async () => {
  if (taskToDelete) {
    try {
      await DeleteTask(taskToDelete.id); 
      await fetchStats();
      setShowDeleteModal(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Delete failed", error);
    }
  }
};

const handleOpenModelForCreate = () => {
  setEditingTask(null);
  setShowModel(true);
};

const handleOpenModelForEdit = (task) => {
  setEditingTask(task);
  setShowModel(true);
};

const handleCloseModel = () => {
  setShowModel(false);
  setEditingTask(null);
};

const handleFormSubmit = async (taskData) => { // Make this async!
  try {
    if (editingTask) {
      await UpdateTask(editingTask.id, taskData);
      toast.success('Task updated successfully!');
    } else {
      await createTask(taskData);
      toast.success('Task created successfully!');
    }
    await fetchStats(); 
    handleCloseModel();
  } catch (error) {
    console.error("Submission failed:", error);
    toast.error('Submission failed. Please try again.');
  }
};

const handleSearchAction = (searchTerm) => {
  console.log("Searching for:", searchTerm);
};

return (
  <>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard
              handleOpenModel={handleOpenModelForCreate}
              onEditClick={handleOpenModelForEdit}
              onDeleteClick={handleOpenDeleteConfirmation}
              handleSearchAction={handleSearchAction}
              tasks={tasks}
              stats={stats}
              fetchStats={fetchStats}
            />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    <TaskModel
      showModel={showModel}
      handleCloseModel={handleCloseModel}
      onSubmit={handleFormSubmit}
      editingTask={editingTask}
      users={teamMembers}
      onTaskAdded={fetchStats}
      userRole={JSON.parse(localStorage.getItem('user'))?.role}
    />
    <DeleteConfirmModal
      show={showDeleteModal}
      onClose={() => { setShowDeleteModal(false); setTaskToDelete(null); }}
      onConfirm={handleExecuteDelete}
      taskTitle={taskToDelete?.title}
    />
    </>
);
}

export default App;