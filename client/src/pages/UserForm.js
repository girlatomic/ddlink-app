import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../helpers/Api";

const INIT_STATE = {
  given_name: "",
  family_name: "",
  bio: "Powerful intro",
  email: "",
  picture: "",
  u_role: "",
};

export default function UserForm() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState(INIT_STATE);

  // console.log("I AM FD", formData);
  let { userId } = useParams();
  useEffect(() => {
    showUserData();
  }, []);

  async function showUserData() {
    try {
      let userDataResults = await Api.getUser(userId);

      console.log("BBBB", userDataResults);
      if (userDataResults.ok) {
        setFormData(userDataResults.data);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }

  function handleChange(event) {
    let { name, value } = event.target;
    console.log("VAL", value, name);
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    editUser(formData);
    console.log("usData", formData);
    setFormData(INIT_STATE);
  }

  async function editUser(formData) {
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      let response = await fetch(`/users/${userId}`, options);
      if (response.ok) {
        let users = await response.json();
        setFormData(users);
        navigate(`/skillsform/${userId}`, { replace: true });
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="card-container">
      <div className="row align-items-center w-50">
        <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
          <div className="card border-primary border-1 bg-dark text-light shadow rounded-3 pt-5">
            <div className="card-body p-4 p-sm-5">
              <h4 className="card-title text-center mb-5">
                Select your Tech Stack
              </h4>
              <div className="mb-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="form-group">
                      <label>Role :</label>
                      <br></br>
                      <input
                        type="radio"
                        className="form-check-input"
                        value="Developer"
                        id="Developer"
                        name="u_role"
                        checked={formData.u_role === "Developer"}
                        onChange={handleChange}
                      />
                      <label className="ms-1">Developer</label>
                      <input
                        type="radio"
                        className="form-check-input"
                        value="Designer"
                        id="Designer"
                        name="u_role"
                        checked={formData.u_role === "Designer"}
                        onChange={handleChange}
                        style={{ marginLeft: "10px" }}
                      />
                      <label className="ms-1">Designer</label>
                    </div>
                    {/* <div className="form-group">
                      <label>Role</label>
                      <textarea
                        className="form-control mb-3"
                        rows="3"
                        name="u_role"
                        value={formData.u_role}
                        onChange={handleChange}
                      ></textarea>
                    </div> */}
                    <div className="form-group">
                      <label>Bio</label>
                      <textarea
                        className="form-control mb-3"
                        rows="3"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary ps-4 pe-4 mt-3"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
