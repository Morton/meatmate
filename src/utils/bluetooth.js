export async function subscribeToTemperature(service, setTemperature1, setTemperature2) {
  try {
    // Get characteristics
    const temp1Char = await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef1");
    const temp2Char = await service.getCharacteristic("12345678-1234-5678-1234-56789abcdef2");

    // Start notifications
    temp1Char.startNotifications().then(() => {
      temp1Char.addEventListener("characteristicvaluechanged", (event) => {
        const value = parseFloat(new TextDecoder().decode(event.target.value));
        setTemperature1(value);
      });
    });

    temp2Char.startNotifications().then(() => {
      temp2Char.addEventListener("characteristicvaluechanged", (event) => {
        const value = parseFloat(new TextDecoder().decode(event.target.value));
        setTemperature2(value);
      });
    });
  } catch (err) {
    console.error("Error subscribing to temperature: ", err);
  }
}
