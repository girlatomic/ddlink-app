import React, { useState, useEffect } from 'react'
import NewEditUserForm from './NewEditUserForm';
import { useParams } from "react-router-dom";
import Api from '../helpers/Api';



 function UserInfo() {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    let { userId } = useParams();

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        let response = await Api.getUser(userId);
        console.log('this is the reesss', response)
        if (response.ok) {
            setUser(response.data);
            setErrorMsg('');
        } else {
            setUser(null);
            setErrorMsg(response.error);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

  return (
    <div className="container">
        <h2>Profile</h2>
        <div className="container mt-5 mb-5">
          <div className="row no-gutters">
              <div className="col-md-4 col-lg-4">
                <img src={user.picture} className="profile"/>
              </div>
              <div className="col-md-8 col-lg-8">
                  <div className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center">
                          <h3 className="display-4">{user.given_name} {user.family_name}</h3><i className="fa fa-facebook"></i><i className="fa fa-google"></i><i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i><i className="fa fa-linkedin"></i>
                      </div>
                      <div className="p-3 bg-black text-white">
                          <h6>{user.bio}</h6>
                      </div>
                      <div className="d-flex flex-row text-white">
                          <div className="p-3 bg-primary text-center skill-block">
                              <h6>Bootstrap</h6>
                          </div>
                          <div className="p-3 bg-success text-center skill-block">
                              <h6>Jquery</h6>
                          </div>
                          <div className="p-3 bg-warning text-center skill-block">
                              <h6>HTML</h6>
                          </div>
                          <div className="p-3 bg-danger text-center skill-block">
                              <h6>PHP</h6>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default UserInfo;
