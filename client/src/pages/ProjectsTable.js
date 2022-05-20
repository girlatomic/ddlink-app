import React, { useState, useEffect } from "react";
import "./ProjectsTable.css";
import Local from "../helpers/Local";
import { Link, useNavigate } from "react-router-dom";

function ProjectsTable(props) {
  let navigate = useNavigate();
  let [projects, setProjects] = useState([]);

  const getProjects = () => {
    fetch("/projects")
      .then((response) => response.json())
      .then((projects) => {
        setProjects(projects);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  function handleClick(event) {
    console.log(event.target.value);
    event.preventDefault();
    deleteProject(event.target.value);
    navigate(`/users/${props.user.id}`);
  }

  async function deleteProject(project) {
    let options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    try {
      let id = project;
      let response = await fetch(`/projects/${id}`, options);
      if (response.ok) {
        let projects = await response.json();
        getProjects(projects);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center border-bottom  mt-5 mb-5">
        <h2>My Projects</h2>
        <Link to={`/newprojectpage`} className="btn btn-primary">
          + Add a project
        </Link>
      </div>
      <div className="table-responsive-lg">
        <table className="table-responsive">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.p_name}</td>
                <td className="ps-0 pt-2">{p.p_description}</td>
                <td>
                  <img src={p.p_img} />
                </td>
                <td className="colspan-2">
                  <Link
                    to={`/editprojectpage/${p.id}`}
                    class="btn btn-outline-primary"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger mt-2"
                    value={p.id}
                    onClick={handleClick}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTable;
