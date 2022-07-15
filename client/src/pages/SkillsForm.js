import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";

export default function SkillsForm() {
  //   const theme = useTheme();
  let { userId } = useParams();
  let [skills, setSkills] = useState([]);
  let [user, setUser] = useState([]);
  //   let [skillName, setSkillName] = useState([]);
  let [selected, setSelected] = useState([]);
  let [formData, setFormData] = useState("");
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
    // setFormData(INIT_STATE);
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
      <h2 className="title">Edit your skills</h2>
      <form
        className="col-sm-9 col-md-7 col-lg-5 mx-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <Select
            isMulti
            name="skills"
            options={options}
            value={selected}
            onChange={setSelected}
            // className="basic-multi-select"
            classNamePrefix="select"
            styles={{
              multiValueLabel: (base) => ({
                ...base,
                backgroundColor: "rgb(85, 1, 255)",
                color: "white",
                fontSize: "16px",
                fontFamily: "",
              }),
              option: (base) => ({
                ...base,
                border: "1px dotted",
                height: "100%",
              }),
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}
