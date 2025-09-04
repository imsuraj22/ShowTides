import React, { useState } from "react";
import { DateTime, Duration } from "luxon";

// Readable datetime formatting
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
function calculateSafeWindows(extremes) {
  const now = DateTime.now();
  const windows = [];

  // Filter todays extremes only (optional, depends on your needs)
  const todayExtremes = extremes.filter((e) => {
    const dt = DateTime.fromISO(e.date);
    return dt.hasSame(now, "day");
  });

  // Separate High and Low tides of today sorted by time
  const lowTides = todayExtremes.filter(e => e.type === "Low").sort((a,b) => DateTime.fromISO(a.date) - DateTime.fromISO(b.date));
  const highTides = todayExtremes.filter(e => e.type === "High").sort((a,b) => DateTime.fromISO(a.date) - DateTime.fromISO(b.date));

  // Swimming windows: 2 hours before and after Low Tide
  lowTides.forEach(low => {
    const lowTime = DateTime.fromISO(low.date);
    windows.push({
      activity: "Swimming",
      start: lowTime.minus({ hours: 2 }).toISO(),
      end: lowTime.plus({ hours: 2 }).toISO(),
    });
  });

  // Fishing windows: 1 hour before and 3 hours after High Tide
  highTides.forEach(high => {
    const highTime = DateTime.fromISO(high.date);
    windows.push({
      activity: "Fishing",
      start: highTime.minus({ hours: 1 }).toISO(),
      end: highTime.plus({ hours: 3 }).toISO(),
    });
  });

  // Boating windows: 1 hour after High Tide to 5 hours after High Tide
  highTides.forEach(high => {
    const highTime = DateTime.fromISO(high.date);
    windows.push({
      activity: "Boating",
      start: highTime.plus({ hours: 1 }).toISO(),
      end: highTime.plus({ hours: 5 }).toISO(),
    });
  });

  return windows;
}

const activityIcons = {
  Swimming: "🏊",
  Fishing: "🎣",
  Boating: "🛶"
};

// Best time rules (example; customize as needed)
const getDefaultWindows = (tides) => {
  // Here, `tides` could be the `extremes` array from your tide API

  // If no real logic, return hardcoded intervals:
  return [
    {
      activity: "Swimming",
      start: "2025-09-04T11:06:00+05:30",
      end:   "2025-09-04T15:06:00+05:30"
    },
    {
      activity: "Fishing",
      start: "2025-09-04T05:06:00+05:30",
      end:   "2025-09-04T09:06:00+05:30"
    },
    {
      activity: "Boating",
      start: "2025-09-04T15:06:00+05:30",
      end:   "2025-09-05T05:06:00+05:30"
    }
  ];
};

const SafeWindowCard = ({ activity, start, end }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`cursor-pointer transition-all duration-300 ease-in-out bg-white shadow-md rounded-2xl 
        p-5 min-w-[220px] max-w-xs hover:shadow-xl border border-blue-200 flex-1
        ${expanded ? "ring-2 ring-blue-200 scale-105 z-10" : ""}`}
      onClick={() => setExpanded((e) => !e)}
      style={{ minWidth: 220 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{activityIcons[activity] || "✅"}</span>
        <h3 className="text-lg font-semibold text-blue-700">{activity}</h3>
      </div>
      <div className="text-sm text-gray-600 mt-2">
        {formatDateTime(start)} <span className="text-gray-400">→</span><br/> {formatDateTime(end)}
      </div>
      {expanded && (
        <div className="mt-3 text-blue-900">
          ✅ Safe period for <strong>{activity.toLowerCase()}</strong>.
        </div>
      )}
    </div>
  );
};

const SafeWindows = ({ tide }) => {
  // Optionally compute based on tides, or use default windows for demo
  const windows = calculateSafeWindows(tide.extremes);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-green-500 text-lg">✅</span> Safe Windows
      </h2>
      <div className="flex flex-wrap gap-4">
        {windows.map((w, idx) => (
          <SafeWindowCard
            key={idx}
            activity={w.activity}
            start={w.start}
            end={w.end}
          />
        ))}
      </div>
    </div>
  );
};

export default SafeWindows;
