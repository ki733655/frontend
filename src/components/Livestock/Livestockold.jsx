import  { useState } from "react";
import "./Livestock.css";
import Boar from "../Pigs/Boar";
import Sow from "../Pigs/Sow";
import Piglet from "../Pigs/Piglet";

const Livestock = () => {
  const [showBoar, setShowBoar] = useState(false);
  const [showSow, setShowSow] = useState(false);
  const [showPiglet, setShowPiglet] = useState(false);

  const handleBoar = () => {
    setShowBoar(!showBoar); // Toggle the state
  };

  const handleSow = () => {
    setShowSow(!showSow); // Toggle the state
  };

  const handlePiglet = () => {
    setShowPiglet(!showPiglet); // Toggle the state
  };

  return (
    <>
      <div className="live-main">
        <div className="top">
          <div className="male">
            <h4>Total male : </h4>
            <h4 className="number">126</h4>
          </div>
          <div className="female">
            <h4>Total female : </h4>
            <h4 className="number">128</h4>
          </div>
        </div>
        <div className="bottom">
          <div className="khasi">
            <h4>Total khasi : </h4>
            <h4 className="number">126</h4>
          </div>
          <div className="piglets">
            <h4>Total piglets : </h4>
            <h4 className="number">126</h4>
          </div>
        </div>
        <div className="pig-section">
          <div className="pig-buttons">
            <button onClick={handleBoar}>
              {showBoar ? "Hide Boar" : "Add Boar"}
            </button>
            <button onClick={handleSow}>
              {showSow ? "Hide Sow" : "Add Sow"}
            </button>
            <button onClick={handlePiglet}>
              {showPiglet ? "Hide Piglet" : "Add Piglet"}
            </button>
          </div>
          <div className="pig-forms">
            {showBoar && <Boar />}
            {showSow && <Sow />}
            {showPiglet && <Piglet />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Livestock;
