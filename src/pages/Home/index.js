import React from "react";
import { useState, useEffect } from 'react';
import ProjectCard from "../../components/ProjectCard";

export default function Home() {
  const [randomProj, setRandomProj] = useState([]);
  
  const testArr = [
    {
      name: 'Bite Buddies',
      createdBy: 'EJ & Amman',
      languages: ['JS', 'CSS', 'node.js', 'express.js']
    }, {
      name: 'What NOT to do at a Traffic Light',
      createdBy: 'Birhanu & Anthony',
      languages: ['JS', 'CSS', 'handlebars.js', 'express.js']
    }
  ]

  useEffect( () => {
    setRandomProj( [ ...randomProj, ...testArr ] );
  }, [])
  
  console.log(randomProj);

  return (
    <div className="container-fluid border">
      <div className='text-center'>RANDOM QUERY</div>
      { randomProj ? 
        randomProj.map(
          (x,i) => <ProjectCard key={i} name={x.name} creator={x.createdBy} languages={x.languages} />)
        : null
      }
    </div>
  );
}
