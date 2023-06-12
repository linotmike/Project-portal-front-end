import React, { useState } from 'react'
import { NavLink as Link } from "react-router-dom";
import './style.css';



export default function Navbar({ userId, logout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen)

  }
    return (
        
        <div className='d-flex  nav-links'>
            <div className='d-sm-flex d-none w-100 justify-content-evenly nav-links '>
            { userId && 
                <Link className='nav-bar-link' to={{ pathname: "/profile" }}>Profile</Link>
            }
            { userId ? 
                <Link className='nav-bar-link' to={{ pathname: "/messages" }}>Messages</Link> : 
                <Link className='nav-bar-link' to={{ pathname: "/signup" }}>Sign Up</Link> 
            }
            <Link className='nav-bar-link' to={{ pathname: "/projects/search" }}>Search</Link>
            { userId && <button className='logout-btn' onClick={logout}>Logout</button> }

            </div>
            <div onClick={toggleDropDown} className=' d-sm-none d-flex '>
                {isDropdownOpen ? <div> <i class="fa-solid fa-x"></i><div className='mobile-nav'> { userId && 
                <Link className='nav-bar-link' to={{ pathname: "/profile" }}>Profile</Link>
            }
            { userId ? 
                <Link className='nav-bar-link' to={{ pathname: "/messages" }}>Messages</Link> : 
                <Link className='nav-bar-link' to={{ pathname: "/signup" }}>Sign Up</Link> 
            }
            <Link className='nav-bar-link' to={{ pathname: "/projects/search" }}>Search</Link>
            { userId && <button className='logout-btn' onClick={logout}>Logout</button> }</div></div> : <i class="fa-solid fa-bars" styles={{color: "#ebedef"}}></i>} 

            </div>
        </div>
               
    );
}

