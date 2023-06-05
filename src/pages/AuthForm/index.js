import React, {useState} from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import API from "../../utils/Api";
import './style.css';

export default function AuthForm(props) {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const handleChange = e =>{
    if (e.target.name === "username") {
      setUsername(e.target.value)
    } else if (e.target.name === "email") {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }
  const submitHandler = e =>{
    e.preventDefault()
    if(props.type === "signin"){
      API.signin({
        username:username,
        password:password
      }).then(data=>{
        console.log(data);
        props.setUserId(data.user.id)
        props.setUsername(data.user.username)
        props.setToken(data.token)
        localStorage.setItem("token", data.token)

        navigate('/profile')
      }).catch(err=>{
        alert("unable to sign in")
      })
    } else {
      API.signup({
        username:username,
        email:email,
        password:password
      }).then(data=>{
        console.log(data);
        props.setUserId(data.user.id)
        props.setUsername(data.user.username)
        props.setToken(data.token)
        props.setEmail(data.user.email)
        localStorage.setItem("token", data.token)

        navigate('/profile/create')
      }).catch(err=>{
        localStorage.removeItem("token")
        alert("unable to sign up")
      })     
    }
  }
    
  return (
    <div className="row auth-container d-flex flex-column align-items-center justify-content-center p-2">
      <h2 className="text-center align-self-center">{props.type}</h2>
      <div className="col-6 d-flex flex-column justify-content-center text-center auth-form p-3">
        <form onSubmit={submitHandler}>
          <div className="col-12 d-flex flex-column align-items-center p-3">
            <label className='auth-form-label' for='username'>Username</label>
            <input className='user-input' name="username" placeholder="username" value={username} onChange={handleChange}/>
          </div>
          <hr />
          <div className="col-12 d-flex flex-column align-items-center p-3">
            <label className='auth-form-label' for='password'>Password</label>
            <input className='user-input' name="password" type="password" placeholder="password" value={password} onChange={handleChange}/>
          </div>
          <hr />
          {props.type === "signup" ? (
            <div className="col-12 d-flex flex-column align-items-center p-3">
              <label className='auth-form-label' for='email'>Email</label>
              <input className='user-input' name="email" placeholder="email" value={email} onChange={handleChange} />
            </div>
            ) : null}
          <button className="auth-form-btn">{props.type}</button>
          { props.type === 'signup' ? 
            <p>Already have an account? <Link className='nav-bar-link sign-in-link' to={{ pathname: "/signin" }}>Sign In</Link></p> 
            : null
          }
          
        </form>
      </div>
    </div>
  );
}
