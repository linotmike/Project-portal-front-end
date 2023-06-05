import {Routes, Route,  useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from './components/Header';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import ProjectUpload from './pages/ProjectUpload'
import AuthForm from './pages/AuthForm';
import Search from './pages/Search';
import CreateProfile from "./pages/CreateProfile";
import ProfileEdit from "./pages/ProfileEdit";
import API from "./utils/Api";
import './utils/style.css';


export default function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
   const navigate = useNavigate()
 
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
  const logout = () =>{
    setUserId(null)
    setUsername("")
    setToken("")
    setEmail("")
    localStorage.removeItem("token")
    navigate('/')
  }
  return (
    <div className="container-fluid">
      {/* <Router> */}
        <Header userId={userId} username={username} logout={logout} />
        <hr />
        <div className="router-container">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile userId={userId}/>} />
            <Route path='/profile/create' element={<CreateProfile userId={userId}/>} />
            <Route path='/profile/edit' element={<ProfileEdit userId={userId} /> } />
            <Route path="/projects" element={<ProjectUpload userId={userId}/>} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/signin" element={<AuthForm type="signin" setUserId={setUserId} setUsername={setUsername} setToken={setToken}/>} />
            <Route path="/signup" element={ <AuthForm type="signup" setUserId={setUserId} setUsername={setUsername} setToken={setToken} setEmail={setEmail}/>} />
            <Route path='/projects/search/' element={<Search />} />
          </Routes>
        </div>    
      {/* </Router> */}
      <hr/>
      <h2>FOOTER</h2>
    </div>
  );
}

 
