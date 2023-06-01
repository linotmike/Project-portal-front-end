import React, {useState} from "react";
import API from "../../utils/Api";

export default function AuthForm(props) {

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

      }).catch(err=>{
        alert("unable to sign in")
      })
    } else {
      API.signup({
        username:username,
        password:password
      }).then(data=>{
        console.log(data);

      }).catch(err=>{
        alert("unable to sign in")
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
        ) : null}
        <button>{props.type}</button>
      </form>
    </section>
  );
}
