import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../utils/Api';
import './style.css';

// TODO: Data not transferring from modal to viewProfile link
// TODO: Watch redux lecture to pass information in global state
export default function ViewProfile() {
    // const location = useLocation();
    // const { ownerId } = location.state;

    const Navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('');
    const [bestWorks, setBestWorks] = useState([]);
    const [bestWorksOne, setBestWorksOne] = useState('');
    const [bestWorksTwo, setBestWorksTwo] = useState('');
    const [bestWorksThree, setBestWorksThree] = useState('');
    
    // const getProfile = async () => {
    //     try {
    //         const z = await API.getProfile(ownerId);
    //         console.log(z);
    //         setPicture(z.Profile.picture);
    //         setFirstName(z.Profile.firstName);
    //         setLastName(z.Profile.lastName);
    //         setBio(z.Profile.bio);
    //         setBestWorks(z.Profile.bestWorks.split(' '));
    //         setBestWorksOne(bestWorks[0]);
    //         setBestWorksTwo(bestWorks[1]);
    //         setBestWorksThree(bestWorks[2]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect( () => {
    //     getProfile();
    //     console.log(ownerId);
    // }, []);

    return 
}