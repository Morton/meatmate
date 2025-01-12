import React, { useState } from "react";
import { Box, Typography, Slider } from "@mui/material";
import { useBluetooth } from "./BluetoothContext";
import TimeToTarget from "./TimeToTarget";

const TemperaturePanel = ({ probeNumber }) => {
  const { currentTemperatures, temperatureHistories } = useBluetooth();
  const [targetTemperature, setTargetTemperature] = useState(50);

  const temperature = currentTemperatures[probeNumber];
  const history = temperatureHistories[probeNumber];

  const handleSliderChange = (event, newValue) => {
    setTargetTemperature(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        padding: 2,
        borderRadius: 2,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.7)",
        margin: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        gap: 6,
      }}
    >
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 1, color: "#ffab40" }}>
        {temperature ? `${temperature.toFixed(1)} °C` : "Waiting for reading..."}
        </Typography>
        <Slider
          orientation="vertical"
          value={targetTemperature}
          onChange={handleSliderChange}
          min={50}
          max={250}
          step={1}
          valueLabelDisplay="auto"
          sx={{
            height: 150,
            color: "#ffab40",
          }}
        />
        <Typography variant="body1" sx={{ color: "#ffffff", marginTop: 1 }}>
          {targetTemperature} °C
        </Typography>
      </Box>
      <TimeToTarget
        currentTemperature={temperature}
        temperatureHistory={history}
        targetTemperature={targetTemperature}
      />
    </Box>
  );
};

export default TemperaturePanel;