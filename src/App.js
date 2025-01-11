import React, { useState } from "react";
import { Fireplace } from "@mui/icons-material";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import BluetoothConnector from "./components/BluetoothConnector";
import MeterDisplay from "./components/MeterDisplay";
import { subscribeToTemperature } from "./utils/bluetooth";

function App() {
  const [temperature1, setTemperature1] = useState(null);
  const [temperature2, setTemperature2] = useState(null);

  const handleDeviceConnected = (service) => {
    // Subscribe to temperature readings
    subscribeToTemperature(service, setTemperature1, setTemperature2);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#ffab40" }}>
            Meatmate
          </Typography>
          <BluetoothConnector onDeviceConnected={handleDeviceConnected} />
        </Toolbar>
      </AppBar>
      <Container sx={{ padding: 3 }}>
        <Box>
          <MeterDisplay temperature1={temperature1} temperature2={temperature2} />
        </Box>
      </Container>
      </>
  );
}

export default App;
