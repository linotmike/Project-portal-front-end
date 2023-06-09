import React from "react";
import { useState, useRef, useEffect } from 'react';
import SearchForm from "../../components/SearchForm";
import ProjectCard from "../../components/ProjectCard";
import './style.css';
import Project from "../../components/Project";

export default function Home({ userId }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState (null)
  
  const [result, setResult] = useState([]);
  const [type, setType] = useState('LANGUAGE');
  const oldType = useRef('NAME');
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
  

  const handleClick = (e) => {
    e.preventDefault();
    type === 'LANGUAGE' ? setType('NAME') : setType('LANGUAGE');
    // console.log("Current:");
    // console.log(type);
  }

  useEffect( () => {
    oldType.current = type;
  }, [type])
  // console.log(result);
  function openCurrentProject (x){
    // console.log(x);
    setCurrentProject(x)
    openModal()
   }

  return (
    <div className="row d-flex flex-column justify-content-center align-items-center p-2">
      <button className='align-self-center type-btn' onClick={handleClick}>Search by {oldType.current}</button>
      <SearchForm result={setResult} type={type}/>
      <div className="row d-flex justify-content-evenly flex-wrap p-3">
        { result ?
          result.map( x => <ProjectCard openCurrentProject={openCurrentProject} project={x} key={x.id} name={x.name} description={x.description} languages={x.Languages} owner={x.Owner.username} /> )
          : null }
          <Project modalIsOpen= {modalIsOpen} closeModal={closeModal} project={currentProject} userId={userId}/>
      </div>
    </div>
  );
}
