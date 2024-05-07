import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BadgeIcon from '@mui/icons-material/Badge';
import AirportShuttle from "@mui/icons-material/AirportShuttle";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [activeDiv, setActiveDiv] = useState(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const storedActiveDivId = localStorage.getItem("activeDivId");
    if (storedActiveDivId) {
      const element = document.getElementById(storedActiveDivId);
      if (element) {
        setActiveDiv(element);
        element.style.backgroundColor = "#78ccf0";
      }
    } else {
      const dashboardElement = dashboardRef.current;
      setActiveDiv(dashboardElement);
      dashboardElement.style.backgroundColor = "#78ccf0";
      localStorage.setItem("activeDivId", "Dashboard");
    }
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();

    if (activeDiv) {
      activeDiv.style.backgroundColor = "";
    }

    e.currentTarget.style.backgroundColor = "#78ccf0";
    setActiveDiv(e.currentTarget);
    localStorage.setItem("activeDivId", id);

    props.value(id);
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
          <NavLink to="/">
            <SpaceDashboardIcon className="text-yellow-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Dashboard</h5>
          </NavLink>
        </div>
        
        <div onClick={(e) => handleClick(e, "Livestock")} className="livestockLink" id="Livestock">
          <NavLink to="/livestock">
            <InventoryIcon className="text-green-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Livestock</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle  style={{ fontSize: "3vh" }} />
              <div className="dropdown-content">
                <NavLink to="/livestock/addboar">Add boar</NavLink>
                <NavLink to="/livestock/addsow">Add sow</NavLink>
                <NavLink to="/livestock/addpiglets">Add piglet</NavLink>
                <NavLink to="/livestock/addkhassi">Add khassi</NavLink>
                <hr />
                <NavLink to="/livestock/totalboar">Boar details</NavLink>
                <NavLink to="/livestock/totalsow">Sow details</NavLink>
                <NavLink to="/livestock/totalpiglet">Piglets details</NavLink>
                <NavLink to="/livestock/totalkhassi">Khassi details</NavLink>
              </div>
            </div>
          </NavLink>
        </div>

        {/* Add other sidebar items similarly */}
        <div onClick={(e) => handleClick(e, "Orders")} className="ordersLink" id="Orders">
          <NavLink to="/order">
            <AirportShuttle className="text-blue-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Orders</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle style={{ fontSize: "3vh" }} />
              <div className="dropdown-content">
                <NavLink to="/order/addorder">Add Order</NavLink>
              </div>
            </div>
          </NavLink>
        </div>

        <div onClick={(e) => handleClick(e, "Sales")} className="salesLink" id="Sales">
          <NavLink to="/sales">
            <AttachMoneyIcon className="text-red-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Sales</h5>
          </NavLink>
        </div>

        <div onClick={(e) => handleClick(e, "Employee")} className="employeeLink" id="Employee">
          <NavLink to="/employee">
            <BadgeIcon className="text-violet-500" style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Employee</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle style={{ fontSize: "3vh" }} />
              <div className="dropdown-content">
                <NavLink to="/employee/addemployee">Add Employee</NavLink>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;