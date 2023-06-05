import React from "react";
import io from 'socket.io-client';
import { useState, useEffect } from "react"
import API from "../../utils/Api";

const socket = io.connect("http://localhost:3001")

export default function Messages(props) {
  const [projects, setProjects] = useState([]); // holds state of current user's projects


  useEffect(() => {
    API.getProjectsByUser(props.userId)
      .then((data) => {
        console.log(data);
        setProjects(data); // set projects to our array
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  // const sendMessage = () => {
  //   socket.emit("send_message", { message: "hello" });
  // };

  // useEffect(() =>{
  //   socket.on("receive_message", (data) => {
  //     alert(data.message);
  //   })
  // }, [socket])

  return (
    <div>
      <section>
        {projects.map((project) => (
          <div key={project.id}>
            <h3>{project.name}</h3>
          </div>
        ))}
      </section>
      {/* <section>
        <input placeholder="message..."></input>
        <button onClick={sendMessage}>Send Message</button>
      </section> */}
    </div>
  );
}
