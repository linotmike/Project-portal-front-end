import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../utils/Api';
// import Profile from '../Profile';
import './style.css';

function SingleProfile ({profile}) {
   return (<div>
    {profile.firstName}
    <div className="row">
            <div className="col-lg-5 col-12">
              <img src={profile.picture} alt='profile pic'/>
            </div>
            <div className="col-lg-5">
              <div className="col-12">{profile.firstName} {profile.lastName}</div>
              <div className="col-12">{profile.bio}</div>
              
            </div>
            <div className="col-12">
              <div className="text-center">BEST WORKS</div>
              { profile.bestWorks ? 
                profile.bestWorks.split(' ').map( (x, i) => <a href={x} key={i} target="_blank" rel="noreferrer">{x}</a>)
                : null }
                
            </div>
          </div>
   </div>)
}
export default function ViewProfile() {
  const [profiles,setProfiles] = useState([])
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [bio, setBio] = useState('');
    // const [picture, setPicture] = useState('');
    // const [bestWorks, setBestWorks] = useState([]);
    // const [bestWorksOne, setBestWorksOne] = useState('');
    // const [bestWorksTwo, setBestWorksTwo] = useState('');
    // const [bestWorksThree, setBestWorksThree] = useState('');
    
    const [ownerId, setOwnerId] = useState();

    
    
    useEffect( () => {
        setOwnerId(localStorage.getItem('owner_id'));
    }, []);
    
    const getProfiles = async () => {
        try {
            const z = await API.getProfiles();
            setProfiles(z)
            console.log(z);
            // setPicture(z.Profile.picture);
            // setFirstName(z.Profile.firstName);
            // setLastName(z.Profile.lastName);
            // setBio(z.Profile.bio);
            // setBestWorks(z.Profile.bestWorks.split(' '));
            // setBestWorksOne(bestWorks[0]);
            // setBestWorksTwo(bestWorks[1]);
            // setBestWorksThree(bestWorks[2]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        getProfiles();
        // console.log(ownerId);
    }, []);

    return (
        <div>
          {profiles.map ( (profile,i)=>{return profile.Profile?<SingleProfile key={i}profile= {profile.Profile}/>: null})}
          
        </div>
      );
}