import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import mainPage from "./mainPage";
import newProjectPage from "./newProjectPage";
import settingsPage from "./settingsPage";
import chatPage from "./chatPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/mainpage" element={<mainPage />} />
        <Route path="/newprojectpage" element={<newProjectPage />} />
        <Route path="/settingspage" element={<settingsPage />} />
        <Route path="/chatpage" element={<chatPage />} />
        </Routes>
    </div>
  );
}

export default App;
