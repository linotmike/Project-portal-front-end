import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/Api';
import './style.css';

export default function ViewProfile() {
    const Navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('');
    const [bestWorks, setBestWorks] = useState([]);
    const [bestWorksOne, setBestWorksOne] = useState('');
    const [bestWorksTwo, setBestWorksTwo] = useState('');
    const [bestWorksThree, setBestWorksThree] = useState('');
    
    const getProfile = async () => {
        try {
            const z = await API.getProfile(userId);
            setPicture(z.Profile.picture);
            setFirstName(z.Profile.firstName);
            setLastName(z.Profile.lastName);
            setBio(z.Profile.bio);
            setBestWorks(z.Profile.bestWorks.split(' '));
            setBestWorksOne(bestWorks[0]);
            setBestWorksTwo(bestWorks[1]);
            setBestWorksThree(bestWorks[2]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        getProfile();
    }, [userId]);

    return 
}