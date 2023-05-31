import React from 'react'
import { NavLink as Link } from "react-router-dom";




export default function Navbar() {
    return (
        <nav className="nav-main">
            <ul style={{ color: "black" }} className="nav-bar">
                <li className="link">
                    <Link to={{ pathname: "/" }}>Home </Link>
                </li>
                <li className="link">
                    <Link to={{ pathname: "/profile" }}>Profile </Link>
                </li>
                <li className="link">
                    <Link to={{ pathname: "/projects/upload" }}>projects</Link>
                </li>
                <li className="link">
                    <Link to={{ pathname: "/messages" }}>messages </Link>
                </li>
                <li className="link">
                    <Link to={{ pathname: "/signin" }}>signin </Link>
                </li>
            </ul>

            <br />
        </nav>
    );
}
