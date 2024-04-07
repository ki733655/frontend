// Import necessary modules
import "./Sidebar.css";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Sidebar = (props) => {
  const [activeDiv, setActiveDiv] = useState(null);
  const dashboard = useRef();

  useEffect(() => {
    // Call initial function when component mounts
    initial();
  }, []);

  const handleClick = (e) => {
    // Remove background color from previously active div
    if (activeDiv) {
      activeDiv.style.backgroundColor = "";
    }

    // Set background color to blue for the clicked div
    e.currentTarget.style.backgroundColor = "#78ccf0";

    // Set the clicked div as active
    setActiveDiv(e.currentTarget);
  };

  const initial = () => {
    const data = dashboard.current;
    data.style.backgroundColor = "#78ccf0";
    setActiveDiv(data);
  };

  const setName = props.value;

  return (
    <div className="sidebar-main">
      <div className="sidebar-2nd">
        <div className="companyName" style={{ paddingBottom: "5vh" }}>
          <h5 style={{fontSize: "4vh"}}>CompanyName</h5>
        </div>
        <div ref={dashboard} onClick={handleClick} className="dashboardLink">
          <Link key="dashboardLink" to="/" onClick={() => setName("Dashboard")}>
            <SpaceDashboardIcon style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Dashboard</h5> 
           
          </Link>
        </div>
        <div onClick={handleClick} className="livestockLink">
          <Link
            key="livestockLink"
            to="/livestock"
            onClick={() => setName("Livestock")}
          >
            <InventoryIcon style={{ marginBottom: "1vh" , fontSize: "4vh"}} />
            <h5>Livestock</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle style={{fontSize: "3vh"}} />
              <div className="dropdown-content">
                
                <Link to= "/livestock/addboar">Add boar</Link>
                <Link to= "/livestock/addsow">Add sow</Link>
                <Link to= "/livestock/addpiglets">Add piglet</Link>
                <Link to= "/livestock/addkhassi">Add khassi</Link>
                <hr />
                <Link to= "/livestock/totalboar">Boar details</Link>
                <Link to= "/livestock/totalsow">Sow details</Link>
                <Link to= "/livestock/totalpiglet">Piglets details</Link>
                <Link to= "/livestock/totalkhassi">Khassi details</Link>

              </div>
            </div>
          </Link>
        </div>
        <div onClick={handleClick} className="ordersLink">
          <Link key="ordersLink" to="/order" onClick={() => setName("Orders")}>
            <SpaceDashboardIcon style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Orders</h5>
            <div className="dropdown">
              <IoIosArrowDropdownCircle style={{fontSize: "3vh"}} />
              <div className="dropdown-content">
                
                <Link to= "/order/addorder">Add Order</Link>

              </div>
            </div>
          </Link>
        </div>
        <div onClick={handleClick}>
          <Link key="salesLink" to="/sales" onClick={() => setName("Sales")}>
            <AttachMoneyIcon style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Sales</h5>
          </Link>
        </div>
        <div onClick={handleClick} className="employeeLink">
          <Link
            key="employeeLink"
            to="/employee"
            onClick={() => setName("Employee")}
          >
            <SpaceDashboardIcon style={{ marginBottom: "1vh", fontSize: "4vh" }} />
            <h5>Employee</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
