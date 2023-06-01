import React from 'react';
import Navbar from '../Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
// import AuthForm from '../../pages/AuthForm';

export default function Header(props) {
    const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
 useEffect(()=>{

   setUserId(props.userId)
   setUsername(props.username)
   

 },[])
    return (
        <div className='container-fluid p-3'>
            <div className='row'>
                <div className='col-12 d-flex justify-content-around align-items-center'>
                    <div className='col-5 border'>PORJECT PORTAL</div>
                    { <Navbar userId={userId} username={username} /> }
                </div>
            </div>
        </div>
    )
}