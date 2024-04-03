// import React from 'react'
import { useState } from "react";
import "./Nav.css";
import { FaUser } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = (props) => {
  const { logout } = useAuth0();

  return (
    <>
      <div className="nav-container">
        <div className="nav-text">
          <h3>{props.value}</h3>
        </div>
        <div
          className="nav-user"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <li>
            <h5>Logout</h5>
            <AiOutlineLogin className="logout-icon" />
          </li>
        </div>
      </div>
    </>
  );
};

export default Nav;
