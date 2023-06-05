import React from "react";
import { useState, useEffect } from 'react';
import ProjectCard from "../../components/ProjectCard";
import API from "../../utils/Api";
import './style.css';

export default function Home() {
  const [result, setResult] = useState([]);
  
  const searchProjects = async () => {
    try {
      const dbResult = await API.getRandomProjects();
      console.log(dbResult);
      setResult(dbResult);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    searchProjects();
  }, [])

  return (
    <div className="row p-2 home-container">
      <div className='text-center'>
        <h2 className="random-query">Random Query</h2>
      </div>
      <div className="row d-flex justify-content-evenly flex-wrap p-3">
        { result ? 
          result.map(
            (x,i) => <ProjectCard key={i} name={x.name} description={x.description} owner={x.Owner.username} languages={x.Languages}/>)
            : null
          }
      </div>
    </div>
  );
}
