import { useState, useEffect, useCallback } from "react";

const useBluetoothConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentTemperatures, setCurrentTemperatures] = useState([null, null]);
  const [temperatureHistories, setTemperatureHistories] = useState([[], []]);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryText, setBatteryText] = useState(null);
  const [service, setService] = useState(null);

  const connectToDevice = useCallback(async () => {
    setIsConnecting(true);
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: false,
        filters: [{ name: "PicoTemperature" }],
        optionalServices: ["12345678-1234-5678-1234-56789abcdef0"],
      });

      const server = await device.gatt.connect();
      const _service = await server.getPrimaryService("12345678-1234-5678-1234-56789abcdef0");
      setService(_service);

      setIsConnected(true);
      console.log("Connected to device");
    } catch (error) {
      console.error("Failed to connect: ", error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectFromDevice = useCallback(() => {
    if (service?.device?.gatt?.connected) {
      service.device.gatt.disconnect();
      setIsConnected(false);
      console.log("Disconnected from device");
    }
  }, [service]);

  const subscribeToTemperature = useCallback(async () => {
    if (!service) return;

    try {
      const temp1Char = await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef1");
      const temp2Char = await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef2");
      const batteryChar = await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef5");

      // Subscribe to temperature 1
      temp1Char.startNotifications().then(() => {
        temp1Char.addEventListener("characteristicvaluechanged", (event) => {
          const value = parseFloat(new TextDecoder().decode(event.target.value));
          const timestamp = new Date().toISOString();
          setCurrentTemperatures((prev) => [value, prev[1]]);
          setTemperatureHistories((prev) => [
            [...prev[0], { value, timestamp }],
            prev[1],
          ]);
        });
      });

      // Subscribe to temperature 2
      temp2Char.startNotifications().then(() => {
        temp2Char.addEventListener("characteristicvaluechanged", (event) => {
          const value = parseFloat(new TextDecoder().decode(event.target.value));
          const timestamp = new Date().toISOString();
          setCurrentTemperatures((prev) => [prev[0], value]);
          setTemperatureHistories((prev) => [
            prev[0],
            [...prev[1], { value, timestamp }],
          ]);
        });
      });

      // Subscribe to battery level
      batteryChar.startNotifications().then(() => {
        batteryChar.addEventListener("characteristicvaluechanged", (event) => {
          const value = new TextDecoder().decode(event.target.value);
          setBatteryText(value);
          setBatteryLevel(/.*\(([0-9.]+)%\)/.exec(value)?.[1]);
        });
      });
    } catch (error) {
      console.error("Error subscribing to characteristics: ", error);
    }
  }, [service]);

  useEffect(() => {
    if (isConnected && service) {
      subscribeToTemperature();
    }
  }, [isConnected, service, subscribeToTemperature]);

  return {
    isConnected,
    isConnecting,
    currentTemperatures,
    temperatureHistories,
    batteryLevel,
    batteryText,
    connectToDevice,
    disconnectFromDevice,
  };
};

export default useBluetoothConnection;
