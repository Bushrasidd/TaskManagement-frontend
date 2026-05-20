import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check for both the user object and the token
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token'); 

    // If either is missing, the user is not authenticated
    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;