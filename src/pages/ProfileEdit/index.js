import React from 'react';
import { useState, useEffect } from 'react';
import UploadWidget from '../../components/UploadWidget';
import API from '../../utils/Api';

export default function ProfileEdit({ userId }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('');
    // const [languages, setLanguages] = useState([]);
    const [bestWorks, setBestWorks] = useState([]);

    const getProfile = async () => {
        try {
            const z = await API.getProfile(userId);
            console.log(z)
            setPicture(z.Profile.picture);
            setFirstName(z.Profile.firstName);
            setLastName(z.Profile.lastName);
            setBio(z.Profile.bio);
            setBestWorks(z.Profile.bestWorks.split(' '));
            // if (languages.length === 0) {
            //     setLanguages( [ ...languages, ...z.Languages ] );
            // }
        } catch (error) {
            console.log(error);
        }
    }

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

            // case 'languages': 
            //     setLanguages(value);
            //     break;

            case 'best-works':
                setBestWorks(value);
                break;

            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // let langArray;
        let worksArray;

        // if (languages.length > 0) {
        //     langArray = languages.split(',').join(' ').split(' ');
        // }

        if (bestWorks.length > 0) {
            worksArray = bestWorks.join(' ');
        }

        const updatedProfile = {
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            picture: picture,
            bestWorks: worksArray,
            user_id: userId,
        }

        const dbProfileEdit = await API.updateProfile(updatedProfile, userId);
        console.log(dbProfileEdit);
    
        // const dbCreateProfile = await API.createProfile(newProfile);
        // const dbUserLanguage = await API.createLanguageUser( userId, langArray );
        // console.log('LANGUAGES');
        // console.log(dbUserLanguage);
        // console.log('WORKS');
        // console.log(worksArray);
        // console.log('PROFILE');
        // console.log(dbCreateProfile);

        setFirstName('');
        setLastName('');
        setBio('');
        // setLanguages([]);
        setBestWorks([]);
    }

    useEffect( () => {
        getProfile();
    }, [userId]);


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
                {/* <div>
                    <label for='languages'>Languages:</label>
                    { languages ?
                        languages.map( (x) => <div key={x.id}>{x.name}</div>)
                    : null }
                    <input name='languages' type='text' placeholder='languages' value={languages} onChange={handleChange} />
                </div> */}
                <div>
                    <img src={picture} alt='profile pic'/>
                    <UploadWidget setPicture={setPicture} />
                </div>
                <div>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}