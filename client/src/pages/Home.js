import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div>
    <div className="hero vh-100 d-flex align-items-center" id="home">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 mx-auto text-center">
                    <h1 className="display-4 text-white">Welcome to DDlink!</h1>
                    <p className="text-white my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quia
                        sequi eius. Quas, totam aliquid. Repudiandae reiciendis vel excepturi ipsa voluptate dicta!</p>
                    <a href="#" className="btn me-2 btn-primary">Get Started</a>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}
