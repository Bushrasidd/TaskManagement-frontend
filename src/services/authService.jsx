
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