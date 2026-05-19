import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskModel from './Components/taskmodel';
import DeleteConfirmModal from './Components/DeleteConfirmModal';


function App() {
  const [showModel, setShowModel] = useState(false);
  const [alltasks, setAllTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleOpenDeleteConfirmation = (task) => {
    setTaskToDelete(task); 
    setShowDeleteModal(true); 
  };

  const handleExecuteDelete = () => {
    if (taskToDelete) {
      setAllTasks(alltasks.filter(t => t.id !== taskToDelete.id));
    }
    setShowDeleteModal(false);
    setTaskToDelete(null);
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

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      setAllTasks(alltasks.map(t => t.id === editingTask.id ? { ...t, ...taskData } : t));
    } else {
      const newTask = {
        ...taskData,
        id: Date.now().toString(), 
        status: taskData.status || 'pending'
      };
      setAllTasks([...alltasks, newTask]);
    }
    handleCloseModel();
  };

  const handleTaskDelete = (taskId) => {
    setAllTasks(alltasks.filter(task => task.id !== taskId));
    console.log("Deleted task with ID:", taskId);
  };

  const handleSearchAction = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              alltasks={alltasks} 
              handleOpenModel={handleOpenModelForCreate}
              onEditClick={handleOpenModelForEdit}
              onDeleteClick={handleOpenDeleteConfirmation}
              handleSearchAction={handleSearchAction}
            />
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <TaskModel
        showModel={showModel}
        handleCloseModel={handleCloseModel}
        onSubmit={handleFormSubmit}
        editingTask={editingTask} 
      />
      <DeleteConfirmModal 
        show={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setTaskToDelete(null); }}
        onConfirm={handleExecuteDelete}
        taskTitle={taskToDelete?.title}
      />
    </Router>
  );
}

export default App;