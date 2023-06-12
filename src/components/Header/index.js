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
                <div className='text-center nav-home'>
                    <h1 className='project-portal m-auto'><Link className='home-link' to={{ pathname: "/" }}>Project Portal</Link></h1>
                </div>
                <div className=' d-flex justify-content-evenly nav-links nav-pagename'>
                    {/* <Link className='nav-bar-link' to={{ pathname: "/projects/search" }}>Search</Link> */}
                    {/* {userId && <Link className='nav-bar-link' to={{ pathname: "/" }}>Home</Link>}     */}
                    {userId && <Link className='nav-bar-link' to={{ pathname: "/projects" }}>Create Project</Link>}
                </div>
                { <Navbar userId={userId} username={username} logout={logout} /> }
            </div>
        </div>
    )
}