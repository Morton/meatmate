import React from "react";
import { Toolbar, Typography, Box } from "@mui/material";
import TemperaturePanel from "./components/TemperaturePanel";
import BluetoothButton from "./components/BluetoothButton";
import TemperatureHistoryChart from "./components/TemperatureHistoryChart";

function App() {
  return (
    <>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#ffab40" }}>
          Meat mate
        </Typography>
        <BluetoothButton />
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          padding: 2,
          flexWrap: "wrap",
        }}
      >
        <TemperaturePanel probeNumber={0} />
        <TemperaturePanel probeNumber={1} />
      </Box>
      <TemperatureHistoryChart />
    </>
  );
}

export default App;
