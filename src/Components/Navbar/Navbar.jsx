import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.svg';

const Navbar = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    // 3. Helper function to make role titles look pretty (e.g., "super_admin" -> "Super Admin")
    const formatRole = (role) => {
        if (!role) return '';
        return role.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <nav className="navbar px-4 py-2 d-flex justify-content-between align-items-center shadow-sm">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Logo" style={{ height: '40px', width: '40px' }} />
                </Link>
            </div>

            {user ? (
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold shadow-sm"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#020303',
                            fontSize: '1.1rem',
                            userSelect: 'none'
                        }}
                    >
                        {getInitials(user.name)}
                    </div>
                    <div className="text-center lh-sm hidden-xs">
                        <div className="fw-bold text-dark mb-0" style={{ fontSize: '0.95rem' }}>
                            {user.name}
                        </div>
                        <span className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                            {formatRole(user.role)}
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn btn-secondary shadow-sm"
                        style={{
                            background: "linear-gradient(to bottom, #6c757d, #495057)",
                            border: "none",
                            marginLeft: '15px',
                        }}
                    >
                        Logout
                    </button>
                    </div>

            ) : (
                // Fallback link if no user is found logged in
                <Link to="/login" className="btn btn-sm text-white fw-bold" style={{ backgroundColor: '#D9654D' }}>
                    Login
                </Link>
            )}
        </nav>
    );
}

export default Navbar;