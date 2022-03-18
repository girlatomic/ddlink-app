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
        <h2>Settings</h2>
        <div className="text-start mt-5 mb-5">
          <a href="/newedituserform" class="btn btn-primary">Edit Details</a>
        </div>
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Bio</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <th scope="row">1</th>
            <td>{userData.first_name}</td>
            <td>{userData.last_name}</td>
            <td>{userData.bio}</td>
            </tr>
            </tbody>
            </table>
        </div>
  )
}

export default UserInfo;
