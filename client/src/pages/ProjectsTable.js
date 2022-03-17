import React, {useState, useEffect} from "react";
import './ProjectsTable.css'


function ProjectsTable() {
  let [projects, setProjects] = useState([]);

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

  return (
    <div className="container">
        <h2>My Projects</h2>
        <div className="text-start mt-5 mb-5">
          {/* <button className="btn btn-primary" role="button"></button> */}
          <a href="/newprojectpage" class="btn btn-primary">+ Add Project</a>
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
                    <button type="button" className="btn btn-outline-success me-2">Edit</button>
                    <button type="button" className="btn btn-outline-danger">Delete</button>
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
