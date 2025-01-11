import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import MeterDisplay from "./components/MeterDisplay";
import BluetoothButton from "./components/BluetoothButton";

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
      <MeterDisplay />
    </>
  );
}

export default App;
