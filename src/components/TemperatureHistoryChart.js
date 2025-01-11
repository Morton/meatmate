import React from "react";
import { Box, Typography } from "@mui/material";
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
        label: "Probe 1 Temperature (°C)",
        data: temperatureHistories[0]?.map((entry) => entry.value) || [],
        borderColor: "#ffab40",
        backgroundColor: "rgba(255, 171, 64, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Probe 2 Temperature (°C)",
        data: temperatureHistories[1]?.map((entry) => entry.value) || [],
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        padding: 2,
        borderRadius: 2,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.7)",
        marginTop: 2,
        height: 400,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2, color: "#ffab40" }}>
        Temperature History
      </Typography>
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default TemperatureHistoryChart;
