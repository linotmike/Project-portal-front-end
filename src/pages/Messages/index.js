import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import './style.css';
import API from "../../utils/Api";

//const URL_PREFIX = "http://localhost:3001"
 const URL_PREFIX = 'https://projectportal-backend.herokuapp.com'
const socket = io.connect(URL_PREFIX)

export default function Messages(props) {
  const [projects, setProjects] = useState([]); // holds state of current user's projects
  
  // Room State
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  // Message States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const joinRoom = (roomNumber) => {
    if(roomNumber !== "") {
      socket.emit("join_room", {oldRoom: room, newRoom: roomNumber});
    }
  };

  // pass project id as the room number
  const assignRoom = (roomNumber) => {
    setRoom(roomNumber);
    joinRoom(roomNumber);

    API.getMessages(roomNumber)
      .then((data) => {
        setMessages(data); // set messages to history of messages under this project
      }).catch((error) => {
        console.error(error);
      });
  };

  const sendMessage = () => {
    if(message.trim() === "") {
      return;
    }

    socket.emit("send_message", { message, room });
    // TODO: use POST route to add message to database, then send GET route response to setMessages() ex. setMessages([res.json()])
    API.sendMessage(props.userId, room, message);
    API.getMessages(room)
      .then((data) => {
        setMessages(data); // set messages to history of messages under this project
        console.log("Messages: ", messages);
      }).catch((error) => {
        console.error(error);
      });

    setMessage(""); // clear input field after sending message
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // TODO: pass GET route response to setMessages(). ex. setMessages([res.json()])
      API.getMessages(room)
        .then((data) => {
          setMessages(data); // set messages to history of messages under this project
          console.log("Messages 2: ", messages);
        }).catch((error) => {
          console.error(error);
        });
    });
  }, [socket, messages, room]);

  useEffect(() => {
    API.getProjectsByUser(props.userId)
      .then((data) => {
        setProjects(data); // set projects to our array
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="messaging-view">
      <section>
        <h3>Room name: {roomName}</h3>
        {projects.map((project) => (
          <div key={project.id}>
            <button onClick={() => {
              assignRoom(project.id)
              setRoomName(project.name)
            }}>{project.name}</button>
          </div>
        ))}
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
            <p>{msg.User.username}: {msg.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
