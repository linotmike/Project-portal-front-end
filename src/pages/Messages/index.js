import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import './style.css';
import API from "../../utils/Api";

const URL_PREFIX = "http://localhost:3001"
//const URL_PREFIX = 'https://projectportal-backend.herokuapp.com';

const socket = io.connect(URL_PREFIX);

export default function Messages(props) {
  const [projects, setProjects] = useState([]); // holds state of current user's projects

  // Room State
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  // Message States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
        console.log("Messages:", data);
        setMessages(data); // set messages state to history of messages under this project
      }).catch((error) => {
        console.error(error);
      });
  };

  const sendMessage = () => {
    // make sure message isn't an empty string
    if(message.trim() === "") {
      return;
    }

    const msgObj = { 
      user_id: props.userId,
      username: props.username,

      // TODO: figure out how to pass in the profile picture, maybe pass it in as a prop in App.js
      // picture: props.picture,

      // createdAt <-- doesn't need to be passed in as database will automatically add the date
      project_id: room,
      text: message,
    };

    socket.emit("send_message", { msgObj, room }); // send new message to back end
    
    // add message to Message table in database
    API.sendMessage(props.userId, room, message);

    setMessage(""); // clear input field after sending message
  };

  // gets messages under user
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log("Data: ", data);
      setMessages(prevMessages => ([...prevMessages, data]));
    }

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    }
  }, [socket, messages, room, props.userId]);

  // get projects under logged in user
  const searchProjects = () => {
    try {
      API.getProjectsByUser(props.userId)
        .then((data) => {
          setProjects(data); // set projects to our array
        }).catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // search projects under current user, makes sure to retain projects under user on page refresh
  useEffect(() => {
    if(props.userId) {
      searchProjects();
    } else {
      console.log("No user id");
    }
  }, [props.userId]);

  return (
    <div className="messaging-view">
      <section>
        <h3>Room name: {roomName}</h3>
        {projects.length > 0 ? (
    projects.map((project) => (
      <div key={project.id}>
        <button
          onClick={() => {
            assignRoom(project.id);
            setRoomName(project.name);
          }}
        >
          {project.name}
        </button>
      </div>
    ))
  ) : (
    <p>No projects found.</p>
  )}
      </section>
      <section>
        {room !== "" && (
          <>
            <input 
              placeholder="message..." 
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
            <button onClick={sendMessage}>Send Message</button>
          </>
        )}
        <h1> Messages: </h1>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.username}: {msg.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
