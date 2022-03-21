import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import CardNav from "../components/CardNav";

export default function MainPage() {
  return (
    <div>
      <CardNav />
      <ProjectCard />
    </div>
  );
}
