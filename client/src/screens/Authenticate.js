import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Authenticate(props) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  const register = () => {
    axios({
      method: "post",
      url: "/register",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true
      
    }).then((res) => console.log(res));
  };

  const login = () => {
    axios({
      method: "post",
      url: "/login",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true
      
    }).then((res) => {
      console.log(res)
      props.setUser({...res.data.user, loggedIn:true})
    })
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
    </div>
  );
}
export default Authenticate;
