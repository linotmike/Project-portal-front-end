import "./App.css";
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import ProjectUpload from './pages/ProjectUpload'
import SignIn from './pages/SignIn'

export default function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<ProjectUpload />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>

      
      </Router>
    </div>
  );
}

 
