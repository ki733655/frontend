import "./Sidebar.css";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";


import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-main">
      <ul>
        <li style={{paddingBottom: "30px"}}>
          <h5>CompanyName</h5>
        </li>
        <Link to="/">
          <li>
            <SpaceDashboardIcon />
            <h5>Dashboard</h5>
          </li>
        </Link>
        <Link to="/livestock">
          <li>
            <InventoryIcon />
            <h5>Livestock</h5>
          </li>
        </Link>
        
        <Link to="/orders">
          <li>
            <SpaceDashboardIcon />
            <h5>Orders</h5>
          </li>
        </Link>
        <Link to="/sales">
          <li>
            <AttachMoneyIcon />
            <h5>Sales</h5>
          </li>
        </Link>
        <Link to="/employee">
          <li>
            <SpaceDashboardIcon />
            <h5>Employee</h5>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
