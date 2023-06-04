import React from "react";
import { useState, useRef } from 'react';
import SearchForm from "../../components/SearchForm";
import ProjectCard from "../../components/ProjectCard";

export default function Home() {
  const [result, setResult] = useState([]);
  let queryType = useRef('LANGUAGE');


  // TODO: Switch Button Name on click
  const handleClick = (e) => {
    e.preventDefault();
    queryType === 'LANGUAGE' ? queryType = 'NAME' : queryType = 'LANGUAGE';
    console.log("Current:");
    console.log(queryType);
  }

  console.log(result);

  // TODO: Switch SearchForm type when clicking button
  return (
    <div className="container-fluid p-3">
      <button onClick={handleClick}>Search by {queryType.current}</button>
      <SearchForm result={setResult}/>
      <div className='row'>
        { result ?
          result.map( x => <ProjectCard key={x.id} name={x.name} description={x.description} languages={x.Languages} capacity={x.capacity} status={x.status} /> )
          : null }
      </div>
    </div>
  );
}
