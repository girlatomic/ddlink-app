import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ChatPage from './pages/ChatPage';
import NewProjectPage from './pages/NewProjectPage';
import SettingsPage from './pages/SettingsPage';
import NewEditUserForm from './pages/NewEditUserForm';
import Login from './pages/Login';
import ProjectsTable from './pages/ProjectsTable';
import Navbar from "./components/NavBar";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
         <Route path="/mainpage" element={<MainPage />} />
         <Route path="/chatpage" element={<ChatPage />} />
         <Route path="/newprojectpage" element={<NewProjectPage />} />
         <Route path="/settingspage" element={<SettingsPage />} />
         <Route path="/newedituserform" element={<NewEditUserForm />} />
         <Route path="/login" element={<Login />} />
         <Route path="/projectstable" element={<ProjectsTable />} />
      </Routes>
    </div>
  );
}

export default App;
