import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import API from "../../utils/Api";

const socket = io.connect("http://localhost:3001")

export default function Messages(props) {
  const [projects, setProjects] = useState([]); // holds state of current user's projects
  
  // Room State
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  // Message States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = (roomNumber) => {
    if(roomNumber !== "") {
      console.log("new room number:",roomNumber);
      socket.emit("join_room", {oldRoom: room, newRoom: roomNumber});
    }
  };

  // pass project id as the room number
  const assignRoom = (roomNumber) => {
    joinRoom(roomNumber);
    setRoom(roomNumber);
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
