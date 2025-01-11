import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import TemperaturePanel from "./components/TemperaturePanel";
import BluetoothButton from "./components/BluetoothButton";
import TemperatureHistoryChart from "./components/TemperatureHistoryChart";

function App() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1e1e1e" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#ffab40" }}>
            Meat mate
          </Typography>
          <BluetoothButton />
        </Toolbar>
      </AppBar>
      <TemperaturePanel probeNumber={0} />
      <TemperaturePanel probeNumber={1} />
      <TemperatureHistoryChart />
    </>
  );
}

export default App;
