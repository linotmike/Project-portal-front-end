import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import './style.css';
import API from "../../utils/Api";
import DayJS from 'react-dayjs';

// const URL_PREFIX = "http://localhost:3001"
  const URL_PREFIX = 'https://projectportal-backend.herokuapp.com';

const socket = io.connect(URL_PREFIX);

export default function Messages(props) {
  const [projects, setProjects] = useState([]); // holds state of current user's projects

  // Room State
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  // Message States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [picture, setPicture] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  // communicates with backend to switch rooms
  const joinRoom = (roomNumber) => {
    if(roomNumber !== "") {
      socket.emit("join_room", {oldRoom: room, newRoom: roomNumber});
    }
  };

  // switch rooms but assiging project id as room number
  const assignRoom = (roomNumber) => {
    setRoom(roomNumber); // set state to new room number
    joinRoom(roomNumber); // join new room

    // get saved messages under new room so we can display it to the page
    API.getMessages(roomNumber)
      .then((data) => {
        // console.log("Messages:", data);
        setMessages(data); // set messages state to history of messages under this project
      }).catch((error) => {
        // console.error(error);
      });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // make sure message isn't an empty string
    if(message.trim() === "") {
      return;
    }

    // add message to Message table in database
    API.sendMessage(props.userId, room, message).then((res) => {
      setCreatedAt(res.createdAt);
    });

    const msgObj = { 
      user_id: props.userId,
      username: props.username,

      // TODO: figure out how to pass in the profile picture, maybe pass it in as a prop in App.js
      picture: props.picture,

      // createdAt <-- doesn't need to be passed in as database will automatically add the date
      createdAt: createdAt,
      project_id: room,
      text: message,
    };

    socket.emit("send_message", { msgObj, room }); // send new message to back end
    

    setMessage(""); // clear input field after sending message
  };

  // gets messages under user
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      // console.log("Data: ", data);
      setMessages(prevMessages => ([...prevMessages, data]));
    }

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    }
  }, [socket, messages, room, props.userId]);

  // get projects under logged in user
  const searchProjects = () => {
    API.getProjectsByUser(props.userId)
      .then((data) => {
        setProjects(data); // set projects to our array
      })
      .catch((error) => {

      });
  };

  // search projects under current user, makes sure to retain projects under user on page refresh
  useEffect(() => {
    if(props.userId) {
      searchProjects();
      if (props.picture !== null) {
        setPicture(props.picture);
      }
    } else {
      // console.log("No user id");
    }
  }, [props.userId]);

  return (
    <div className="row d-flex justify-content-evenly p-2 border">
      <div className="col-3 d-flex flex-column justify-content-start text-center projects-display p-3">
          {projects.length > 0 ?
            ( projects.map((project) => (
                <button 
                  className='project-message-btn m-1' 
                  type="button"
                  key={project.id}
                  onClick={() => {
                    assignRoom(project.id);
                    setRoomName(project.name);
                  }}>{project.name}</button>
              )))
              : <p>No projects found</p> }
      </div>
      <div className={room ? "col-7 d-flex flex-column justify-content-start message-display p-3" : "col-7 d-flex flex-column justify-content-start p-3"} >
        <h1 className="align-self-center p-2 project-message-room-name">{roomName}</h1>
        <div className="col-12 d-flex flex-column justify-content-evenly project-message-container py-2">
          { messages.map((msg, index) => (
              <div className={ props.userId === msg.user_id ? "d-flex flex-row justify-content-end align-self-end h-10 p-2 m-2"
                : "d-flex flex-row-reverse justify-content-start align-self-start h-10 p-2 m-2" }
                key={index}>
                <DayJS format='h:mm A'>{msg.createdAt}</DayJS>
                <div
                  className={ props.userId === msg.user_id ? "d-flex flex-row-reverse justify-content-end align-self-end h-10 p-2 mx-2 project-message-send border"
                   : "d-flex justify-content-start align-self-start h-10 p-2 mx-2 project-message-receive border" }
                  key={index}>
                    <img className='message-picture align-self-center border' src={msg.picture} alt='profile-picture'/>
                    <div className="d-flex flex-column px-2">
                      <p className="align-self-center m-0">{msg.username}</p>
                      <p className="m-0">{msg.text}</p>
                    </div>
                </div>
              </div>
          ))}
        </div>
        { room !== "" && 
          ( <form onSubmit={sendMessage}>
              <div className="col-12 d-flex justify-content-between project-message-input-container p-2">
                <input
                  className="project-message-input p-1"
                  placeholder={"Message members of " + roomName}
                  onChange={(event) => setMessage(event.target.value)}
                  value={message}
                />
                <button
                  className="project-message-send-btn">Send</button>
              </div>
          </form> )
        }
      </div>
    </div>
  );
}
