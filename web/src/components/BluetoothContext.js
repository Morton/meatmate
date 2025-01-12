import React, { createContext, useContext, useMemo } from "react";
import useBluetoothConnection from "../hooks/useBluetoothConnection";

// Create the context
const BluetoothContext = createContext();

// BluetoothProvider component
export const BluetoothProvider = ({ children }) => {
  const bluetooth = useBluetoothConnection();

  const value = useMemo(() => bluetooth, [bluetooth]);

  return (
    <BluetoothContext.Provider value={value}>{children}</BluetoothContext.Provider>
  );
};

// Hook to use Bluetooth context
export const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  if (!context) {
    throw new Error("useBluetooth must be used within a BluetoothProvider");
  }
  return context;
};
