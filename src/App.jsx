import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useState } from "react"; // Import useEffect
import BoarDetail from "./components/Livestock/pigdetail/Boar/BoarDetail";
import SowDetail from "./components/Livestock/pigdetail/Sow/SowDetail";
import PigletDetail from "./components/Livestock/pigdetail/Piglet/PigletDetail";
import KhassiDetail from "./components/Livestock/pigdetail/Khassi/KhassiDetail";
import Login from "./components/Login/Login";
import Piglet from "./components/Livestock/pigForms/Piglets/Piglet";
import OrdersForm from "./components/Orders/OrdersForm/OrdersForm";

function App() {
  const [name, setName] = useState("Dashboard");
  return (
    <>
      <BrowserRouter>
        <div className="main">
                <Login />
                  <div className="sidebar">
                    <Sidebar value={setName} name={name} />
                  </div>
                  <div className="mainbar">
                    <Nav value={name} />
                    <Routes>
                    <Route path="/" element={<Dashboard />} />
                      <Route path="/Dashboard" element={<Dashboard />} />

                      <Route path="/livestock" element={<Livestock />} />
                      {/* Below is the button route */}
                      <Route path="/livestock/addboar" element={<Boar />} />
                      <Route path="/livestock/addsow" element={<Sow />} />
                      <Route
                        path="/livestock/addpiglets"
                        element={<Piglet/>}
                      />
                      <Route
                        path="/livestock/addkhassi"
                        element={<Khassi />}
                      />
                      {/* Below is the route of display pig details */}
                      <Route
                        path="/livestock/totalboar"
                        element={<BoarDetail />}
                      />
                      <Route
                        path="/livestock/totalsow"
                        element={<SowDetail />}
                      />
                      <Route
                        path="/livestock/totalpiglet"
                        element={<PigletDetail />}
                      />
                      <Route
                        path="/livestock/totalkhassi"
                        element={<KhassiDetail />}
                      />
                    {/* {Below is the all orders routes} */}
                      <Route path="/order" element={<Orders />} />
                      <Route path="/order/addorder" element={<OrdersForm />} />


                      <Route path="/sales" element={<Sales />} />

                      {/* {Below is the all employee routes} */}
                      <Route path="/employee" element={<Employee />} />
                      <Route
                        path="/employee/addemployee"
                        element={<EmployeeForm />}
                      />
                    </Routes>
                  </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
