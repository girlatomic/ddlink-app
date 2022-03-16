import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
 
 export default function SettingsPage(props) {
   return (
     <div>
       <UserInfo/>
      </div>
   );
 }
 

// Settings page needs to have a form for personal information, file upload for avatar/profile pic and additional component for projects
