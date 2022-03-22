import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
    <div className="hero vh-100 d-flex align-items-center" id="home">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 mx-auto text-center">
                    <h1 className="display-4 text-white">Find your job better <br/>and faster
                    </h1>
                    <p className="text-white my-3">Find a job that suits your interests and talents with DDLink. A high salary is not the top priority. Most importantly, you can work according to your heart's desire.</p>
                    <Link to="/login" className="btn me-2 btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}
