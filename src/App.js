import React, { useState, useEffect } from "react";
import BluetoothConnector from "./components/BluetoothConnector";
import MeterDisplay from "./components/MeterDisplay";
import { subscribeToTemperature } from "./utils/bluetooth";

function App() {
  const [temperature1, setTemperature1] = useState(null);
  const [temperature2, setTemperature2] = useState(null);

  const handleDeviceConnected = (service) => {
    // Subscribe to temperature notifications
    subscribeToTemperature(service, setTemperature1, setTemperature2);
  };

  return (
    <div>
      <h1>Bluetooth Meter</h1>
      <BluetoothConnector onDeviceConnected={handleDeviceConnected} />
      <MeterDisplay temperature1={temperature1} temperature2={temperature2} />
    </div>
  );
}

export default App;
