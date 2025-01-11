import React from "react";
import { Box, Typography } from "@mui/material";
import { useBluetooth } from "./BluetoothContext";

const MeterDisplay = () => {
  const { currentTemperatures } = useBluetooth();

  const temperature1 = currentTemperatures[0];
  const temperature2 = currentTemperatures[1];

  return (
    <>
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
          Probe 1
        </Typography>
        <Typography variant="body1" sx={{ color: "#ffffff" }}>
          <strong>Temperature:</strong> {temperature1 ? `${temperature1.toFixed(2)} °C` : "Waiting for reading..."}
        </Typography>
      </Box>
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
          Probe 2
        </Typography>
        <Typography variant="body1" sx={{ color: "#ffffff" }}>
          <strong>Temperature:</strong> {temperature2 ? `${temperature2.toFixed(2)} °C` : "Waiting for reading..."}
        </Typography>
      </Box>
    </>
  )
};

export default MeterDisplay;
