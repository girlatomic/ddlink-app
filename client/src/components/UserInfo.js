import React, { useState, useEffect } from 'react'
import NewEditUserForm from '../pages/NewEditUserForm';


 function UserInfo() {
    const [userData, setUserData] = useState({});
  useEffect(() => {
    showUserData()
  }, []);

  async function showUserData() {
    try {
      let userDataResults = await fetch(`/users/1`)
      if (userDataResults.ok) {
        let data = await userDataResults.json();
        console.log(data);
        setUserData(data)
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }
  return (
    <div className="container">
        <h2>Profile</h2>
        <div className="container mt-5 mb-5">
          <div className="row no-gutters">
              <div className="col-md-4 col-lg-4">
                <img src={userData.picture} className="profile"/>
              </div>
              <div className="col-md-8 col-lg-8">
                  <div className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center">
                          <h3 className="display-4">{userData.given_name} {userData.family_name}</h3><i className="fa fa-facebook"></i><i className="fa fa-google"></i><i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i><i className="fa fa-linkedin"></i>
                      </div>
                      <div className="p-3 bg-black text-white">
                          <h6>{userData.bio}</h6>
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
