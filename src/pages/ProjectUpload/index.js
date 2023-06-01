import React from 'react';
import { useState } from 'react';
import API from '../../utils/Api';

export default function ProjectUpload() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState(0);
    // const [dueDate, setDueDate] = useState('');
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
        languages: langArray
      }

      console.log(proj);

      // TODO: Fix API function
      // API.createProject(proj);

      setName('');
      setDescription('');
      setCapacity(0);
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
                        <input name='capacity' type='text' placeholder='Capacity' value={capacity} onChange={handleChange} />
                        {/* <hr />
                        <label for='due-date'>Due date:</label>
                        <input name='due-date'/> */}
                    </div>
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
