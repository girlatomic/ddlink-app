import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './ProjectsTable.css'


function ProjectsTable() {
  let navigate = useNavigate();
  let [projects, setProjects] = useState([]);
  let {id} = useParams();

    const getProjects = () => {
    fetch("/projects")
      .then(response => response.json())
      .then(projects => {
        setProjects(projects);
      })
      .catch(error => {
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
        navigate("/settingspage");
      }

      async function deleteProject(project) {
        let options = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        };
    
        try {
          let id = project;
          // console.log(id);
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
        <h2>My Projects</h2>
        <div className="text-start mt-5 mb-5">
          <a href="/newprojectpage" className="btn btn-primary">+ Add Project</a>
        </div>
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>Project Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {projects.map(p => (
                <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.p_name}</td>
                    <td>{p.p_description}</td>
                    <td><img src={p.p_img}/></td>
                    <td>
                    <Link to={`/editprojectpage/${p.id}`} class="btn btn-primary">Edit</Link>
                    <button type="button" className="btn btn-outline-danger" value={p.id} onClick={handleClick}>Delete</button>
                  </td>
                </tr>
                ))
            }
            </tbody>
       </table>
    </div>
  )
}

export default ProjectsTable;
