import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../helpers/Api";

export default function SkillsForm(props) {
  let navigate = useNavigate();
  let { userId } = useParams();
  let [skills, setSkills] = useState([]);
  let [user, setUser] = useState([]);

  let [selected, setSelected] = useState([]);
  let [formData, setFormData] = useState("");

  const selectStyle = {
    multiValueLabel: (base) => ({
      ...base,
      backgroundColor: "rgb(85, 1, 255)",
      color: "white",
      fontSize: "16px",
      fontFamily: "Raleway",
    }),
    option: (base) => ({
      ...base,
      height: "100%",
      color: "black",
    }),
    multiValue: (base) => ({
      ...base,
      border: "solid rgb(0, 255, 251) 1px",
      borderRadius: "5px",
      backgroundColor: "darkgray",
    }),
  };

  console.log("this selected", selected);

  let options = skills.map((skill) => {
    return {
      label: skill.skill_name,
      value: skill.id,
    };
  });

  const userSkills = selected.map((item) => {
    let container = {};

    container.userId = user;
    container.skillId = item.value;

    return container;
  });

  console.log("todo el objeto", userSkills);

  useEffect(() => {
    getSkills();
    showUserData();
  }, []);

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form", userSkills);
    addSkills(userSkills);
  }

  async function addSkills(userSkills) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSkills),
    };

    try {
      let response = await fetch("/users", options);
      if (response.ok) {
        let formData = await response.json();
        setFormData(formData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
    navigate(`/users/${props.user.id}`);
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
                    <Select
                      isMulti
                      name="skills"
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      classNamePrefix="select"
                      styles={selectStyle}
                    />
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
