import React from "react";
import { useState, useRef } from 'react';
import SearchForm from "../../components/SearchForm";
import ProjectCard from "../../components/ProjectCard";

export default function Home() {
  const [result, setResult] = useState([]);
  const [type, setType] = useState('LANGUAGE');


  // TODO: Switch Button Name on click
  const handleClick = (e) => {
    e.preventDefault();
    type === 'LANGUAGE' ? setType('NAME') : setType('LANGUAGE');
    console.log("Current:");
    console.log(type);
  }


  console.log(result);

  // TODO: Switch SearchForm type when clicking button
  return (
    <div className="row p-2">
      <button onClick={handleClick}>Search by {type}</button>
      <SearchForm result={setResult} type={type}/>
      <div className="row d-flex justify-content-evenly flex-wrap p-3">
        { result ?
          result.map( x => <ProjectCard key={x.id} name={x.name} description={x.description} languages={x.Languages} owner={x.Owner.username} /> )
          : null }
      </div>
    </div>
  );
}
