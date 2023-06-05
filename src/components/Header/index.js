import React from 'react';
import Navbar from '../Navbar';
import { useEffect } from 'react';
import { NavLink as Link } from 'react-router-dom';
import './style.css';

// TODO: Need to make navbar reactive with different media queries
export default function Header({ userId, username, logout }) {

    useEffect(()=>{},[userId])

    return (
        <div className='row header-container p-1'>
            <div className='col-12 d-flex justify-content-evenly align-items-center'>
                <div className='col-3'>
                    <h1 className='project-portal m-auto'>PROJECT PORTAL</h1>
                </div>
                <div className='col-3 d-flex justify-content-evenly nav-links'>
                    {userId && <Link className='nav-bar-link' to={{ pathname: "/" }}>Home</Link>}    
                    {userId && <Link className='nav-bar-link' to={{ pathname: "/projects" }}>Create Project</Link>}
                    {userId && <Link className='nav-bar-link' to={{ pathname: "/projects/search" }}>Search</Link>}
                </div>
                { <Navbar userId={userId} username={username} logout={logout} /> }
            </div>
        </div>
    )
}