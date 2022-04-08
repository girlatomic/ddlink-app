import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import CardNav from "../components/CardNav";
import Api from '../helpers/Api';
import Local from '../helpers/Local';

export default function MainPage(props) {
  const [user, setUser] = useState(null);
  let { userId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let response = await Api.getUser(userId);
    console.log('this is the reesss2', response)
    if (response.ok) {
          const data = response.data;
          console.log('this data2', data);
          Local.saveUserSkills(data)
          setUser(data);
          setErrorMsg('');
    } else {
          setUser(null);
          setErrorMsg(response.error);
    }
  }

  return (
    <div className="mainpage">
      <CardNav user={props.user} />
      <ProjectCard user={props.user}  />
    </div>
  );
}
