import React from "react";
import { useState, useEffect } from 'react';
import ProjectCard from "../../components/ProjectCard";
import API from "../../utils/Api";

export default function Home() {
  const [result, setResult] = useState([]);
  
  const searchProjects = async () => {
    try {
      const dbResult = await API.getRandomProjects();
      setResult( [ ...result, ...dbResult ] );
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    searchProjects();
  }, [])
  
// TODO: Need to query languages
  return (
    <div className="container-fluid border p-3">
      <div className='text-center'>RANDOM QUERY</div>
      <div className="row d-flex justify-content-around flex-wrap p-3">
        { result ? 
          result.map(
            (x,i) => <ProjectCard key={i} name={x.name} description={x.description} capacity={x.capacity} status={x.status} languages={x.Languages}/>)
            : null
          }
      </div>
    </div>
  );
}
