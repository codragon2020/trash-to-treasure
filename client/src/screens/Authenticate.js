import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login"
import { Form, Button } from "react-bootstrap";

function Authenticate(props) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginState, setLoginState] = useState("login");
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
    }).then(res => {
      setRegisterUsername("");
      setRegisterPassword("");
      console.log(res);
      setLoginState("login");
    });
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
    }).then(res => {
      console.log(res);
      props.setUser({ ...res.data.user, loggedIn: true });
    });
  };

  const responseSuccessGoogle = (response) => {
    console.log(response)
    axios({
      method: "POST",
      url: "http://localhost:3000/google",
      data: {tokenId: response.tokenId}
    }).then(response => {
      console.log(response);
    })
  }

  const responseErrorGoogle = (response) => {

  }

  return (
    <Form.Group size="lg">
      <div className="App container">
        {loginState === "register" && (
          <div>
            <h1>Register</h1>
            <Form.Row>
              <div className="form-group col">
                <label>First Name</label>
                <input
                  className="form-control"
                  placeholder="First name"
                  onChange={e => setRegisterUsername(e.target.value)}
                />
              </div>
            </Form.Row>
            <Form.Row>
              <div className="form-group col">
                <label>Last Name</label>
                <input
                  className="form-control"
                  placeholder="Last name"
                  onChange={e => setRegisterUsername(e.target.value)}
                />
              </div>
            </Form.Row>
            <Form.Row>
              <div className="form-group col">
                <label>Username</label>
                <input
                  className="form-control"
                  placeholder="Enter username"
                  onChange={e => setRegisterUsername(e.target.value)}
                />
              </div>
            </Form.Row>
            <Form.Row>
              <div className="form-group col">
                <label>Password</label>
                <input
                  className="form-control"
                  placeholder="Enter password"
                  type="password"
                  onChange={e => setRegisterPassword(e.target.value)}
                />
              </div>
            </Form.Row>
            <button
              onClick={register}
              className="btn btn-dark btn-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        )}
        {loginState === "login" && (
          <div>
            <h1>Login</h1>
            <Form.Row>
              <div className="form-group col">
                <label>Username</label>
                <input
                  placeholder="Enter username"
                  className="form-control"
                  onChange={e => setLoginUsername(e.target.value)}
                />
              </div>
            </Form.Row>
            <Form.Row>
              <div className="form-group col">
                <label>Password</label>
                <input
                  placeholder="Enter password"
                  className="form-control"
                  type="password"
                  onChange={e => setLoginPassword(e.target.value)}
                />
              </div>
            </Form.Row>
            <button
              onClick={login}
              className="btn btn-dark btn-lg "
              type="submit"
            >
              Submit
            </button>
          </div>
        )}
        <p
          onClick={() =>
            setLoginState(loginState === "register" ? "login" : "register")
          }
        >
          {loginState === "login"
            ? "Need to Register?"
            : "Already Signed Up? Login"}
        </p>
        <GoogleLogin
          clientId="1084092224337-7lgj0bui87cdc7ftptrpu00skccbq2pm.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
          />
      </div>
    </Form.Group>
  );
}
export default Authenticate;
