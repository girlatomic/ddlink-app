import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import ProjectsTable from "./ProjectsTable";
 
 export default function SettingsPage(props) {
   return (
     <div>
       <UserInfo/>
       <ProjectsTable />
      </div>
   );
 }

