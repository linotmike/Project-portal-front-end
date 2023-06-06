import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import './style.css';
import API from "../../utils/Api";

const URL_PREFIX = "http://localhost:3001"
// const URL_PREFIX = 'https://projectportal-backend.herokuapp.com'
const socket = io.connect(URL_PREFIX)

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

  const sendMessage = (e) => {
    e.preventDefault();

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
    <div className="row d-flex justify-content-evenly p-2 border">
      <div className="col-3 d-flex flex-column justify-content-start text-center p-2 border">
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
      <div className="col-8 d-flex flex-column justify-content-start p-2 border">
        <h1 className="align-self-center p-2 project-message-room-name border">{roomName}</h1>
        <div className="col-12 d-flex flex-column justify-content-evenly project-message-container py-2 border">
          { messages.map((msg, index) => (
              <div
                className={ props.userId === msg.user_id ? "d-flex justify-content-end align-self-end h-10 p-2 m-2 project-message-id border"
                 : "d-flex justify-content-star align-self-start h-10 p-2 m-2 project-message-id border" }
                key={index}>
                  {msg.User.username}: {msg.text}
              </div>
          ))}
        </div>
        { room !== "" && 
          ( <form onSubmit={sendMessage}>
              <div className="col-12 d-flex justify-content-between p-2 border">
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
