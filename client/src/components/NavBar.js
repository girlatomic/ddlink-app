import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">DDLink</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/mainpage" className="nav-link" aria-current="page">Find your project</Link>
                </li>
                <li className="nav-item">
                <Link to={`/users/${props.user.id}`} className="nav-link"><i className="fa-solid fa-gear"></i> Settings </Link>
                </li>
                <li className="d-flex">
                <Link to="/login" className="nav-link"><i className="fab fa-solid fa-circle-user"></i> Login </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </div>

  )
}
