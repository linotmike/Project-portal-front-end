import React from "react";
import { useState, useEffect } from 'react';
import { NavLink as Link, useNavigate } from "react-router-dom";
import API from "../../utils/Api";

export default function Profile({ userId }) {
  const navigate = useNavigate()
  const [picture, setPicture] = useState('https://placekitten.com/200/300');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [languages, setLanguages] = useState([]);
  const [bestWorks, setBestWorks] = useState([]);

  const getProfile = async () => {
    const z = await API.getProfile(userId);
    console.log(z);
    setPicture(z.Profile.picture);
    setFirstName(z.Profile.firstName);
    setLastName(z.Profile.lastName);
    setBio(z.Profile.bio);
    setBestWorks(z.Profile.bestWorks.split(' '));
    if (languages.length === 0) {
      setLanguages( [ ...languages, ...z.Languages ] );
    }
  }

  const RenderLanguages = () => {
    console.log(languages);
    for (let x of languages) {
      return <div key={x.id}>{x.name}</div>
    }
      
  }

  // TODO: Fix bug whenever you refresh page, cannot activate api again
  useEffect( () => {
    getProfile();
  }, []);

  return (
    <div className="container-fluid p-3">
      <Link to={{pathname:"/profile/edit"}}><button>Edit</button></Link>
      <div className="row">
        <div className="col-lg-5 col-12">
          <img src={picture} alt='profile pic'/>
        </div>
        <div className="col-lg-5">
          <div className="col-12">{firstName} {lastName}</div>
          <div className="col-12">{bio}</div>
          <div className="col-12">
            <div>Proficiencies:</div>
           
            { languages ?
              languages.map( (x) => <div key={x.id}>{x.name}</div>)
              : null }
          </div>
        </div>
        <div className="col-12">
          <div className="text-center">BEST WORKS</div>
          { bestWorks ? 
            bestWorks.map( (x, i) => <a href={x} key={i} target="_blank" rel="noreferrer">{x}</a>)
            : null }
            
        </div>
      </div>
    </div>
  );
}
