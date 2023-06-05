import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import API from "../../utils/Api";

const socket = io.connect("http://localhost:3001")

export default function Messages(props) {
  const [projects, setProjects] = useState([]); // holds state of current user's projects
  
  // Room State
  const [room, setRoom] = useState("");

  console.log("Room:",room);

  // Message States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = (roomNumber) => {
    if(room !== "") {
      socket.emit("join_room", roomNumber);
    }
  };

  // pass project id as the room number
  const assignRoom = (roomNumber) => {
    setRoom(roomNumber);
    console.log("Room number:",room);
    joinRoom(roomNumber);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  useEffect(() => {
    API.getProjectsByUser(props.userId)
      .then((data) => {
        console.log("Fetched projects:", data );
        setProjects(data); // set projects to our array
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <section>
        {projects.map((project) => (
          <div key={project.id}>
            <button onClick={() => assignRoom(project.id)}>{project.name}</button>
          </div>
        ))}
      </section>
      <section>
        {room !== "" && (
          <>
            <input 
              placeholder="message..." 
              onChange={(event) => setMessage(event.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
          </>
        )}
        <h1> Message: </h1>
        {messageReceived}
      </section>
    </div>
  );
}
