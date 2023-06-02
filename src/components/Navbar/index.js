import React, { useEffect, useState } from 'react'
import { NavLink as Link } from "react-router-dom";
import './style.css';




export default function Navbar({userId,logout}) {
    // const [userId, setUserId] = useState(0);
    // useEffect(() => {

    //    setUserId(props.userId)
    
    // //   console.log(props.userId);
    // }, [props.userId])
    
  
    return (
        <div className='col-5 d-flex justify-content-around nav-links border'>
               
                {userId && <Link to={{ pathname: "/" }}>Home </Link>}
            
                {userId && <Link to={{ pathname: "/profile" }}>Profile </Link>}
               { userId &&<Link to={{ pathname: "/projects" }}>create project</Link>}
               {userId ?  <Link to={{ pathname: "/messages" }}>messages </Link>: <Link to={{pathname:"/signup"}}>signup</Link>}
               {userId ?  <Link to={{ pathname: "/profile" }}>profile</Link>: <Link to={{pathname:"/signin"}}>signin</Link>}
                {/* <Link to={{ pathname: "/signin" }}>signin </Link> */}
                {userId && <button onClick={logout}>Logout</button>}
        </div>
    );
}

