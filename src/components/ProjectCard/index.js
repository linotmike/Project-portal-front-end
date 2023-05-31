import React from 'react';
import { useState } from 'react';

export default function ProjectCard(props) {
    return (
        <div>
            <div>{props.name}</div>
            <div>{props.creator}</div>
            <div>{ props.languages ? props.languages.map( (x, i) => <li key={i}>{x}</li> ) : null }</div>
        </div>
    )
}