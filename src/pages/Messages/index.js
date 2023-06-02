import React from "react";
import io from 'socket.io-client';
import { useEffect } from "react"

const socket = io.connect("http://localhost:3001")

export default function Messages() {

  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" });
  };

  useEffect(() =>{
    socket.on("receive_message", (data) => {
      alert(data.message);
    })
  }, [socket])

  return (
    <section>
      <input placeholder="message..."></input>
      <button onClick={sendMessage}>Send Message</button>
    </section>
  );
}
