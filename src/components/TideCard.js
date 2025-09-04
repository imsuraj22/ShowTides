import React from "react";
import { DateTime } from "luxon";
import useCountdown from "../hooks/useCountdown";
import TideChart from "./TideChart";
import SafeWindows from "./SafeWindows";

function TideCard({ tide }) {
   const extremes = tide.extremes || [];
  console.log("tide data is",tide);
  const now = DateTime.now();

  const nextHighTideEvent = extremes.find(
    (e) => e.type === "High" && DateTime.fromISO(e.date) > now
  );
  const nextLowTideEvent = extremes.find(
    (e) => e.type === "Low" && DateTime.fromISO(e.date) > now
  );

  // Provide fallback DateTime (now) if events not found
  const highTide = nextHighTideEvent ? DateTime.fromISO(nextHighTideEvent.date) : now;
  const lowTide = nextLowTideEvent ? DateTime.fromISO(nextLowTideEvent.date) : now;

  // Call hooks unconditionally
  const countdownHigh = useCountdown(highTide);
  const countdownLow = useCountdown(lowTide);

  // Now handle rendering conditionally
  if (!extremes.length) {
    return <p>No tide data available</p>;
  }

  // You can optionally render messages for missing tides below
  if (!nextHighTideEvent || !nextLowTideEvent) {
    return <p>No upcoming tide events found</p>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        background: "#f9f9f9",
      }}
    >
      <h3>{tide.name}</h3>
      <p>
        📍 Location: {tide.name}, {tide.state}
      </p>

      <p>
        🌊 Next High Tide: {highTide.toFormat("ff")} ({countdownHigh})
      </p>
      <p>
        🏝 Next Low Tide: {lowTide.toFormat("ff")} ({countdownLow})
      </p>
      <SafeWindows tide={tide}/>

      {/* Rest of your component */}
      <TideChart tide={tide} />
    </div>
  );
}

export default TideCard;
