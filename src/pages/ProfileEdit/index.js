import React from 'react';
import { useState, useEffect } from React;

export default function ProfileEdit() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('');
    const [languages, setLanguages] = useState([]);
    const [bestWorks, setBestWorks] = useState([]);


    return (
        <div className='container-fluid p-3'>
            <form className='profile-create' onSubmit={handleSubmit}>
                <div>
                    <label for='first-name'>First name:</label>
                    <input name='first-name' type='text' onChange={handleChange} value={firstName}/> 
                    <label for='last-name'>Last name:</label>
                    <input name='last-name' type='text' onChange={handleChange} value={lastName}/> 
                </div>
                <div>
                    <label for='bio'>Bio:</label>
                    <input name='bio' type='text' onChange={handleChange} value={bio}/> 
                </div>
                <div>
                    <label for='best-works'>Best Works:</label>
                    <input name='best-works' type='text' placeholder='Links to Best Works' value={bestWorks} onChange={handleChange}/>
                </div>
                <div>
                    <label for='languages'>Languages:</label>
                    <input name='languages' type='text' placeholder='languages' value={languages} onChange={handleChange} />
                </div>
                <div>
                    <UploadWidget setPicture={setPicture} />
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}