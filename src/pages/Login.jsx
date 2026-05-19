import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register';
import appLogo from '../assets/logo.svg';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', credentials);
        navigate('/dashboard');
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">

            <div className="card p-4 shadow border-0 rounded-3" style={{ maxWidth: '460px', width: '100%', backgroundColor: '#FFFFFF' }}>
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
                        User Login
                    </h6>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small text-muted">Email ID</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control py-2 shadow-sm"
                                placeholder="name@example.com"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small text-muted">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control py-2 shadow-sm"
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn w-100 fw-bold py-2 text-white shadow-sm" style={{ backgroundColor: '#D9654D', border: 'none' }}>
                            Access Account
                        </button>
                    </form>

                    <div className="text-center mt-4 small">
                        <span className="text-muted">Don't have an account? </span>
                        <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#D9654D' }}>
                            Register here
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;