import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function NavBar(props) {
  let { userId } = useParams();
  return (
    <div>
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand" href="#"><img src="/img/logo-white.svg" className="logo"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link to={`/mainpage/${userId}`} className="nav-link" aria-current="page">Find your project</Link>
                    </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
            {
              props.user
              ?
                (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 g-3">
                    <li className="nav-item">
                      <Link to={`/users/${props.user.id}`} className="nav-link"><i className="fa-solid fa-gear"></i> Settings </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/users/${props.user.id}`} className="nav-link"><i className="fab fa-solid fa-circle-user"></i> {props.user.email} </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/" className="nav-link" onClick={props.logoutCb}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout </Link>
                    </li>
                  </ul>
                )
              :
                (
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 g-3">
                    <li className="d-flex">
                      <Link to="/login" className="nav-link"><i className="fab fa-solid fa-circle-user"></i> Login </Link>
                    </li>
                  </ul>
                )
            }
            </div>
          </div>
        </nav>
    </div>

  )
}
