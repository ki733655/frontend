import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Livestock from "./components/Livestock/Livestock";
import Sales from "./components/Sales/Sales";
import Employee from "./components/Employee/Employee";
import EmployeeForm from "./components/Employee/EmployeeForm/EmployeeForm";
import Orders from "./components/Orders/Orders";
import Nav from "./components/Nav/Nav";
import Boar from "./components/Livestock/pigForms/Boar/Boar";
import Sow from "./components/Livestock/pigForms/Sow/Sow";
import Khassi from "./components/Livestock/pigForms/Khassi/Khassi";
import BoarDetail from "./components/Livestock/pigdetail/Boar/BoarDetail";
import SowDetail from "./components/Livestock/pigdetail/Sow/SowDetail";
import PigletDetail from "./components/Livestock/pigdetail/Piglet/PigletDetail";
import KhassiDetail from "./components/Livestock/pigdetail/Khassi/KhassiDetail";
import Login from "./components/Login/Login";
import Piglet from "./components/Livestock/pigForms/Piglets/Piglet";
import OrdersForm from "./components/Orders/OrdersForm/OrdersForm";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("Dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/*"
          element={
            authenticated ? (
              <div className="main">
                <div className="sidebar">
                  <Sidebar value={setName} />
                </div>
                <div className="mainbar">
                  <Nav handleLogout={handleLogout} />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/livestock" element={<Livestock />} />
                    <Route path="/livestock/addboar" element={<Boar />} />
                    <Route path="/livestock/addsow" element={<Sow />} />
                    <Route path="/livestock/addpiglets" element={<Piglet />} />
                    <Route path="/livestock/addkhassi" element={<Khassi />} />
                    <Route path="/livestock/totalboar" element={<BoarDetail />} />
                    <Route path="/livestock/totalsow" element={<SowDetail />} />
                    <Route path="/livestock/totalpiglet" element={<PigletDetail />} />
                    <Route path="/livestock/totalkhassi" element={<KhassiDetail />} />
                    <Route path="/order" element={<Orders />} />
                    <Route path="/order/addorder" element={<OrdersForm />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/employee/addemployee" element={<EmployeeForm />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
