import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import ProjectUpload from './pages/ProjectUpload'
import SignIn from './pages/SignIn'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<ProjectUpload />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>    
      </Router>
      <hr/>
      <h2>FOOTER</h2>
    </div>
  );
}

 
