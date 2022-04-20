import React, { useState, useEffect } from "react";
import NewEditUserForm from "./NewEditUserForm";
import { useParams, Link } from "react-router-dom";
import Api from "../helpers/Api";
import Local from "../helpers/Local";
import EditUser from "./EditUser";

function UserInfo() {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let { userId } = useParams();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let response = await Api.getUser(userId);
    console.log("this is the reesss", response);
    if (response.ok) {
      const data = response.data;
      console.log("this data", data);
      Local.saveUserSkills(data);
      setUser(data);
      setErrorMsg("");
    } else {
      setUser(null);
      setErrorMsg(response.error);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "red" }}>{errorMsg}</h2>;
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center border-bottom mt-5">
        <h2>My Profile</h2>
        <Link to={`/edituser/${userId}`} className="btn btn-primary">
          Edit profile
        </Link>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row no-gutters">
          <div className="col-md-4 col-lg-3">
            <img src={user.picture} className="profile" />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="display-4">
                  {user.given_name} {user.family_name}
                </h3>
                <i className="fa fa-facebook"></i>
                <i className="fa fa-google"></i>
                <i className="fa fa-youtube-play"></i>
                <i className="fa fa-linkedin"></i>
              </div>
              <div className="p-2 bg-black text-white">
                <h5>{user.role}</h5>
              </div>
              <div className="p-3 border border-primary">
                <h5>About me</h5>
                <p>{user.bio}</p>
              </div>
              <div>
                <ul className="ps-0 pt-2" key={user.id}>
                  {user.skills.map((s) => (
                    <li className="badge bg-success p-3 me-2" key={s.id}>
                      {s.skill_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
