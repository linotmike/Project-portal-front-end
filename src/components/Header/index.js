import React from 'react';
import Navbar from '../Navbar';

export default function Header() {
    return (
        <div className='container-fluid p-3'>
            <div className='row'>
                <div className='col-12 d-flex justify-content-around align-items-center'>
                    <div className='col-5 border'>PORJECT PORTAL</div>
                    <Navbar />
                </div>
            </div>
        </div>
    )
}