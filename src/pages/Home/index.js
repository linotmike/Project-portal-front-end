import React from "react";
import { useState, useEffect } from 'react';
import Project from "../../components/Project";
import ProjectCard from "../../components/ProjectCard";
import API from "../../utils/Api";
import './style.css';

export default function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null)
  // const [ownerId, setOwnerId] = useState('');
  
  const [result, setResult] = useState([]);
  
  function openModal() {  
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  
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

  function openCurrentProject(x) {
    console.log(x);
    setCurrentProject(x);
    // setOwnerId(x.owner_id);
    // console.log("owner id", ownerId);
    openModal()
  }
 
  return (
    <div className="row p-2 home-container">
      <div className='text-center'>
        <h2 className="random-query">Random Query</h2>
      </div>
      <div className="row d-flex justify-content-evenly flex-wrap p-3">
        { result ? 
          result.map(
            (x,i) => <ProjectCard openCurrentProject={openCurrentProject} project={x} key={i} name={x.name} description={x.description} owner={x.Owner.username} languages={x.Languages}/>)
            : null
          }
          <Project modalIsOpen={modalIsOpen} closeModal={closeModal} project={currentProject} />
      </div>
    </div>
  );
}
