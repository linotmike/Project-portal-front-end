import React from "react";
import { useState, useEffect } from 'react';
import { NavLink as Link } from "react-router-dom";
import API from "../../utils/Api";
import './style.css';

export default function Profile({ userId }) {
  const [picture, setPicture] = useState('https://placekitten.com/300/300');
  const [firstName, setFirstName] = useState('FIRST');
  const [lastName, setLastName] = useState('LAST');
  const [bio, setBio] = useState('Create a profile first!');
  const [languages, setLanguages] = useState([ {name: 'CREATE'}, {name: 'A'}, {name: 'PROFILE'} ]);
  const [bestWorks, setBestWorks] = useState(['CREATE', 'A', 'PROFILE']);

  const getProfile = async () => {
    const z = await API.getProfile(userId);
    console.log(z);
    if (z.msg !== 'no such user') {
      setPicture(z.Profile.picture);
      setFirstName(z.Profile.firstName);
      setLastName(z.Profile.lastName);
      setBio(z.Profile.bio);
      setBestWorks(z.Profile.bestWorks.split(' '));
      if (languages.length === 0) {
        setLanguages( [ ...languages, ...z.Languages ] );
      }
    } 
  }

  useEffect( () => {
    getProfile();
  }, [userId]);

  return (
    <div className="row d-flex flex-column justify-content-center align-items-center profile-container p-2 m-auto">
      <div className="col-10 d-flex flex-column justify-content-center align-items-center profile-inner-container p-2 m-2 ">
        <div className='col-10 d-flex justify-content-center flex-wrap p-2'>
          <div className='col-md-5 col-12 text-center p-2'>
            <img className='profile-picture' src={picture} alt='profile pic'/>
          </div>
          <div className='col-md-5 col-12 d-flex flex-column justify-content-around align-items-center p-2'>
            <h2 className="p-2 profile-name">{firstName} {lastName}</h2>
            <div className='col-12 p-2'>
              <p className="p-2 m-auto profile-bio">{bio}</p>
            </div>
            <div className="col-12 d-flex flex-column align-items-center profile-proficiencies-container p-2">
              <h3 className="profile-proficiencies">Proficiencies</h3>
              <div className='col-12 d-flex justify-content-evenly flex-wrap p-2'>
                { languages.length > 0 ?
                  languages.map( (x) => <p className='col-2 d-inline text-center profile-language-tags m-auto' key={x.id}>{x.name}</p>)
                  : <p>No languages present</p> }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-12 d-flex flex-column align-items-center p-2">
          <h3 className="text-center profile-best-works p-2">BEST WORKS</h3>
          { bestWorks ?
            bestWorks.map( (x, i) => <a className="profile-links" href={x} key={i} target="_blank" rel="noreferrer">{x}</a>)
            : null }
        </div>
      </div>
      <div className="col-12 text-end p-2">
        <Link to={{pathname:"/profile/edit"}}><button className="profile-btn-edit m-2">Edit</button></Link>
        <Link to={{pathname:"/profile/create"}}><button className="profile-btn-create m-2">Create</button></Link>
      </div>
    </div>
  );
}
