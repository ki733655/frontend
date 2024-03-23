import "./Sidebar.css";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const setName = props.value;
  return (
    <div className="sidebar-main">
      <ul>
        <li style={{ paddingBottom: "30px" }}>
          <h5>CompanyName</h5>
        </li>
        <Link to="/" onClick={() => {props.name}}>
          <li>
            <SpaceDashboardIcon />
            <h5>Dashboard</h5>
          </li>
        </Link>
        <Link to="/livestock" onClick={() => setName("Livestock")}>
          <li>
            <InventoryIcon />
            <h5>Livestock</h5>
          </li>
        </Link>

        <Link to="/orders" onClick={() => setName("Orders")}>
          <li>
            <SpaceDashboardIcon />
            <h5>Orders</h5>
          </li>
        </Link>
        <Link to="/sales" onClick={() => setName("Sales")}>
          <li>
            <AttachMoneyIcon />
            <h5>Sales</h5>
          </li>
        </Link>
        <Link to="/employee" onClick={() => setName("Employee")}>
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
