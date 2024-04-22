import "./Dashboard.css";
import { LineChart } from "@mui/x-charts/LineChart";

const Dashboard = () => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  return (
    <>
      <div className="dash-main">
        <div className="dash-top">
          <div className="dash-pigs">
            <h5 style={{ color: "black", fontWeight: "700" }}>Total pigs</h5>
            <h5 style={{ color: "orange" }}>12,890</h5>
          </div>
          <div className="dash-orders">
            <h5 style={{ color: "black", fontWeight: "700" }}>Total orders</h5>
            <h5 style={{ color: "orange" }}>456</h5>
          </div>
          <div className="dash-sales">
            <h5 style={{ color: "black", fontWeight: "700" }}>Total sales</h5>
            <h5 style={{ color: "orange" }}>1325</h5>
          </div>
        </div>
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: "pigs" },
            // { data: uData, label: "uv" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </div>
    </>
  );
};

export default Dashboard;
