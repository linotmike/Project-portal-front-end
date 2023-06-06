import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

// TODO: Need to import links to project page
export default function Project({ modalIsOpen, afterOpenModal, closeModal, project}) {
    Modal.setAppElement(`#root`);
    // const [modalIsOpen, setIsOpen] = React.useState(false);
    // const [ownerId, setOwnerId] = useState(0);

    // useEffect(() => {
    //   setOwnerId(owner_id)
    //   localStorage.setItem('owner_id', ownerId);
    // }, [])

    // console.log(ownerId);

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '-webkit-fill-available'
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
        <button onClick={closeModal}>close</button>
        <div className='col-lg-3 col-md-5 col-12 project-card m-2 p-2'>
          <div className='col-12 text-start'>
            <h3 className='project-name py-1'>{project && project.name}</h3> 
          </div>
          <div className='col-12'>
            <p className='py-1'>Created by: { project && project.Owner.username}</p>
          </div>
          <div className='col-12 test-start d-flex flex-wrap'>
            <p className='project-description d-inline py-1'>About: {project && project.description}</p>
          </div>
          <div className='col-12 d-flex-column justify-content-evenly flex-wrap'>
            <h5 className='col-12 text-center'>Languages</h5> 
              {/* <div className='col-12 d-flex justify-content-evenly flex-wrap'>
                { props.languages.length > 0 ?
                  props.languages.map( (x, i) => <p className='col-2 d-inline text-center project-card-languages border' key={i}>{x.name}</p> )
                  : 
                  <p>No languages present</p>
                }
              </div> */}
          </div>  
        </div>
        <p>This is the project of {project && project.owner}</p> 
        {/* <Link to='/profile/view'>View Owner Profile</Link> */}
      </Modal>
    )
}