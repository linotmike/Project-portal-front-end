import React from "react";
import { useState, useEffect } from 'react';
import { NavLink as Link } from "react-router-dom";
import API from "../../utils/Api";

export default function Profile({ userId }) {
  const [picture, setPicture] = useState('https://placekitten.com/300/300');
  const [firstName, setFirstName] = useState('FIRST NAME');
  const [lastName, setLastName] = useState('LAST NAME');
  const [bio, setBio] = useState('Create a profile first!');
  const [languages, setLanguages] = useState([ {name: 'CREATE'}, {name: 'A'}, {name: 'PROFILE'} ]);
  const [bestWorks, setBestWorks] = useState(['CREATE', 'A', 'PROFILE']);

  const getProfile = async () => {
    const z = await API.getProfile(0);
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

  // TODO: Fix bug whenever you refresh page, cannot activate api again
  useEffect( () => {
    getProfile();
  }, []);

  return (
    <div className="row p-2 m-3 border">
      <div className='col-12 d-flex justify-content-center flex-wrap p-2'>
        <div className='col-md-4 col-12 text-center p-2 border'>
          <img src={picture} alt='profile pic'/>
        </div>
        <div className='col-md-4 col-12 d-flex flex-column justify-content-around align-items-center p-2 border'>
          <h2 className="border">{firstName} {lastName}</h2>
          <div className='col-md-8 col-12 d-flex flex-column align-items-center p-2 border'>
            <h5>{bio}</h5>
          </div>
          <div className="col-md-10 col-12 d-flex flex-column align-items-center p-2 border">
            <h3>Proficiencies</h3>
            <div className='col-12 d-flex justify-content-evenly flex-wrap'>
              { languages.length > 0 ?
                languages.map( (x) => <p className='col-2 d-inline text-center border' key={x.id}>{x.name}</p>)
                : <p>No languages present</p> }
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-center">BEST WORKS</h3>
        { bestWorks ? 
          bestWorks.map( (x, i) => <a href={x} key={i} target="_blank" rel="noreferrer">{x}</a>)
          : null }
      </div>
      <Link to={{pathname:"/profile/edit"}}><button>Edit</button></Link>
      <Link to={{pathname:"/profile/create"}}><button>Create</button></Link>
    </div>
  );
}
