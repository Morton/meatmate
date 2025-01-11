import { useState, useEffect } from "react"; 

const useTimeToTarget = (history, targetTemperature) => { 
  const [timeToTarget, setTimeToTarget] = useState(null); 
  const [timeToTargetHistory, setTimeToTargetHistory] = useState([]); 
  const [lastUpdate, setLastUpdate] = useState(Date.now()); 

  useEffect(() => { 
    // Smooth the time-to-target value using a moving average 
    const calculateSmoothedTime = (newTime) => { 
      const bufferSize = 5; // Number of entries for moving average 
      setTimeToTargetHistory((prev) => { 
        const updatedHistory = [...prev, newTime]; 
        if (updatedHistory.length > bufferSize) { 
          updatedHistory.shift(); // Keep only the last `bufferSize` entries 
        } 
        return updatedHistory; 
      }); 

      const smoothedTime = 
        timeToTargetHistory.reduce((acc, val) => acc + val, 0) / 
        timeToTargetHistory.length; 

      setTimeToTarget(smoothedTime); 
    }; 

    // Calculate the time to reach the target temperature based on the history 
    const calculateTimeToTarget = () => { 
      if (!history || history.length < 2 || targetTemperature <= 0) { 
        setTimeToTarget(null); 
        setTimeToTargetHistory([]); 
        return; 
      } 

      const latestEntries = history.slice(-15); // Use the last 15 entries 
      const tempDiff = 
        latestEntries[latestEntries.length - 1].value - 
        latestEntries[0].value; 
      const timeDiff = 
        new Date(latestEntries[latestEntries.length - 1].timestamp).getTime() - 
        new Date(latestEntries[0].timestamp).getTime(); 

      if (tempDiff <= 0) { 
        setTimeToTarget(null); // Cannot calculate if temperature isn't increasing 
        setTimeToTargetHistory([]); 
        return; 
      } 

      const rate = tempDiff / (timeDiff / 1000); // Rate in °C per second 
      const remainingTemp = 
        targetTemperature - latestEntries[latestEntries.length - 1].value; 

      if (remainingTemp <= 0) { 
        setTimeToTarget(0); // Already at or above target temperature 
        setTimeToTargetHistory([]); 
        return; 
      } 

      const timeToReachTarget = remainingTemp / rate; // Time in seconds 
      calculateSmoothedTime(timeToReachTarget); 
    }; 

    const now = Date.now(); 
    if (now - lastUpdate >= 15000) { // Debounce: Only update every 15 seconds 
      calculateTimeToTarget(); 
      setLastUpdate(now); 
    } 
  }, [targetTemperature, history, lastUpdate]); 

  return timeToTarget; 
}; 

export default useTimeToTarget;
