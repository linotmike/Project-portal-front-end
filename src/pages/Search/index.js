import React from "react";
import { useState, useRef, useEffect } from 'react';
import SearchForm from "../../components/SearchForm";
import ProjectCard from "../../components/ProjectCard";
import './style.css';

export default function Home() {
  const [result, setResult] = useState([]);
  const [type, setType] = useState('LANGUAGE');
  const oldType = useRef('NAME');


  // TODO: Switch Button Name on click
  const handleClick = (e) => {
    e.preventDefault();
    type === 'LANGUAGE' ? setType('NAME') : setType('LANGUAGE');
    console.log("Current:");
    console.log(type);
  }

  useEffect( () => {
    oldType.current = type;
  }, [type])
  console.log(result);

  // TODO: Switch SearchForm type when clicking button
  return (
    <div className="row d-flex flex-column justify-content-center align-items-center p-2">
      <button className='align-self-center type-btn' onClick={handleClick}>Search by {oldType.current}</button>
      <SearchForm result={setResult} type={type}/>
      <div className="row d-flex justify-content-evenly flex-wrap p-3">
        { result ?
          result.map( x => <ProjectCard key={x.id} name={x.name} description={x.description} languages={x.Languages} owner={x.Owner.username} /> )
          : null }
      </div>
    </div>
  );
}
