import React from "react";
import { useState, useEffect } from 'react';
import { NavLink as Link } from "react-router-dom";
import API from "../../utils/Api";
import './style.css';

// TODO: Best Works is stringify
    // Parse through best works to be able to iterate with map
export default function Profile({ userId }) {
  const [picture, setPicture] = useState('https://placekitten.com/300/300');
  const [firstName, setFirstName] = useState('FIRST');
  const [lastName, setLastName] = useState('LAST');
  const [bio, setBio] = useState('Create a profile first!');
  const [languages, setLanguages] = useState([]);
  const [bestWorks, setBestWorks] = useState([]);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  const getProfile = async () => {
    const user = await API.getProfile(userId);
    console.log(user);
    if (user.Profile) {
      setUser(user);
      setProfile(user.Profile);
      // setPicture( z.Profile.picture );
      // setFirstName( z.Profile.firstName );
      // setLastName( z.Profile.lastName );
      // setBio( z.Profile.bio );
      setBestWorks( JSON.parse(user.Profile.bestWorks) );
      setLanguages( user.Languages );
    } 
  }

  useEffect( () => {
    getProfile();
  }, [userId]);

  return (
    <div className="row d-flex flex-column justify-content-center align-self-center align-items-center profile-container h-100 p-2 m-auto">
      <div className="col-12 d-flex flex-column justify-content-center align-items-center profile-inner-container p-2">
        <div className='col-12 d-flex flex-column justify-content-center align-items-center flex-wrap p-2 border'>
            <img className='profile-picture' src={profile.picture} alt='profile pic'/>
            <h2 className="p-2 profile-name border">{profile.firstName} {profile.lastName}</h2>
            <p className="p-2 m-auto profile-bio border">{profile.bio}</p>
        </div>
        <div className="col-12 d-flex align-items-center justify-content-center p-2 border">
          <div className='d-flex flex-column justify-content-start align-items-center profile-proficiencies-container p-2 mx-2 border'>
              <h3 className="profile-proficiencies p-2">Proficiencies</h3>
              <div className='col-12 d-flex justify-content-evenly flex-wrap p-2 border'>
                { languages.length > 0 ?
                  languages.map( (x) => <p className='text-center profile-language-tags' key={x.id}>{x.name}</p>)
                  : <p>No languages present</p> }
              </div>
          </div>
          <div className="d-flex flex-column align-items-center profile-works-container p-2 mx-2 border">
            <h3 className="text-center profile-best-works p-2">Best Works</h3>
            { bestWorks ?
              bestWorks.map( (x, i) => <a className="profile-links p-2 my-2" href={x} key={i} target="_blank" rel="noreferrer">{x}</a>)
              : null }
          </div>
          <div className="d-flex flex-column align-items-start profile-stats-container p-2 mx-2 border">
              <h3 className="align-self-center p-2">Stats</h3>
              <p className="border">Owner of {user.Owner.length} projects</p>
              <p>Involved in {user.Developer.length} other projects!</p>
              <p>Proficient in {user.Languages.length} languages</p>
          </div>
        </div>
      </div>
      <div className="col-12 text-end p-2">
        <Link to={{pathname:"/profile/edit"}}><button className="profile-btn-edit m-2">Edit</button></Link>
        <Link to={{pathname:"/profile/create"}}><button className="profile-btn-create m-2">Create</button></Link>
      </div>
    </div>
  );
}
