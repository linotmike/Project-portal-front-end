import React from 'react';
import { useState } from 'react';

export default function ProjectCard(props) {
    return (
        <div className='col-lg-3 col-md-5 col-12 border m-2 p-2'>
            <div>Project Name: {props.name}</div>
            <div>Project Description: {props.description}</div>
            <div>Languages: { props.languages ? props.languages.map( (x, i) => <li key={i}>{x}</li> ) : null }</div>
            <div>Capacity: {props.capacity}</div>
            <div>
                {props.status ? <div>Open</div> : <div>Closed</div>}
            </div>
        </div>
    )
}