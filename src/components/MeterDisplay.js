import React from "react";

const MeterDisplay = ({ temperature1, temperature2 }) => (
  <div>
    <h2>Meter Readings</h2>
    <p>Probe 1: {temperature1 ? `${temperature1.toFixed(2)} °C` : "Loading..."}</p>
    <p>Probe 2: {temperature2 ? `${temperature2.toFixed(2)} °C` : "Loading..."}</p>
  </div>
);

export default MeterDisplay;
