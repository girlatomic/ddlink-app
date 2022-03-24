import React, { useState, useMemo, useRef, useEffect } from "react";
import Local from '../helpers/Local';
import TinderCard from "react-tinder-card";
import "./ProjectCard.css";
import Noty from "noty";

import "noty/lib/themes/sunset.css";
import "noty/lib/noty.css";
import ProjectModal from "../components/ProjectModal";

function ProjectCard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showProject, setShowProject] = useState(false);
  const [project, setProject] = useState({});
  // console.log("I AM THE PROJECTS", projects);

  const [currentIndex, setCurrentIndex] = useState(); //projects.length - 1
  const [lastDirection, setLastDirection] = useState();

  const getProjects = () => {
    //get user from local storage
    let user = Local.getUserSkills();
    setUser(user);
    console.log('thisis user from local', user);
    //make a comma separated list of skill ids
    let skillId = user.skills.map(s => (s.id))
    let skillIdList = skillId.join(",")
    console.log('this skillId', skillIdList)
    // fetch(`/projects?skills={5,6,8}`)
    fetch(`/projects?skills=${skillIdList}`)
      .then((response) => response.json())
      .then((projects) => {
        setProjects(projects);
        setCurrentIndex(projects.length - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(projects.length)
        .fill(0)
        .map((i) => React.createRef()),
    [projects] // remembers the last index memo!
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < projects.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    console.log("1", direction);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      console.log("Hello");
      likedNotification();
    }
  };

  const outOfFrame = (name, idx) => {
    // console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < projects.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const likedNotification = () => {
    new Noty({
      text: "You liked a project!",
      type: "success",
      layout: "centerRight",
      theme: "sunset",
      timeout: 2000,
    }).show();
  };
  const handleProject = (project) => {
    console.log(project);
    setShowProject(true);
    setProject(project);
  };

  return (
    <div id="root-container">
      <div className="sub-container">
        <h1>DDLink</h1>
        <div className="cardContainer">
          {projects.map((project, index) => (
            <div key={project.id}>
              <TinderCard
                key={project.id}
                ref={childRefs[index]}
                className="swipe"
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, project.p_name, index)}
                onCardLeftScreen={() => outOfFrame(project.p_name, index)}
              >
                <div
                  style={{ backgroundImage: "url(" + project.p_img + ")" }}
                  className="cards"
                  onClick={() => handleProject(project)}
                >
                  <h3>{project.p_name}</h3>
                </div>
              </TinderCard>
            </div>
          ))}
          {showProject && (
            <ProjectModal
              project={project}
              hide={() => setShowProject(false)}
            />
          )}
        </div>
        <div id="btn-cont">
          <div className="button-group">
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              Swipe left!
            </button>
            <button
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo swipe!
            </button>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
            >
              Swipe right!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
