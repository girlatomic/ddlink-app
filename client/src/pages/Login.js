import React, { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from 'react-router-dom';
import "./Login.css";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";

function Login(props) {
  const handleFailure = (result) => {
    alert(result);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card text-center border-primary border-1 bg-dark text-light shadow rounded-3 mt-5 pt-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5">
                  Sign in with your Google Account
                </h5>
                <div className="d-flex justify-content-center mb-5">
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    prompt="select_account"
                    render={(renderProps) => (
                      <GoogleButton
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        label="Continue with Google"
                      ></GoogleButton>
                    )}
                    onSuccess={props.googleLogin}
                    onFailure={handleFailure}
                    cookiePolicy="single_host_origin"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
