import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard";
import Livestock from "./components/Livestock/Livestock";
import Sales from "./components/Sales";
import Employee from "./components/Employee";
import Orders from "./components/Orders";
import Nav from "./components/Nav/Nav";
import Boar from "./components/Livestock/pigForms/Boar";
import Sow from "./components/Livestock/pigForms/Sow";
import Piglets from "./components/Livestock/pigForms/Piglets";
import Khassi from "./components/Livestock/pigForms/Khassi";
import { useState } from "react";

function App() {
  const [name, setName] = useState("Dashboard")
  return (
    <>
      <BrowserRouter>
        <div className="main">
          <div className="sidebar">
            <Sidebar value= {setName} name = {name} />
          </div>
          <div className="mainbar">
            <Nav value= {name} />
            <Routes>
              <Route path="/" element={<Dashboard  />} />
              <Route path="/livestock" element={<Livestock />} />
              <Route path="/livestock/addboar" element={<Boar />} />
              <Route path="/livestock/addsow" element={<Sow />} />
              <Route path="/livestock/addpiglets" element={<Piglets />} />
              <Route path="/livestock/addkhassi" element={<Khassi />} />

              <Route path="/sales" element={<Sales />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/employee" element={<Employee />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
