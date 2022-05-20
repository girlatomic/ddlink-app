import "./App.css";
import Local from "./helpers/Local";
import Api from "./helpers/Api";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import EditUser from "./pages/EditUser";
import ProjectModal from "./components/ProjectModal";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [userS, setUserS] = useState(null);
  let { userId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const handleGoogleLogin = async (googleData) => {
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("this is the response data", data);
    Local.saveUserInfo(data.token, data.user);
    setUser(data.user);
    navigate(`/`);
  };

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    let response = await Api.getUser(userId);
    console.log("this is the reesss2", response);
    if (response.ok) {
      const data = response.data;
      console.log("this data2", data);
      Local.saveUserSkills(data);
      setUserS(data);
      setErrorMsg("");
    } else {
      setUser(null);
      setErrorMsg(response.error);
    }
  }

  return (
    <div>
      <Navbar user={user} logoutCb={doLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainpage/:userId" element={<MainPage user={user} />} />
        <Route path="/projectcard" element={<ProjectCard user={user} />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route
          path="/newprojectpage"
          element={<NewProjectPage user={user} />}
        />
        <Route path="/newedituserform" element={<NewEditUserForm />} />
        <Route path="/edituser/:userId" element={<EditUser />} />
        <Route path="/projectmodal" element={<ProjectModal />} />
        <Route
          path="/login"
          element={<Login googleLogin={handleGoogleLogin} />}
        />
        <Route path="/projectstable" element={<ProjectsTable user={user} />} />
        <Route
          path="/editprojectpage/:id"
          element={<EditProjectPage user={user} />}
        />
        <Route
          path="/users/:userId"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
