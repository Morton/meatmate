import React from "react";
import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useBluetooth } from "./BluetoothContext";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const TemperatureHistoryChart = () => {
  const { temperatureHistories } = useBluetooth();

  // Prepare data for the chart
  const chartData = {
    labels: temperatureHistories[0]?.map((entry, index) =>
      new Date(entry.timestamp).toLocaleTimeString()
    ) || [],
    datasets: [
      {
        label: "Probe 1 (°C)",
        data: temperatureHistories[0]?.map((entry) => entry.value) || [],
        borderColor: "#ffab40",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0
      },
      {
        label: "Probe 2 (°C)",
        data: temperatureHistories[1]?.map((entry) => entry.value) || [],
        borderColor: "#ff4040",
        borderWidth: 2,
        tension: 0,
        pointRadius: 0
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        title: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        marginTop: 2,
        height: 400,
        opacity: 0.4,
        marginRight: -4
      }}
    >
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default TemperatureHistoryChart;
