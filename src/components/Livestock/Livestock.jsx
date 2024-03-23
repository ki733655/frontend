import React from 'react';
import './Livestock.css';
import arrow from '../../assets/arrow.png';
import Pig from '../../assets/Pig.png';
import { Link } from 'react-router-dom';

const Livestock = () => {
  return (
    <div className="live-main">
      <div className="live-top">
        <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" height={130} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" height="40" />
            </div>
          </div>
          <div className="content">
            <h3>Total Boar</h3>
            <div className="live-number">12</div>
           <Link to="/livestock/addboar"><button>Add Boar</button></Link> 
          </div>
        </div>
        <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" height={130} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" height="40" />
            </div>
          </div>
          <div className="content">
            <h3>Total Sow</h3>
            <div className="live-number">12</div>
            <Link to="/livestock/addsow"><button>Add Sow</button></Link> 

          </div>
        </div>
      </div>
      <div className="live-bottom">
      <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" height={130} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" height="40" />
            </div>
          </div>
          <div className="content">
            <h3>Total Piglets</h3>
            <div className="live-number">12</div>
           <Link to="/livestock/addpiglets"><button>Add Piglets</button></Link> 
            
          </div>
        </div>
        <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" height={130} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" height="40" />
            </div>
          </div>
          <div className="content">
            <h3>Total Khassi</h3>
            <div className="live-number">12</div>
           <Link to="/livestock/addkhassi"><button>Add Khassi</button></Link> 
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Livestock;
