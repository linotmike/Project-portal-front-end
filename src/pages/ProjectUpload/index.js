import React from 'react';
import { useState } from 'react';
import API from '../../utils/Api';

// TODO: Need to add UserId into object when sending fetch request
export default function ProjectUpload() {
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

    const handleSubmit = (e) => {
      e.preventDefault();

      const langArray = languages.split(',').join(' ').split(' ');

      const proj = {
        name: name,
        description: description,
        capacity: capacity,
        languages: langArray,
        dueDate: dueDate
      }

      console.log(proj);

      // TODO: Fix API function
      API.createProject(proj);

      setName('');
      setDescription('');
      setCapacity(0);
      setDueDate(undefined);
      setLanguages([]);
    }
    
    
    return (
        <div className='container-fluid p-3'>
            <div className='row'>
                <form className='project-form' onSubmit={handleSubmit}>
                    <div>
                      <label for='name'>Name:</label>
                      <input name='name' type='text' placeholder='Project name' value={name} onChange={handleChange}/>
                    </div>
                    <div>
                      <label for='description'>Description:</label>
                      <input name='description' type='text' placeholder='Project description' value={description} onChange={handleChange} />
                    </div>
                    <div>
                      <label for='capacity'>Capacity:</label>
                      <input name='capacity' type='number' placeholder='Capacity' value={capacity} onChange={handleChange} />
                    </div>
                    <div>
                      <label for='due-date'>Due date:</label>
                      <input name='due-date' type='date' placeholder='Date' value={dueDate} onChange={handleChange}/>
                    </div>
                    {/* TODO: Status field will only show when you edit your project / Default = Open */}
                    {/* <div>
                        <label for='status'>Status:</label>
                        <input name='status' type='radio' id='open' value={status}/>
                        <label for='open'>Open</label>
                        <br />
                        <input name='status' type='radio' id='open' value={status}/>
                        <label for='open'>Closed</label>
                    </div> */}
                    <div>
                      <label for='languages'>Languages:</label>
                      <input name='languages' type='text' placeholder='languages' value={languages} onChange={handleChange} />
                    </div>
                    <div>
                      <button type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
