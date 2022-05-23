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

  //   const handleChange = (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setSkillName(typeof value === "string" ? value.split(",") : value);
  //   };

  //   const handleDelete = (chipToDelete) => () => {
  //     setSkillName((chips) => chips.filter((chip) => chip.key !== chipToDelete));
  //   };

  return (
    <div className="container">
      <h2 className="title">Edit your skills</h2>
      <div>
        <Select
          isMulti
          name="skills"
          options={options}
          value={selected}
          onChange={setSelected}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}
