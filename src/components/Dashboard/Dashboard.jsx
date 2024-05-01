import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./Dashboard.css";
import { FaRupeeSign } from "react-icons/fa";
import Pig from "../../assets/Pig.png";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlinePendingActions } from "react-icons/md";
import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";

const Dashboard = () => {
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const [salesData, setSalesData] = useState(null);
  const [saleCount, setSaleCount] = useState(null);
  const [pigCount, setPigCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [boarCount, setBoarCount] = useState(null)
  const [sowCount, setSowCount] = useState(null)
  const [khassiCount, setKhassiCount] = useState(null)
  const [pigletCount, setPigletCount] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [saleresponse, pigresponse, orderresponse, employeeresponse, boardata, sowdata, khassidata, pigletdata] =
          await Promise.all([
            axios.get("http://localhost:3000/sale-count"),
            axios.get("http://localhost:3000/pig-count"),
            axios.get("http://localhost:3000/order-count"),
            axios.get("http://localhost:3000/employee-count"),
            axios.get("http://localhost:3000/boar-count"),
            axios.get("http://localhost:3000/sow-count"),
            axios.get("http://localhost:3000/khassi-count"),
            axios.get("http://localhost:3000/piglet-count"),


          ]);
        setSaleCount(saleresponse.data);
        setPigCount(pigresponse.data.totalCount);
        setOrderCount(orderresponse.data.orderCount);
        setEmployeeCount(employeeresponse.data.employeeCount);
        setBoarCount(boardata.data.count);
        setSowCount(sowdata.data.count);
        setKhassiCount(khassidata.data.count);
        setPigletCount(pigletdata.data.count);

        const barData = await axios.get("http://localhost:3000/add-bar-data")

        if(barData){
          const barresponse = await axios.get(
            "http://localhost:3000/sales-by-month"
          );
          setSalesData(barresponse.data);
        }

       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && salesData) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy existing chart instance
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      // Create new bar chart instance
      chartRef.current.chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: salesData.map((entry) => entry.month), // Use month names as labels
          datasets: [
            {
              label: "Total Sales",
              data: salesData.map((entry) => entry.totalSales), // Use total sales as data
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                font: {
                  size: 14,
                },
                callback: function (value) {
                  return value.toLocaleString("en-IN");
                },
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }

    if (pieChartRef.current) {
      const pieCtx = pieChartRef.current.getContext("2d");

      // Destroy existing pie chart instance
      if (pieChartRef.current.chartInstance) {
        pieChartRef.current.chartInstance.destroy();
      }

      // Create new pie chart instance
      pieChartRef.current.chartInstance = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: ["Boar", "Sow", "Khassi", "Piglets"], // Categories
          datasets: [
            {
              label: "Pig Distribution", // Label for the dataset
              data: [boarCount, sowCount, khassiCount, pigletCount], // Sample data values, replace with actual counts
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }
  }, [salesData, boarCount, khassiCount, pigletCount, sowCount]);

  return (
    <div className="dash-main">
      <div className="dash-top">
        <div className="box">
          <div className="dash-sales">
            <h4 style={{fontSize : "4vh", marginBottom: "2vh"}}>
              Total <br /> Sales
            </h4>
            <h3 style={{ fontWeight: "700" }}>
              <FaRupeeSign style={{fontSize: "4vh"}} />
              <span
                style={{ position: "relative", bottom: "5.5vh", left: "2vw", fontSize: "5vh" }}
              >
                {saleCount
                  ? saleCount.totalPayment.toLocaleString("en-IN")
                  : "Loading..."}
              </span>
            </h3>
          </div>
          <div className="dash-sales-logo">
            <FcSalesPerformance style={{ fontSize: "8vh" }} />
          </div>
        </div>
        <div className="box">
          <div className="dash-pig">
            <h4 style={{fontSize : "4vh"}}>Total Pigs</h4>
            <h3 style={{ fontWeight: "700", fontSize : "5vh" }}>
              {pigCount !== null ? pigCount : "Loading..."}
            </h3>
          </div>
          <div className="dash-pig-logo">
            <img src={Pig} alt="" style={{ height: "12vh" }} />
          </div>
        </div>
        <div className="box">
          <div className="dash-pig">
            <h4 style={{fontSize : "4vh"}}>Pending orders</h4>
            <h3 style={{ fontWeight: "700",fontSize : "5vh" }}>
              {orderCount ? orderCount : "Loading..."}
            </h3>
          </div>
          <div className="dash-orders-logo">
            <MdOutlinePendingActions
              style={{ fontSize: "8vh", color: "#f02e3e" }}
            />
          </div>
        </div>
        <div className="box">
          <div className="dash-employee">
            <h4 style={{fontSize : "4vh"}}>Total Employees</h4>
            <h3 style={{ fontWeight: "700",fontSize : "5vh" }}>
              {employeeCount ? employeeCount : "Loading..."}
            </h3>
          </div>
          <div className="dash-employee-logo">
            <BadgeIcon style={{ fontSize: "8vh", color: "blue" }} />
          </div>
        </div>
      </div>
      <div className="dash-bottom">
        <div className="bar">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="pie">
          <canvas ref={pieChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
