import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import NewProjectPage from "./pages/NewProjectPage";
import SettingsPage from "./pages/SettingsPage";
import NewEditUserForm from "./pages/NewEditUserForm";
import Login from "./pages/Login";
import ProjectsTable from "./pages/ProjectsTable";
import EditProjectPage from "./pages/EditProjectPage";
import Navbar from "./components/NavBar";
import ProjectCard from "./pages/ProjectCard";
import CardNav from "./components/CardNav";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/cardnav" element={<CardNav />} />
        <Route path="/projectcard" element={<ProjectCard />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/newprojectpage" element={<NewProjectPage />} />
        <Route path="/settingspage" element={<SettingsPage />} />
        <Route path="/newedituserform" element={<NewEditUserForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projectstable" element={<ProjectsTable />} />
        <Route path="/editprojectpage/:id" element={<EditProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
