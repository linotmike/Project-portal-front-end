import React from 'react';
import './style.css';

// TODO: Need to import links to project page
export default function ProjectCard(props) {
    return (
        <div className='col-lg-3 col-md-5 col-12 project-card m-2 p-2'>
            <div className='col-12 text-start'>
                <h3 className='project-name py-1'>{props.name}</h3> 
            </div>
            <div className='col-12'>
                <p className='py-1'>Created by: {props.owner}</p>
            </div>
            <div className='col-12 test-start d-flex flex-wrap'>
                <p className='project-description d-inline py-1'>About: {props.description}</p>
            </div>
            <div className='col-12 d-flex-column justify-content-evenly flex-wrap'>
                <h5 className='col-12 text-center'>Languages</h5> 
                <div className='col-12 d-flex justify-content-evenly flex-wrap'>
                    { props.languages.length > 0 ?
                        props.languages.map( (x, i) => <p className='col-2 d-inline text-center project-card-languages border' key={i}>{x.name}</p> )
                        : 
                        <p>No languages present</p>
                    }
                </div>
            </div>
            
        </div>
    )
}