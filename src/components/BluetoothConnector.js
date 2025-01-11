import React, { useState } from "react";
import { IconButton } from "@mui/material";
import BluetoothConnectedIcon from "@mui/icons-material/BluetoothConnected";
import BluetoothDisabledIcon from "@mui/icons-material/BluetoothDisabled";

const BluetoothConnector = ({ onDeviceConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [server, setServer] = useState(null);

  const connectToDevice = async () => {
    if (isConnected) {
      // Handle disconnection
      setIsConnected(false);
      console.log("Disconnected from device");
      return;
    }

    setIsConnecting(true);

    try {
      // Request device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: false,
        filters: [{ name: "PicoTemperature" }],
        optionalServices: ["12345678-1234-5678-1234-56789abcdef0"],
      });

      // Connect to GATT server
      const _server = await device.gatt.connect();
      setServer(_server);

      // Get the service
      const service = await _server.getPrimaryService("12345678-1234-5678-1234-56789abcdef0");

      // Notify the parent component of connection
      onDeviceConnected(service);
      setIsConnected(true);
      console.log("Connected to device");
    } catch (error) {
      console.error("Failed to connect: ", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <IconButton color="primary" onClick={connectToDevice} disabled={isConnecting} sx={{ color: "#ffab40" }}>
      <IconButton
        color="primary"
        onClick={connectToDevice}
        disabled={isConnecting}
        sx={{ color: isConnected ? "#4caf50" : "#ffab40" }}
      >
        {isConnected ? <BluetoothConnectedIcon /> : <BluetoothDisabledIcon />}
      </IconButton>
    </IconButton>
  );
};

export default BluetoothConnector;
