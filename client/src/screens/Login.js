import React from "react";
import { GoogleLogin } from "react-google-login";


function Login() {
    
    const responseSuccessGoogle = (response) => {
        console.log(response);
    }

    const responseErrorGoogle = (response) => {
        
    }

    return (
    <div className="Login">
      <div className="col-md-6 offset-md-3 text-center">
        <h1>Login with Google</h1>
        <GoogleLogin
          clientId="1084092224337-7lgj0bui87cdc7ftptrpu00skccbq2pm.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={"single_host_origin"}
        />
        ,
      </div>
    </div>
  );
}

export default Login;
