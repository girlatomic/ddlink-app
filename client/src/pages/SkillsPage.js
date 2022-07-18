import React from "react";
import { useParams, Link } from "react-router-dom";

export default function SkillsForm() {
  let { userId } = useParams();
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center border-bottom mt-5">
        {/* <h2>My Skills</h2>
        <Link to={`/skillsform/${userId}`} className="btn btn-primary">
          Edit Skills
        </Link> */}
      </div>
    </div>
  );
}
