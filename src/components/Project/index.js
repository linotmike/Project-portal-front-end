import React from 'react';
import Modal from 'react-modal';
import API from '../../utils/Api';
import './style.css';

// TODO: Need to import links to project page
export default function Project({ modalIsOpen,afterOpenModal,closeModal,project,userId }) {
    Modal.setAppElement(`#root`);
    // const [modalIsOpen, setIsOpen] = React.useState(false);
    
    async function joinProject() {
      console.log("hello");
      const dbJoinProject = await API.joinProject(project.id, userId);
      console.log(dbJoinProject);
    }


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
            {/* { project.Languages > 0 ?
                        project.Languages.map( (x, i) => <p className='col-2 d-inline text-center project-card-languages border' key={i}>{x.name}</p> )
                        : 
                        <p>No languages present</p>
                    } */}
          </div>  
        </div>
        <p>This project is currently {project ? 'OPEN' : 'CLOSED'}</p>
        <button onClick={joinProject}>Join Project</button> 
      </Modal>
    )
}