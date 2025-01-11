import React from "react";
import { IconButton } from "@mui/material";
import BluetoothConnectedIcon from "@mui/icons-material/BluetoothConnected";
import BluetoothDisabledIcon from "@mui/icons-material/BluetoothDisabled";
import { useBluetooth } from "./BluetoothContext";

const BluetoothButton = () => {
  const { isConnected, isConnecting, connectToDevice, disconnectFromDevice } = useBluetooth();

  return (
    <IconButton
      color="primary"
      onClick={isConnected ? disconnectFromDevice : connectToDevice}
      disabled={isConnecting}
      sx={{ color: isConnected ? "#4caf50" : "#ffab40" }}
    >
      {isConnected ? <BluetoothConnectedIcon /> : <BluetoothDisabledIcon />}
    </IconButton>
  );
};

export default BluetoothButton;
