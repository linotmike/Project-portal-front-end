import React, {useState} from "react";
import API from "../../utils/Api";
import { redirect,useNavigate } from "react-router-dom";

export default function AuthForm(props) {
  const navigate = useNavigate()
  const  [username, setUsername] = useState("")
  const  [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const handleChange = e =>{
    if (e.target.name === "username"){
      setUsername(e.target.value)
    }else if (e.target.name === "email"){
      setEmail(e.target.value)
    } 
    else {
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
        
        navigate('/')

      }).catch(err=>{
        // localStorage.removeItem("token")
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
        navigate('/')

      }).catch(err=>{
        localStorage.removeItem("token")
        alert("unable to sign up")
      })
      
    }

  }
    
  return (
    <section>
      <form onSubmit={submitHandler}>
        <input name="username" placeholder="username" value={username} onChange={handleChange}/>
        <input name="password" placeholder="password" value={password} onChange={handleChange}/>
        {props.type === "signup" ? (
          <input name="email" placeholder="email" value={email} onChange={handleChange}/>
        ) :null}
        <button >{props.type}</button>
      </form>
    </section>
  );
}
