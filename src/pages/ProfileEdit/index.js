import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink as Link,useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/UploadWidget';
import API from '../../utils/Api';
import './style.css';

export default function ProfileEdit({ userId }) {
    const Navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('https://placekitten.com/300/300');
    const [bestWorks, setBestWorks] = useState([]);
    // let bestWorksArr;
    // const [bestWorksOne, setBestWorksOne] = useState('');
    // const [bestWorksTwo, setBestWorksTwo] = useState('');
    // const [bestWorksThree, setBestWorksThree] = useState('');
    
    const getProfile = async () => {
        try {
            const z = await API.getProfile(userId);
            if (z.Profile) {
                console.log(z.Profile);
                setPicture(z.Profile.picture);
                setFirstName(z.Profile.firstName);
                setLastName(z.Profile.lastName);
                setBio(z.Profile.bio);
                setBestWorks( JSON.parse(z.Profile.bestWorks) );
                // bestWorksArr = bestWorks;
                // setBestWorksOne(bestWorks[0]);
                // setBestWorksTwo(bestWorks[1]);
                // setBestWorksThree(bestWorks[2]);
            }
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

            default:
                break;
        }
    }

    const handleWorksChange = (e) => {
        const { name, value } = e.target;
        let arr = [ ...bestWorks ];

        switch ( name ) {
            case 'best-works-0':
                arr[0] = value;
                setBestWorks(arr);
                break;

            case 'best-works-1':
                arr[1] = value;
                setBestWorks(arr);
                break;

            case 'best-works-2':
                arr[2] = value;
                setBestWorks(arr);
                break;

            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProfile = {
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            picture: picture,
            bestWorks: JSON.stringify(bestWorks),
            user_id: userId,
        }

        const dbProfileEdit = await API.updateProfile(updatedProfile, userId);
        console.log(dbProfileEdit);

        setFirstName('');
        setLastName('');
        setBio('');
        setBestWorks([]);
        Navigate('/profile');

    }

    useEffect( () => {
        getProfile();
    }, [userId]);


    return (
        <form className='profile-create' onSubmit={handleSubmit}>
            <div className='row profile-edit-container p-2 m-3'>
                <div className='col-12 d-flex justify-content-evenly flex-wrap p-2'>
                    <div className='col-md-4 col-12 text-center p-2'>
                        <img className='profile-picture' src={picture} alt='profile pic'/>
                        <UploadWidget setPicture={setPicture} />
                    </div>
                    <div className='col-md-4 col-12 d-flex flex-column justify-content-evenly align-items-center p-2'>
                        <div className='col-md-5 col-12 d-flex flex-column align-items-center p-2'>
                            <input className='profile-edit-input' placeholder='First name' name='first-name' type='text' onChange={handleChange} value={firstName}/>
                            <input className='profile-edit-input' placeholder='Last-name' name='last-name' type='text' onChange={handleChange} value={lastName}/>
                        </div>
                        <div className='col-md-8 col-12 d-flex flex-column align-items-center profile-edit-bio-container p-2'>
                            <label className='profile-edit-label' for='bio'>Bio:</label>
                            <textarea className='profile-edit-bio' placeholder='Text-input' name='bio' type='text' onChange={handleChange} value={bio}/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='col-12 d-flex flex-column justify-content-center align-items-center text-center p-2'>
                    <label className='profile-edit-label best-works-label p-2 m-2' for='best-works'>Best Works</label>
                    { bestWorks && bestWorks.length > 0 ? 
                        bestWorks.map( (element, id) => 
                            <input key={id} className='best-works-input m-2' name={'best-works-' + id} type='text' placeholder='Links to Best Works' value={element} onChange={handleWorksChange}/>
                        ) 
                        : <p>Not rendering</p> 
                    }

                    {/* <input className='best-works-input m-2' name='best-works-one' type='text' placeholder='Links to Best Works' value={bestWorksOne} />
                    <input className='best-works-input m-2' name='best-works-two' type='text' placeholder='Links to Best Works' value={bestWorksTwo} />
                    <input className='best-works-input m-2' name='best-works-three' type='text' placeholder='Links to Best Works' value={bestWorksThree} /> */}
                    <button className='profile-edit-btn submit' type='submit'>Create</button>
                    <Link to={{pathname:"/profile"}}><button className='profile-edit-btn submit'>cancel</button></Link>
                </div>
            </div>
        </form>
    )
}