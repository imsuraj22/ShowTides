import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
import { DateTime } from "luxon";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

function TideChart({ tide }) {
  const [expanded, setExpanded] = useState(false);

  if (!tide || !tide.extremes || tide.extremes.length === 0) return null;

  const sortedExtremes = tide.extremes.slice().sort((a, b) => DateTime.fromISO(a.date) - DateTime.fromISO(b.date));

  const labels = sortedExtremes.map(e => DateTime.fromISO(e.date).toFormat("MMM d, HH:mm"));
  const dataPoints = sortedExtremes.map(e => e.height);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Tide Height (m)",
        data: dataPoints,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "Height (m)" },
      },
      x: {
        title: { display: true, text: "Time" },
      }
    },
  };

  const containerStyle = {
    marginTop: "20px",
    maxWidth: expanded ? "900px" : "700px",
    height: expanded ? "400px" : "250px",
    marginLeft: "auto",
    marginRight: "auto",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle} onClick={() => setExpanded(!expanded)} title="Click to toggle size">
      <h4 className="font-semibold text-lg select-none">🌊 Tide Cycle Visualization</h4>
      <Line data={data} options={options} />
    </div>
  );
}

export default TideChart;
