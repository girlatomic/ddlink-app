import React, {useState, useEffect} from "react";
// import { Routes, Route, useNavigate } from 'react-router-dom';
import './Login.css';
import GoogleLogin from 'react-google-login';

function Login() {
  // const navigate = useNavigate();
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleLogin = async googleData => {
    const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
    // navigate('/projectstable');
  }

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  return (
    <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card border-1 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">Sign in</h5>
    
                  <form>
                    <div className="form-floating mb-3">
                      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                      <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                      <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                      <label className="form-check-label" htmlFor="rememberPasswordCheck">
                        Remember password
                      </label>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Login</button>
                    </div>
                    <hr className="my-4"/>
                    <div className="d-grid mb-2">
                    {loginData ? (
                      <div>
                        <h3> You logged in as {loginData.email}</h3>
                        <div>
                          <img src={loginData.picture}/>
                        </div>
                        <div>
                          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </div>
                      </div>
                    ) : (
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Sign in with Google"
                      // className="ct-button ct-button--secondary"
                      onSuccess={handleLogin}
                      onFailure={handleFailure}
                      cookiePolicy="single_host_origin"
                    />
                    )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login