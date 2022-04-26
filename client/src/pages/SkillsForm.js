import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";

const INIT_STATE = {
  userId: [],
  skillId: [],
};

export default function SkillsForm() {
  let { userId } = useParams();

  const [formData, setFormData] = useState(INIT_STATE);
  let [skills, setSkills] = useState([]);
  let [user, setUser] = useState([]);

  useEffect(() => {
    getSkills();
    showUserData();
  }, []);

  async function showUserData() {
    try {
      let user = await Api.getUser(userId);
      if (user.ok) {
        setUser(user.data.id);
      }
    } catch (e) {
      console.log("network error:", e.message);
    }
  }

  function onChange(id) {
    let skillId = INIT_STATE.skillId;
    let userId = INIT_STATE.userId;
    let find = skillId.indexOf(id);

    console.log("see", skillId);

    if (find > -1) {
      skillId.splice(find, 1);
      userId.pop(1);
    } else {
      skillId.push(id);
      userId.push(user);
    }
    setFormData({ skillId, userId });
    console.log("tutu", formData);
  }

  const getSkills = () => {
    fetch("/skills")
      .then((response) => response.json())
      .then((skills) => {
        setSkills(skills);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form", formData);
    addSkills(formData);
    setFormData(INIT_STATE);
  }

  async function addSkills(formData) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      let response = await fetch("/users", options);
      if (response.ok) {
        let formData = await response.json();
        setFormData(formData);
        console.log("tuhqjw", formData);
        // navigate(`/users/${props.user.id}`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-1 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <form onSubmit={handleSubmit}>
                <div>
                  {user.email}
                  <h3 className="card-title text-center mb-5 fs-3">
                    Please complete your profile
                  </h3>
                </div>
                <h2 className="text-center mb-4 fs-4">I'm a:</h2>
                <input
                  type="radio"
                  className="form-check-input"
                  value="Developer"
                  id="Developer"
                  name="s_role"
                  // onChange={handleChange}
                  style={{ marginLeft: "10px" }}
                />
                <label className="form-check-label ms-1">Developer</label>
                <input
                  type="radio"
                  className="form-check-input"
                  value="Designer"
                  name="s_role"
                  // onChange={handleChange}
                  style={{ marginLeft: "10px" }}
                />
                <label className="form-check-label ms-1">Designer</label>
                <h2 className="text-center mb-4 fs-4">My main skills are:</h2>
                <div className="form-group text-center mb-4 fs-5">
                  {skills.map((s) => (
                    <label key={s.id}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={s.id}
                        name="skillId"
                        checked={INIT_STATE.skillId.includes(s.id)}
                        onChange={() => onChange(s.id)}
                        style={{ marginLeft: "10px" }}
                      />
                      {s.skill_name}
                    </label>
                  ))}
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
