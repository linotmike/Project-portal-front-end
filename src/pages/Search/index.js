import React from "react";
import { useState, useEffect } from 'react';
import SearchForm from "../../components/SearchForm";
import ProjectCard from "../../components/ProjectCard";

export default function Home() {
  const [result, setResult] = useState([]);
  console.log(result);
  return (
    <div className="container-fluid p-3">
      <SearchForm result={setResult}/>
      <div className='row'>
        { result ?
          result.map( x => <ProjectCard key={x.id} name={x.name} description={x.description} languages={x.Languages} capacity={x.capacity} status={x.status} /> )
          : null }
      </div>
    </div>
  );
}
