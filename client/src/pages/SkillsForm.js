import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function SkillsForm() {
  let [skills, setSkills] = useState([]);

  let options = skills.map((skill) => {
    return {
      label: skill.skill_name,
      value: skill.id,
    };
  });

  useEffect(() => {
    getSkills();
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

  return (
    <div className="container">
      <h2 className="title">Edit your skills</h2>
      <div>
        <Select
          isMulti
          name="skills"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}
