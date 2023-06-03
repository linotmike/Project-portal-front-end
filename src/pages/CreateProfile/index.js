import React from 'react';
import { useState, useEffect } from 'react';
import API from '../../utils/Api';

export default function CreateProfile({ userId }) { 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('https://placekitten.com/200/300');
    const [languages, setLanguages] = useState([]);
    const [bestWorks, setBestWorks] = useState([]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'first-name':
                setFirstName(value);
                break;

            case 'last-name':
                setLastName(value);
                break;

            case 'bio':
                setBio(value);
                break;

            // TODO: Add cloudinary
            // case 'picture':
            //     setPicture(value);

            case 'languages': 
                setLanguages(value);
                break;

            case 'best-works':
                setBestWorks(value);
                break;

            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const langArray = languages.split(',').join(' ').split(' ');
        const worksArray = bestWorks.split(',').join(' ').split(' ');

        const newProfile = {
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            picture: picture,
            bestWorks: bestWorks,
            user_id: userId,
        }

        const dbCreateProfile = await API.createProfile(newProfile);
        const dbUserLanguage = await API.createLanguageUser( userId, langArray );
        console.log('LANGUAGES');
        console.log(dbUserLanguage);
        console.log('WORKS');
        console.log(worksArray);
        console.log('PROFILE');
        console.log(dbCreateProfile);

        setFirstName('');
        setLastName('');
        setBio('');
        setLanguages([]);
        setBestWorks([]);
    }

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
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}