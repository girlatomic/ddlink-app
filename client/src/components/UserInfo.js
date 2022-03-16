import React, { useState, useEffect } from 'react'

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
    <div>
        <table class="table">
<thead>
  <tr class="row row-cols-3 row-cols-md-3 g-20">
    <th scope="col">#</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Bio</th>
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
