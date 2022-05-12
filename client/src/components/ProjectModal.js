import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectsTable from "../pages/ProjectsTable";

export default function ProjectModal(props) {
  return (
    <div className="container-fluid">
      <div className="FeaturedProject" id={props.project.id}>
        <div
          className="modal mt-5 pt-5"
          tabIndex="-1"
          style={{ display: "block" }}
        >
          <div className="modal-dialog mt-5 pt-5 ">
            <div className="modal-content mt-5 border border-primary border-1 bg-dark text-light">
              <div className="modal-header border border-primary">
                <h5 className="modal-title fs-4">{props.project.p_name}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={props.hide}
                ></button>
              </div>
              <div className="modal-body">
                <div className="container-fluid text-center text-wrap">
                  <img
                    className="float-start me-2"
                    style={{ width: "200px" }}
                    src={props.project.p_img}
                    alt=""
                  />
                  <h5>{props.project.p_description}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="FeaturedProject">
    //     <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //     Launch demo modal
    //     </button>
    //     <div className="modal fade" id="exampleModal" tabindex="-1" style={{ display: 'block' }}>
    //     <div className="modal-dialog">
    //     <div className="modal-content">
    //     <div className="modal-header">
    //     <h5 className="modal-title">Example</h5>
    //     {/* <button type="button" className="btn-close" onClick={props.hide}></button> */}
    //     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    // </div>

    // <div className="modal-body">
    //   <div className="container-fluid text-center text-wrap">
    //       <img className="float-start me-2" style={{ width: '200px' }} src="https://icatcare.org/app/uploads/2019/09/The-Kitten-Checklist-1.png" alt="" />
    //       <h5>Testing</h5>
    //   </div>
    //   </div>
    // </div>
    // </div>
    // </div>

    // </div>
  );
}
