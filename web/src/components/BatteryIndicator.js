import React, { useMemo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import Battery80Icon from "@mui/icons-material/Battery80";
import Battery60Icon from "@mui/icons-material/Battery60";
import Battery30Icon from "@mui/icons-material/Battery30";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
import { useBluetooth } from "./BluetoothContext";

const BatteryIndicator = () => {
  const { isConnected, batteryLevel, batteryText } = useBluetooth();

  const icon = useMemo(() => {
    if (batteryLevel >= 80) {
      return <BatteryFullIcon sx={{ color: "#ffab40" }} />;
    } else if (batteryLevel >= 60) {
      return <Battery80Icon sx={{ color: "#ffab40" }} />;
    } else if (batteryLevel >= 40) {
      return <Battery60Icon sx={{ color: "#ffab40" }} />;
    } else if (batteryLevel >= 20) {
      return <Battery30Icon sx={{ color: "#ffab40" }} />;
    } else {
      return <BatteryAlertIcon sx={{ color: "#ff3d00" }} />;
    }
  }, [batteryLevel]);

  if (!isConnected) {
    return null;
  }

  return (
    <Tooltip title={batteryText} arrow>
      <IconButton>{icon}</IconButton>
    </Tooltip>
  );
};

export default BatteryIndicator;
