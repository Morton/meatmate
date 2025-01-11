import React, { useState } from "react";
import { readCharacteristicValue } from "../utils/bluetooth";

const BluetoothConnector = ({ onDeviceConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectToDevice = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Request device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: false,
        filters: [{ name: "PicoTemperature" }],
        optionalServices: ["12345678-1234-5678-1234-56789abcdef0"], // Replace with your service UUID
      });

      // Connect to GATT server
      const server = await device.gatt.connect();

      // Get the service
      const service = await server.getPrimaryService("12345678-1234-5678-1234-56789abcdef0");

      // Notify the parent component of connection
      onDeviceConnected(service);
    } catch (err) {
      setError("Failed to connect: " + err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      <button onClick={connectToDevice} disabled={isConnecting}>
        {isConnecting ? "Connecting..." : "Connect to Meter"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BluetoothConnector;
