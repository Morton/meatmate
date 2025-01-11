import React, { useMemo, useState } from "react";
import { Box, Typography, Slider, LinearProgress } from "@mui/material";
import { useBluetooth } from "./BluetoothContext";
import useTimeToTarget from "../hooks/useTimeToTarget";

const TemperaturePanel = ({ probeNumber }) => {
  const { currentTemperatures, temperatureHistories } = useBluetooth();
  const [targetTemperature, setTargetTemperature] = useState(0);

  const temperature = currentTemperatures[probeNumber];
  const history = temperatureHistories[probeNumber];

  const timeToTarget = useTimeToTarget(history, targetTemperature);

  // Convert seconds to a readable time format
  const formatTime = (seconds) => {
    if (seconds <= 0) return "Reached or above target.";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hrs > 0 ? hrs + "h " : ""}${mins > 0 ? mins + "m " : ""}${secs}s`;
  };

  // Calculate the actual clock time when the target will be reached
  const targetClockTime = useMemo(() => {
    if (timeToTarget <= 0) return "Target already reached.";
    const targetTime = new Date(Date.now() + timeToTarget * 1000);
    return targetTime.toLocaleTimeString();
  }, [timeToTarget]);

  const handleSliderChange = (event, newValue) => {
    setTargetTemperature(newValue);
  };

  const progress = useMemo(() => {
    if (!temperature || targetTemperature <= 0) return 0;
    return Math.min((temperature / targetTemperature) * 100, 100);
  }, [temperature, targetTemperature]);

  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        padding: 2,
        borderRadius: 2,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.7)",
        marginTop: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 1, color: "#ffab40" }}>
        Probe {probeNumber + 1}
      </Typography>
      <Typography variant="body1" sx={{ color: "#ffffff" }}>
        <strong>Temperature:</strong> {temperature ? `${temperature.toFixed(2)} °C` : "Waiting for reading..."}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: 1 }}>
          Target Temperature: {targetTemperature} °C
        </Typography>
        <Slider
          value={targetTemperature}
          onChange={handleSliderChange}
          min={0}
          max={300} // Adjust the max value as per your use case
          step={1}
          valueLabelDisplay="auto"
          sx={{ color: "#ffab40" }}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, backgroundColor: "#555" }}
        />
        <Typography
          variant="body2"
          sx={{ color: "#ffffff", textAlign: "center", marginTop: 1 }}
        >
          Progress: {progress.toFixed(2)}%
        </Typography>
      </Box>
      {timeToTarget !== null && (
        <>
          <Typography variant="body2" sx={{ color: "#ffffff", marginTop: 1 }}>
            <strong>Time to Target:</strong> {formatTime(timeToTarget)}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ffffff", marginTop: 1 }}>
            <strong>Target Time:</strong> {targetClockTime}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default TemperaturePanel;
