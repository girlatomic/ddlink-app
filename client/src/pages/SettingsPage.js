import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import ProjectsTable from "./ProjectsTable";
import SkillsPage from "./SkillsPage";

export default function SettingsPage(props) {
  return (
    <div>
      <UserInfo />
      <SkillsPage />
      <ProjectsTable />
    </div>
  );
}
