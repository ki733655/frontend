// import React from 'react'
import { useState } from "react";
import "./Nav.css";
import { FaUser } from "react-icons/fa";

const Nav = (props) => {
  
  return (
    <>
      <div className="nav-container">
        <div className="nav-text">
          <h3>{props.value}</h3>
        </div>
        <div className="nav-user">
          <li>
            <FaUser/>
            <h6>Admin</h6>
          </li>
        </div>
      </div>
    </>
  );
};

export default Nav;
