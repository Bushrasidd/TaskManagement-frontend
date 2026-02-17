import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';

import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/"> 
                <img src={logo} alt="Logo"  style={{height:'40px',width:'40px'}}/>
                </Link>
            </div>
            <div className='Nav-title'>
                <h2>Task Management App</h2>
            </div>
        </nav>
    );
}

export default Navbar;
 