import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import "./ProjectCard.css";

function ProjectCard() {
  const [projects, setProjects] = useState([
    {
      name: "Project 1",
      url: "https://images.unsplash.com/photo-1647357681882-4c87933e6c74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor justo quis ornare dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor justo quis ornare dictum",
    },
    {
      name: "Project 2",
      url: "https://images.unsplash.com/photo-1606473506347-49181771312f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor justo quis ornare dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor justo quis ornare dictum",
    },
    {
      name: "Project 3",
      url: "https://images.unsplash.com/photo-1616677001238-454f4c7d2ccd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor justo quis ornare dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor justo quis ornare dictum",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(projects.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(projects.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
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
      <div class="sub-container">
        <h1>DDLink</h1>
        <div className="cardContainer">
          {projects.map((project, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={project.name}
              onSwipe={(dir) => swiped(dir, project.name, index)}
              onCardLeftScreen={() => outOfFrame(project.name, index)}
              preventSwipe={["up", "down"]}
            >
              <div
                style={{ backgroundImage: "url(" + project.url + ")" }}
                className="cards"
              >
                <h3>{project.name}</h3>
                <div className="card-text">
                  <div className="card-body">{project.desc}</div>
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
