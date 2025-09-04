import React, { useState, useEffect } from "react";
import TideList from "./components/TideList";

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get user location
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(JSON.parse(savedLocation));
      console.log("here entered and location is ",JSON.parse(savedLocation));
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude };
          localStorage.setItem("userLocation", JSON.stringify(loc));
          setLocation(loc);
          console.log("location is ", loc);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
   
  }, []);

  const clearLocation = () => {
    localStorage.removeItem("userLocation");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">🌊 TideShows</h1>
        <button
          onClick={clearLocation}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
        >
          Clear Location
        </button>
      </div>

      {location ? (
     <TideList userLocation={location} />
      ) : (
        <p className="text-gray-600">Fetching location...</p>
      )}
    </div>
  );
}

export default App;
