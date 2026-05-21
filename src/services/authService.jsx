
const API_URL = 'http://localhost:5000/api';
/**
 * Service to handle User Registration
 * @param {Object} userData - Contains { name, email, password, role }
 */
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data; 
    } catch (error) {
        console.error("Error in registerUser service:", error.message);
        throw error; 
    }
};

/**
 * @param {Object} credentials - Contains { email, password }
*/
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Can't store objects directly, must stringify
        }

        return data;
    } catch (error) {
        console.error("Error in loginUser service:", error.message);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};



/**
 * Service to handle secure Task Creation
 * @param {Object} taskData - Contains { title, status, priority, description, assignedTo }
 */
export const createTask = async (taskData) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('Authentication token missing. Please log in again.');
        }

        const payload = {
            title: taskData.title,
            status: taskData.status,
            priority: taskData.priority,
            description: taskData.description || '',
            assignedTo: taskData.assignedTo ? parseInt(taskData.assignedTo, 10) : null
        };

        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create task');
        }

        return data; // Returns { message: '...', task: { ... } }
    } catch (error) {
        console.error("Error in createTask service:", error.message);
        throw error; // Passes the error up to your React UI component
    }
};


export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    console.log("DEBUG: Token being sent:", token); // Check this in Browser Console
    
    const response = await fetch(`${API_URL}/team-members`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
        const errorData = await response.json(); // Catch the error message from the server
        console.error("DEBUG: Server returned error:", errorData);
        throw new Error("Failed to fetch users");
    }
    return response.json();

};
export const fetchDashboardData = async () => {
    const response = await fetch(`${API_URL}/tasks/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }
    
    return await response.json(); 
};