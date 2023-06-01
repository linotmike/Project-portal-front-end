import React from "react";
import { useState, useEffect } from 'react';

export default function Home() {
  const [picture, setPicture] = useState('https://placekitten.com/200/300');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [languages, setLanguages] = useState([]);
  const [bestWorks, setBestWorks] = useState([]);

  const profile = {
    firstName: firstName,
    lastName: lastName,
    bio: bio,
    picture: picture,
    bestWorks: bestWorks
  }

  useEffect( () => {



    setFirstName('EJ');
    setLastName('Muna');
    setBio('This is a small biography demo');
    setLanguages([ ...languages, 'HTML', 'CSS', 'JavaScript', 'React', 'node.js' ]);
    setBestWorks([ ...bestWorks, 'https://react-bear-portfolio.netlify.app/' ])
  }, []);

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-lg-5 col-12">
          <img src={picture} alt='profile pic'/>
        </div>
        <div className="col-lg-5">
          <div className="col-12">{firstName} {lastName}</div>
          <div className="col-12">{bio}</div>
          {languages ? 
            languages.map((x,i) => <div key={i} className="col-12">{x}</div>) 
            : null }
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
