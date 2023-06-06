import React from 'react';
import { useState } from 'react';
import API from '../../utils/Api';
import './style.css';

// TODO: Need to add UserId into object when sending fetch request
export default function ProjectUpload({ userId }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [dueDate, setDueDate] = useState(undefined);
    const [languages, setLanguages] = useState([]);

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
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const langArray = languages.split(',').join(' ').split(' ');

      const proj = {
        name: name,
        description: description,
        capacity: capacity,
        dueDate: dueDate,
        owner_id: userId,
        user_id: userId
      }

      console.log(proj);

      
      const projectData = await API.createProject(proj);
      await API.createLanguageProject(projectData.id , langArray);
      
      console.log(langArray);

      setName('');
      setDescription('');
      setCapacity(0);
      setDueDate(undefined);
      setLanguages([]);
    }
    
    
    return (
        <form className='project-form' onSubmit={handleSubmit}>
          <div className='row d-flex justify-content-center align-items-center p-2 m-2 border'>
            <div className='col-md-8 col-12 d-flex flex-column justify-content-evenly align-items-center p-2 border'>
              <div className='col-10 d-flex flex-column justify-content-evenly align-items-center p-2 m-2 border'>
                <label for='name'>Name:</label>
                <input name='name' type='text' placeholder='Project name' value={name} onChange={handleChange}/>
              </div>
              <div className='col-10 d-flex justify-content-evenly align-items-center p-2 m-2 border'>
                <div className='d-flex flex-column justify-content-evenly align-items-center p-2 m-2 border'>
                  <label for='description'>Description:</label>
                  <input name='description' type='text' placeholder='Project description' value={description} onChange={handleChange} />
                </div>
                <div className='d-flex flex-column justify-content-evenly align-items-center p-2 m-2 border'>
                  <div className='d-flex flex-column justify-content-evenly align-items-center p-2 m-2 border'>
                    <label for='capacity'>Capacity:</label>
                    <input name='capacity' type='number' placeholder='Capacity' value={capacity} onChange={handleChange} />
                  </div>
                  <div className='d-flex flex-column justify-content-evenly align-items-center p-2 m-2 border'>
                    <label for='due-date'>Due date:</label>
                    <input name='due-date' type='date' placeholder='Date' value={dueDate} onChange={handleChange}/>
                  </div>
                </div>
              </div>
              <div className='col-10 d-flex flex-column justify-content-evenly align-items-center p-2 m-2 border'>
                <label for='languages'>Languages:</label>
                <input name='languages' type='text' placeholder='languages' value={languages} onChange={handleChange} />
              </div>
              <div className='p-2 m-2'>
                <button type='submit'>Create</button>
              </div>
            </div>
          </div>
        </form>
    )
}
