import React, { useState, useMemo, useRef, useEffect } from "react";
import Local from '../helpers/Local';
import TinderCard from "react-tinder-card";
import "./ProjectCard.css";
import Api from '../helpers/Api';
import { useParams } from "react-router-dom";

function ProjectCard() {
  const [projects, setProjects] = useState([]);
  // console.log("I AM THE PROJECTS", projects);

  const [currentIndex, setCurrentIndex] = useState(); //projects.length - 1
  const [lastDirection, setLastDirection] = useState();

  const getProjects = () => {
    //get user from local storage
    let user = Local.getUserSkills();
    console.log('thisis user from local', user);
    //make a comma separated list of skill ids
    let skillId = user.skills.map(s => (s.id))
    console.log('this skillId', skillId)
    // fetch(`/projects?skills={5,6,8}`)
    fetch("/projects")
      .then((response) => response.json())
      .then((projects) => {
        setProjects(projects);
        setCurrentIndex(projects.length - 1); //!!!!!!
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
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
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

  return (
    <div id="root-container">
      <div className="sub-container">
        <h1>DDLink</h1>
        <div className="cardContainer">
          {projects.map((project, index) => (
            <TinderCard
              key={project.id}
              ref={childRefs[index]}
              className="swipe"
              onSwipe={(dir) => swiped(dir, project.p_name, index)}
              onCardLeftScreen={() => outOfFrame(project.p_name, index)}
              preventSwipe={["up", "down"]}
            >
              <div
                style={{ backgroundImage: "url(" + project.p_img + ")" }}
                className="cards"
              >
                <h3>{project.p_name}</h3>
                <div className="sub-card-container">
                  <div className="sub-card-text">{project.p_description}</div>
                </div>
              </div>
            </TinderCard>
          ))}
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
              style={{ backgroundColor: !canGoBack && "grey" }}
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
