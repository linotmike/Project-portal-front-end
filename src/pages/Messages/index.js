import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import './style.css';
import API from "../../utils/Api";

const socket = io.connect("http://localhost:3001")

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

    socket.emit("send_message", { message, room }); // send new message to back end
    
    // add message to Message table in database
    API.sendMessage(props.userId, room, message);

    // save updated set of messages in messages state array
    API.getMessages(room)
      .then((data) => {
        setMessages(data); // set messages to history of messages under this project
        console.log("Messages: ", messages);
      }).catch((error) => {
        console.error(error);
      });

    setMessage(""); // clear input field after sending message
  };

  // gets messages under user
  useEffect(() => {
    socket.on("receive_message", (data) => {

      // update messages array
      API.getMessages(room)
        .then((data) => {
          setMessages(data); // set messages to history of messages under this project
          console.log("Messages 2: ", messages);
        }).catch((error) => {
          console.error("API Error:", error.response);
        });
    });
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
            <p>{msg.User.username}: {msg.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
