import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../utils/Api';
// import Profile from '../Profile';
import './style.css';

export default function SingleProfile (props) {
  const [languages, setLanguages] = useState([]);
  const [bestWorks, setBestWorks] = useState([]);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  const getProfile = async () => {
    const user = await API.getProfile(props.ownerId);
    if (user.Profile) {
      setUser(user);
      setProfile(user.Profile);
      setBestWorks( JSON.parse(user.Profile.bestWorks) );
      setLanguages( user.Languages );
    } 
  }

  useEffect( () => {
    getProfile();
  }, [props.ownerId]);

  return (
    <div className="row d-flex flex-column justify-content-center align-self-center align-items-center profile-container h-100 p-2 m-auto">
      <div className="col-12 d-flex flex-column justify-content-center align-items-center profile-inner-container p-2">
        <div className='col-12 d-flex flex-column justify-content-center align-items-center flex-wrap p-2'>
            {profile.picture ? <img className='profile-picture' src={profile.picture} alt='profile pic'/> :
                               <img className='profile-picture' src='https://placekitten.com/250/250' alt='profile pic'/>}
            <h2 className="p-2 profile-name">{profile.firstName} {profile.lastName}</h2>
            <p className="p-2 m-auto profile-bio">{profile.bio}</p>
        </div>
        <div className="col-12 d-flex align-items-center justify-content-center profile-cards-container flex-wrap p-2">
          <div className='d-flex flex-column justify-content-start align-items-center profile-proficiencies-container p-2 mx-2 mb-2'>
              <h3 className="profile-proficiencies p-2">Proficiencies</h3>
              <div className='d-flex justify-content-evenly flex-wrap w-100 p-2'>
                { languages.length > 0 ?
                  languages.map( (x) => <p className='text-center profile-language-tags px-1 mx-2' key={x.id}>{x.name}</p>)
                  : <p>No languages present</p> }
              </div>
          </div>
          <div className="d-flex flex-column align-items-center profile-works-container p-2 mx-2 mb-2">
            <h3 className="text-center profile-best-works p-2">Best Works</h3>
            { bestWorks ?
              bestWorks.map( (x, i) => <a className="profile-links p-2 my-2" href={x} key={i} target="_blank" rel="noreferrer">{x}</a>)
              : null }
          </div>
          <div className="d-flex flex-column align-items-start profile-stats-container p-2 mx-2 mb-2">
              <h3 className="align-self-center p-2">Stats</h3>
              {user.Owner && <p className="stats-text">Owner of {user.Owner.length} projects</p>}
              {user.Developer && <p className="stats-text">Involved in {user.Developer.length} other projects!</p>}
              {user.Languages && <p className="stats-text">Proficient in {user.Languages.length} languages!</p>}
          </div>
        </div>
      </div>
      <div className="col-12 text-end p-2">
        {/* {user && user.Profile ? 
          <Link to={{pathname:"/profile/edit"}}><button className="profile-btn-edit m-2">Edit</button></Link> : 
          <Link to={{pathname:"/profile/create"}}><button className="profile-btn-create m-2">Create</button></Link>} */}
      </div>
    </div>
  );
}