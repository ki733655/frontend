import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from '@mui/icons-material/Badge';
import "./Sidebar.css";
import AirportShuttle from "@mui/icons-material/AirportShuttle";

const Sidebar = (props) => {
  const [activeDiv, setActiveDiv] = useState(null);
  const dashboardRef = useRef(null); // Initialize useRef with null

  useEffect(() => {
    const storedActiveDivId = localStorage.getItem("activeDivId");
    if (storedActiveDivId) {
      const element = document.getElementById(storedActiveDivId);
      if (element) {
        setActiveDiv(element);
        element.style.backgroundColor = "#78ccf0";
      }
    }
  }, []); // Empty dependency array to run effect only once on mount

  const handleClick = (e, id) => {
    if (activeDiv) {
      activeDiv.style.backgroundColor = ""; // Clear previous active div's background
    }

    e.currentTarget.style.backgroundColor = "#78ccf0"; // Set clicked div's background
    setActiveDiv(e.currentTarget);
    localStorage.setItem("activeDivId", id); // Store active div id in localStorage
  };

  const setName = (name) => {
    props.value(name); // Assuming props.value is a function to set the name
  };

  return (
    <div className="sidebar-main">
      <div className="sidebar-2nd">
        <div className="companyName" style={{ paddingBottom: "5vh" }}>
          <h5 style={{ fontSize: "4vh" }}>Swargari Farms</h5>
        </div>
        <div
          ref={dashboardRef}
          onClick={(e) => handleClick(e, "Dashboard")}
          className="dashboardLink"
          id="Dashboard"
        >
          <Link to="/Dashboard"  onClick={() => setName("Dashboard")}>
            <SpaceDashboardIcon className="text-yellow-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Dashboard</h5>
          </Link>
        </div>
        
        <div onClick={(e) => handleClick(e, "Livestock")} className="livestockLink" id="Livestock">
          <Link to="/livestock" onClick={() => setName("Livestock")}>
            <InventoryIcon className="text-green-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Livestock</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle  style={{ fontSize: "3vh" }} />
              <div className="dropdown-content">
                <Link to="/livestock/addboar">Add boar</Link>
                <Link to="/livestock/addsow">Add sow</Link>
                <Link to="/livestock/addpiglets">Add piglet</Link>
                <Link to="/livestock/addkhassi">Add khassi</Link>
                <hr />
                <Link to="/livestock/totalboar">Boar details</Link>
                <Link to="/livestock/totalsow">Sow details</Link>
                <Link to="/livestock/totalpiglet">Piglets details</Link>
                <Link to="/livestock/totalkhassi">Khassi details</Link>
              </div>
            </div>
          </Link>
        </div>

        {/* Add other sidebar items similarly */}
        {/* Sample Orders Link */}
        <div onClick={(e) => handleClick(e, "Orders")} className="ordersLink" id="Orders">
          <Link to="/order" onClick={() => setName("Orders")}>
            <AirportShuttle className="text-blue-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Orders</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle style={{ fontSize: "3vh" }} />
              <div className="dropdown-content">
                <Link to="/order/addorder">Add Order</Link>
              </div>
            </div>
          </Link>
        </div>

        {/* Sample Sales Link */}
        <div onClick={(e) => handleClick(e, "Sales")} className="salesLink" id="Sales">
          <Link to="/sales" onClick={() => setName("Sales")}>
            <AttachMoneyIcon className="text-red-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Sales</h5>
          </Link>
        </div>

        {/* Sample Employee Link */}
        <div onClick={(e) => handleClick(e, "Employee")} className="employeeLink" id="Employee">
          <Link to="/employee" onClick={() => setName("Employee")}>
            <BadgeIcon className="text-violet-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Employee</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle style={{ fontSize: "3vh" }} />
              <div className="dropdown-content">
                <Link to="/employee/addemployee">Add Employee</Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
