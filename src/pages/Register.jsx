import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard';
import './Login';
import appLogo from '../assets/logo.svg';
import { registerUser } from '../services/authService';


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });
    const [notification, setNotification] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification({ type: '', message: '' });

        try {
            const result = await registerUser(formData);
            setNotification({
                type: 'success',
                message: result.message || 'User registered successfully!'
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);


        } catch (error) {
            setNotification({
                type: 'danger',
                message: error.message || 'Registration failed. Check database logs.'
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">

            <div className="card p-4 shadow border-0 rounded-3" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#FFFFFF' }}>
                <div className="card-body">
                    <div className="text-center mb-3">
                        <img
                            src={appLogo}
                            alt="Task Management Logo"
                            className="img-fluid"
                            style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                        />
                    </div>

                    <h2 className="text-center mb-2 fw-bold" style={{ color: '#D9654D' }}>
                        Task Management App
                    </h2>
                    <h6 className="text-center mb-4 small fw-bold text-uppercase tracking-wider" style={{ color: '#D9654D', opacity: 0.8, letterSpacing: '1px' }}>
                        Create an Account
                    </h6>
                    {notification.message && (
                        <div className={`alert alert-${notification.type} text-center fw-bold small py-2 mb-3 shadow-sm`} role="alert">
                            {notification.message}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small text-muted">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control py-2 shadow-sm"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small text-muted">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control py-2 shadow-sm"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small text-muted">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control py-2 shadow-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small text-muted">Account Role</label>
                            <select
                                name="role"
                                className="form-select py-2 shadow-sm"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a Role</option>
                                <option value="super_admin">Super Admin</option>
                                <option value="manager">Manager</option>
                                <option value="executive">Executive</option>
                            </select>
                        </div>

                        <button type="submit" className="btn w-100 fw-bold py-2 text-white shadow-sm" style={{ backgroundColor: '#D9654D', border: 'none' }}>
                            Register
                        </button>
                    </form>

                    <div className="text-center mt-4 small">
                        <span className="text-muted">Already have an account? </span>
                        <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#D9654D' }}>
                            Login here
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;