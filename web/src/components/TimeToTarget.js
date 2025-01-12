import React, { useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import useTimeToTarget from "../hooks/useTimeToTarget";

const TimeToTarget = ({ currentTemperature, temperatureHistory, targetTemperature }) => {
  const timeToTarget = useTimeToTarget(temperatureHistory, targetTemperature);

  const progress = useMemo(() => {
    if (!currentTemperature || targetTemperature <= 50 || !temperatureHistory || temperatureHistory.length === 0) return 0;

    const minTemperature = Math.min(...temperatureHistory.map(entry => entry.value));
    const adjustedTemperature = currentTemperature - minTemperature;
    const adjustedTarget = targetTemperature - minTemperature;

    return Math.min((adjustedTemperature / adjustedTarget) * 100, 100);
  }, [currentTemperature, targetTemperature, temperatureHistory]);

  // Convert seconds to a readable time format
  const formatTime = (seconds) => {
    if (seconds <= 0) return "Reached or above target.";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) return `${hrs}h ${mins}m`;
    else if (mins > 0) return `${mins}m ${secs}s`;
    else return `${secs}s`;
  };

  const targetClockTime = useMemo(() => {
    if (timeToTarget <= 0) return "Target already reached.";
    const targetTime = new Date(Date.now() + timeToTarget * 1000);
    return targetTime.toLocaleTimeString();
  }, [timeToTarget]);

  return (
    <Box sx={{ marginTop: 4, textAlign: "center" }}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={timeToTarget !== null && !isNaN(timeToTarget) && timeToTarget > 0 ? progress : 100}
          size={120}
          sx={{ color: timeToTarget !== null && timeToTarget <= 0 ? "#4caf50" : "#ffab40" }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#ffffff" }}>
            {timeToTarget !== null && !isNaN(timeToTarget)
              ? timeToTarget <= 0
                ? "Done"
                : formatTime(timeToTarget)
              : "--"}
          </Typography>
        </Box>
      </Box>
      {timeToTarget !== null && !isNaN(timeToTarget) && timeToTarget > 0 && (
        <Typography
          variant="body1"
          sx={{ color: "#ffffff", textAlign: "center", marginTop: 2 }}
        >
          {targetClockTime}
        </Typography>
      )}
    </Box>
  );
};

export default TimeToTarget;
