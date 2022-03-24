import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Api from "../helpers/Api";

const INIT_STATE = {
  given_name: "",
  family_name: "",
  bio: "",
  email: "",
  picture: "",
};

export default function EditUser() {
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
        // let data = await userDataResults.json();
        setFormData(userDataResults.data);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    editUser(formData);
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
        navigate("/settings");
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="container">
      <h2 className="title" style={{ color: "black" }}>
        Edit page
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Given name</label>
          <input
            type="text"
            className="form-control"
            name="given_name"
            value={formData.given_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Family name</label>
          <input
            type="text"
            className="form-control"
            name="family_name"
            value={formData.family_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Skills</label>
          </div>
          <div>
          <label>JavaScript</label>
          <input
            type="checkbox"
            // className="form-control"
            name="javascript"
            value={formData.skill_name}
            onChange={handleChange}
          />
          <label>Python</label>
          <input
            type="checkbox"
            // className="form-control"
            name="python"
            value={formData.skill_name}
            onChange={handleChange}
          />
          <label>Express</label>
          <input
            type="checkbox"
            // className="form-control"
            name="express"
            value={formData.skill_name}
            onChange={handleChange}
          />
          <label>Express</label>
          <input
            type="checkbox"
            // className="form-control"
            name="react"
            value={formData.skill_name}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Picture</label>
          <input
            type="text"
            className="form-control"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
