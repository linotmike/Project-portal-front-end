import React from 'react';
import Modal from 'react-modal';
import API from '../../utils/Api';
import { useState, useEffect } from 'react';
import DayJS from 'react-dayjs';
import './style.css';

export default function Project({ modalIsOpen, afterOpenModal, closeModal, project, userId }) {
  Modal.setAppElement(`#root`);
    const [join, setJoin] = useState(false);
    const [langProject, setLangProject] = useState({});

    
    useEffect(() => {
      getProject();
    }, [project])

    async function getProject() {
      try {
        const dbProjectData = await API.getProjectById(project.id);
        setLangProject(dbProjectData)
      } catch (error) {
        
      }
    }

    function JoinStatus() {
      if (!userId) {
        return <p className='join-status-tag p-1'>Sign in to join a project</p>
      } else if (project && project.Owner && project.Owner.id == userId ){
        return <p className='join-status-tag p-1'>You are the owner of this project</p>
      }else if (project && project.Developer && project.Developer.length +1 >= project.capacity){
        return  <p className='join-status-tag p-1'>This project's capacity is full</p>

      } else if (!join) {
        return <button className='join-status-btn' onClick={joinProject}>Join Project</button>
      } else {
        return <p className='join-status-tag p-1'>Successfully joined project!</p>
      }
    }

    async function joinProject() {
      if (userId) {
        const dbJoinProject = await API.joinProject(project.id, userId);
        if (dbJoinProject && !dbJoinProject.msg  ) {
          setJoin(true);
        }
      } else {
        console.log('Sign up to join');
      }
    }

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        border: 'none',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '900px',
        height: '75%',
        maxHeight: '900px'

      },
    };
   
    return (
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
      >
        <div className='row d-flex flex-column align-items-center modal-container'>
          <div className='d-flex justify-content-start'>
            <button className='close-btn' onClick={closeModal}>X</button>
          </div>
          <div className='d-flex justify-content-between align-items-center p2'>
            {project && project.dueDate && <p className='due-date-tag p-2'>Due Date: <DayJS format='MMM DD YYYY'>{project.dueDate}</DayJS></p>}
            <JoinStatus />
          </div>
          <h1 className='text-center p-2'>{project && project.name}</h1>
          <h5 className='text-center p-2'>Created by: {project && project.Owner.username}</h5>
          <p className='description-tag text-center p-2'>{project && project.description}</p>
          <div className='d-flex justify-content-center align-items-center flex-wrap p-2'>
            <div className='d-flex flex-column justify-content-start align-items-center modal-languages-container flex-wrap p-2 m-2'>
              <h4 className='p-2'>Languages</h4>
              <div className='d-flex justify-content-evenly flex-wrap w-100 p-2'>
                { project && langProject && langProject.Languages && langProject.Languages.length > 0 ?
                  langProject.Languages.map( (x, i) => <p className='text-center project-card-languages border mx-2' key={i}>{x.name}</p> )
                  :
                  <p>No languages present</p>
                }
              </div>
            </div>
            <div className='d-flex flex-column justify-content-start align-items-center modal-languages-container flex-wrap p-2 m-2'>
              <h4 className='p-2'>Details</h4>
              <p className='status-tag p-2'>This project is currently {project && project.Developer && project.Developer.length +1 >= project.capacity ? 'CLOSED' : 'OPEN'}</p>
              {project && project.capacity && <p className='capacity-tag p-2'>Project Capacity: {project.capacity}</p>}
            </div>
          </div>
        </div>
      </Modal>
    )
}