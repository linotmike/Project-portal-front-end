import React from 'react';
import { useState } from 'react';
import API from '../../utils/Api';
import './style.css';
import { Navigate, useNavigate } from 'react-router-dom';
// TODO: Need to add UserId into object when sending fetch request
export default function ProjectUpload({ userId }) {
  const navigate = useNavigate()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState();
    const [dueDate, setDueDate] = useState(undefined);
    const [languages, setLanguages] = useState('');

    const handleChange = (e) => {
      const targetName = e.target.name;
      const targetValue = e.target.value;
      
      switch (targetName) {
        case 'name':
          setName(targetValue);
          break;
        
        case 'description':
          setDescription(targetValue);
          break;

        case 'capacity':
          setCapacity(targetValue);
          break;

        case 'due-date':
          setDueDate(targetValue);
          break;

        case 'languages':
          setLanguages(targetValue);
          break;

        default:
          break;
      }
      //  console.log(targetName,targetValue);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const proj = {
        name: name,
        description: description,
        capacity: capacity,
        dueDate: dueDate,
        owner_id: userId,
        user_id: userId
      }

      // console.log(proj);

      if(name === '') {
        alert("Must include name");
      } else {
          const projectData = await API.createProject(proj);

          if(languages === '') {
            alert('Must include languages');
            return;
          }

          const langArray = languages.split(',').join(' ').split(' ');
          await API.createLanguageProject(projectData.id , langArray);
          
          // console.log(langArray);
    
          setName('');
          setDescription('');
          setCapacity(1);
          setDueDate(undefined);
          setLanguages([]);
          navigate('/');
      }

    }
    
    
    return (
        <form className='project-form' onSubmit={handleSubmit}>
          <div className='row d-flex justify-content-center align-items-center p-2 m-2'>
            <div className='col-md-8 col-12 d-flex flex-column justify-content-evenly align-items-center project-create-container p-3 m-3 border'>
              <h2 className='p-2 m-2'>Create a project</h2> 
              <div className='col-md-10 d-flex justify-content-evenly align-items-center flex-wrap p-2 m-2 border'>
                <div className='col-12 d-flex flex-column justify-content-between align-items-center left-column p-2 m-2 border'>
                  <input className='project-create-col p-1' name='name' type='text' placeholder='Name' value={name} onChange={handleChange}/>
                  <input className='project-create-col p-1' name='capacity' type='number' placeholder='Capacity' value={capacity} min='1' onChange={handleChange} />
                  <input className='project-create-col p-1' name='languages' type='text' placeholder='Languages' value={languages} onChange={handleChange} />
                </div>
                <div className='col-12 d-flex flex-column justify-content-evenly align-items-center right-column p-2 m-2 border'>
                  <textarea className='project-create-col description p-1' name='description' type='text' placeholder='Description' value={description} onChange={handleChange} />
                  <input className='project-create-col p-1' name='due-date' type='date' placeholder='Date' value={dueDate} onChange={handleChange}/>
                </div>
              </div>
              <button className='project-create-btn' type='submit'>Create</button>
            </div>
          </div>
        </form>
    )
}
