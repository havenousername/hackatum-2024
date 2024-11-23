import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

const TimeChart = ({ data, timeLabels }) => {
  // Sample time and energy consumption data
  const chartData = {
    labels: timeLabels, 
    datasets: [
      {
        label: "Energy Consumption",
        data, 
        borderColor: "#E16449", 
        backgroundColor: "rgba(255, 0, 0, 0.1)", 
        borderWidth: 6, 
        pointRadius: 0, 
        tension: 0.6, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
    },
    scales: {
      x: {
        type: "category", 
        ticks: {
          color: "rgba(255,255,255,0.7)", 
        },
        grid: {
          display: false, 
        },
      },
      y: {
        ticks: {
          color: "rgba(255,255,255,0.7)", 
        },
        grid: {
          color: false,
        },
      },
    },
  };

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default TimeChart;