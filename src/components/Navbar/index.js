import React from 'react'
import { NavLink as Link } from "react-router-dom";
import './style.css';




export default function Navbar() {
    return (
        <div className='col-5 d-flex justify-content-around nav-links border'>
                <Link to={{ pathname: "/" }}>Home </Link>
                <Link to={{ pathname: "/profile" }}>Profile </Link>
                <Link to={{ pathname: "/projects/upload" }}>projects</Link>
                <Link to={{ pathname: "/messages" }}>messages </Link>
                <Link to={{ pathname: "/signin" }}>signin </Link>
        </div>
    );
}
