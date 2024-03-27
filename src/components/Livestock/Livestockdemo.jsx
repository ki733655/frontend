import React, { useEffect, useState } from 'react';
import './Livestock.css';
import arrow from '../../assets/arrow.png';
import Pig from '../../assets/Pig.png';
import { Link } from 'react-router-dom';
import axios from "axios"

const Livestockdemo = () => {
  const [boarCount, setBoarCount] = useState(null);
  const [sowCount, setSowCount] = useState(null);
  const [pigletsCount, setPigletsCount] = useState(null);
  const [khassiCount, setKhassiCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boar_response = await axios.get("http://localhost:3000/boar-count");
        const sow_response = await axios.get("http://localhost:3000/sow-count");
        const piglets_response = await axios.get("http://localhost:3000/piglets-count");
        const khassi_response = await axios.get("http://localhost:3000/khassi-count");

        // updating the values of the pig counts
        setBoarCount(boar_response.data.count);
        setSowCount(sow_response.data.count);
        setPigletsCount(piglets_response.data.count);
        setKhassiCount(khassi_response.data.count);

        console.log(boar_response.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div className="live-main">
      <div className="live-top">
        <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" style={{height: "22vh"}} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" style={{height: "7vh"}} />
            </div>
          </div>
          <div className="content">
            <Link to= "/livestock/totalboar">
            <h3 style={{fontSize: "2vw"}}>Total Boar</h3></Link>
            <Link to= "/livestock/totalboar">
            <div className="live-number">{boarCount}</div>
            </Link>
           <Link to="/livestock/addboar"><button>Add Boar</button></Link> 
          </div>
        </div>
        <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" style={{height: "22vh"}} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" style={{height: "7vh"}} />
            </div>
          </div>
          <div className="content">
            <h3 style={{fontSize: "2vw"}}>Total Sow</h3>
            <div className="live-number">{sowCount}</div>
           <Link to="/livestock/addboar"><button>Add Sow</button></Link> 
          </div>
        </div>
      </div>
      <div className="live-bottom">
      <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" style={{height: "22vh"}} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" style={{height: "7vh"}} />
            </div>
          </div>
          <div className="content">
            <h3 style={{fontSize: "2vw"}}>Total Piglets</h3>
            <div className="live-number">{pigletsCount}</div>
           <Link to="/livestock/addboar"><button>Add Piglets</button></Link> 
          </div>
        </div>
        <div className="pig-box">
          <div className="logos">
            <div className="pig-logo">
              <img src={Pig} alt="" style={{height: "22vh"}} />
            </div>
            <div className="arrow">
              <img src={arrow} alt="" style={{height: "7vh"}} />
            </div>
          </div>
          <div className="content">
            <h3 style={{fontSize: "2vw"}}>Total Khassi</h3>
            <div className="live-number">{khassiCount}</div>
           <Link to="/livestock/addboar"><button>Add Khassi</button></Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Livestockdemo;
