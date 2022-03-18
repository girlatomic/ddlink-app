import React, { useState, useEffect } from "react";
import "./NewProjectPage.css";

const INIT_STATE = {
  p_name: "",
  p_description: "",
  p_lookingfor: "",
  p_img: "",
};

export default function NewProjectPage(props) {
  const [formData, setFormData] = useState(INIT_STATE);
  useEffect(() => {
    showProjectData()
  }, []);

  async function showProjectData() {
    try {
      let projectDataResults = await fetch(`/projects/1`)
      if (projectDataResults.ok) {
        let data = await projectDataResults.json();
        console.log(data);
        setFormData(data)
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
    addNewProject(formData);
    setFormData(INIT_STATE);
  }

  async function addNewProject(project) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    };

    try {
      let response = await fetch("/projects", options);
      if (response.ok) {
        let projects = await response.json();
        setFormData(projects);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="container">
      <h2 className="title">Project form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project name</label>
          <input
            type="text"
            className="form-control"
            name="p_name"
            value={formData.p_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Project description</label>
          <input
            type="text"
            className="form-control"
            name="p_description"
            value={formData.p_description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Looking for</label>
          <textarea
            className="form-control mb-3"
            rows="3"
            name="p_lookingfor"
            value={formData.lookingfor}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Project image</label>
          <input
            type="text"
            className="form-control"
            name="p_img"
            value={formData.p_img}
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
