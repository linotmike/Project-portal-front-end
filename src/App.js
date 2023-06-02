import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from './components/Header';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import ProjectUpload from './pages/ProjectUpload'
import AuthForm from './pages/AuthForm'
import { useEffect } from "react";
import API from "./utils/Api";

export default function App() {
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    API.verifyToken(storedToken).then(data=>{
      setToken(storedToken);
      setUserId(data.id);
      setUsername(data.username);
    }).catch(err=>{
      console.log("oh noes")
      console.log(err)
      // localStorage.removeItem("token")
    })
  },[])
  
  return (
    <div className="App">
      <Router>
        <Header userId={userId} username={username} />
        <hr />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile  />} />
          <Route path="/projects" element={<ProjectUpload />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/signin" element={<AuthForm type="signin" setUserId={setUserId} setUsername={setUsername} setToken={setToken}/>} />
          <Route path="/signup" element={ <AuthForm type="signup" setUserId={setUserId} setUsername={setUsername} setToken={setToken} setEmail={setEmail}/>} />
          {/* <Route path='/projects/search/:language' element={<Search />} */}
        </Routes>    
      </Router>
      <hr/>
      <h2>FOOTER</h2>
    </div>
  );
}

 
