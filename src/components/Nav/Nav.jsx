import "./Nav.css";
import { AiOutlineLogin } from "react-icons/ai";

const Nav = () => {
  const data = localStorage.getItem("activeDivId");
  return (
    <>
      <div className="nav-container">
        <div className="nav-text">
          <h3>{data}</h3>
        </div>
        <div className="nav-user">
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
