import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = () => {
  // Worldwide Sales (Line Chart)
  const worldwideSalesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Worldwide Sales",
        data: [1200, 1500, 1100, 1800, 2200, 2000],
        borderColor: "#d41515",
        backgroundColor: "rgba(216, 9, 9, 0.3)",
        tension: 0.5,
      },
    ],
  };

  // Sales & Revenue (Bar Chart)
  const salesRevenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [120, 200, 150, 220, 300, 250, 180],
        backgroundColor: "rgba(230, 234, 10, 0.6)",
      },
      {
        label: "Revenue",
        data: [300, 400, 350, 500, 650, 550, 420],
        backgroundColor: "rgba(236, 18, 65, 0.6)",
      },
    ],
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Worldwide Sales</h6>
              <a href="">Show All</a>
            </div>

            <Line data={worldwideSalesData} />
          </div>
        </div>

        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Sales & Revenue</h6>
              <a href="">Show All</a>
            </div>

            <Bar data={salesRevenueData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
