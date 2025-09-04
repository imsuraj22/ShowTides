import React, { useEffect, useState } from "react";
import TideCard from "./TideCard";
import MapView from "./MapView";
import COASTS from '../data/coasts.json';

const dummyData = [

  {
    "name": "Kutch Coast",
    "state": "Gujarat",
    "lat": 23.6102,
    "lng": 70.0026,
    "distance": 0,
    "extremes": [
      { "dt": 1756944330, "date": "2025-09-04T00:05+0000", "height": -1.646, "type": "Low" },
      { "dt": 1756968630, "date": "2025-09-04T06:50+0000", "height": 1.587, "type": "High" },
      { "dt": 1756991460, "date": "2025-09-04T13:11+0000", "height": -0.88, "type": "Low" },
      { "dt": 1757010720, "date": "2025-09-04T18:32+0000", "height": 0.875, "type": "High" },
      { "dt": 1757033850, "date": "2025-09-05T00:57+0000", "height": -1.893, "type": "Low" }
    ]
  },
  {
    "name": "Mumbai Coast",
    "state": "Maharashtra",
    "lat": 19.0760,
    "lng": 72.8777,
    "distance": 350,
    "extremes": [
      { "dt": 1756948200, "date": "2025-09-04T01:30+0000", "height": -1.20, "type": "Low" },
      { "dt": 1756971600, "date": "2025-09-04T07:40+0000", "height": 1.50, "type": "High" },
      { "dt": 1756994400, "date": "2025-09-04T13:40+0000", "height": -0.75, "type": "Low" },
      { "dt": 1757013600, "date": "2025-09-04T18:50+0000", "height": 0.92, "type": "High" },
      { "dt": 1757036700, "date": "2025-09-05T01:05+0000", "height": -1.10, "type": "Low" }
    ]
  },
  {
    "name": "Goa Coast",
    "state": "Goa",
    "lat": 15.2993,
    "lng": 74.1240,
    "distance": 650,
    "extremes": [
      { "dt": 1756950300, "date": "2025-09-04T02:15+0000", "height": -1.30, "type": "Low" },
      { "dt": 1756973700, "date": "2025-09-04T08:00+0000", "height": 1.65, "type": "High" },
      { "dt": 1756996500, "date": "2025-09-04T14:05+0000", "height": -0.85, "type": "Low" },
      { "dt": 1757015700, "date": "2025-09-04T19:15+0000", "height": 1.00, "type": "High" },
      { "dt": 1757038800, "date": "2025-09-05T02:00+0000", "height": -1.35, "type": "Low" }
    ]
  }
  // You can add more coasts here for testing
];

// Helper to calculate distance (Haversine formula)
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))); 
}

const WORLD_TIDES_KEY = process.env.REACT_APP_WORLD_TIDES_KEY; // replace with your actual key

const TideList = ({ userLocation }) => {
  console.log("here also ",userLocation);
  const [tides, setTides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(today.getDate()).padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
    if (!userLocation) {
      console.log("we are returning");
      return;
    }
    setLoading(true);

    // Sort coasts by proximity
    const sortedCoasts = [...COASTS].map((coast) => ({
      ...coast,
      distance: haversine(userLocation.lat, userLocation.lon, coast.lat, coast.lng),
    }))
    .sort((a, b) => a.distance - b.distance);

    // Get top 6 nearest coasts
    const nearestCoasts = sortedCoasts.slice(0, 6);

    const fetchTideData = async () => {
      console.log("entered here");                                
      try {

        const tidePromises = nearestCoasts.map(async (coast) => {
          // console.log(coast);
          // console.log(coast.lat+" "+coast.lng);
           const url = `https://www.worldtides.info/api/v3?extremes&date=${currentDate}&lat=${coast.lat}&lon=${coast.lng}&days=7&key=${WORLD_TIDES_KEY}`;
           //const url = `https://www.worldtides.info/api/v3?heights&extremes&date=${currentDate}&lat=${coast.lat}&lon=${coast.lon}&days=7&key=${WORLD_TIDES_KEY}`;

          const resp = await fetch(url);
          const data = await resp.json();
          console.log("data is ",data);
          return {
            ...coast,
            extremes: data.extremes || [],
          };
        });
        const results = await Promise.all(tidePromises);
        setTides(results);
        //  setTides(dummyData);
          setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch tide data: " + err.message);
      } finally {
        setLoading(false);
      }

    };

    fetchTideData();
  }, [userLocation]);

  if (loading) return <p>Loading tides data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="text-xl font-dark mb-3">Nearest Coasts</h2>
      <MapView userLocation={userLocation} tides={tides} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tides.map((tide, idx) => (
          
          <TideCard key={idx} tide={tide} />
        ))}
      </div>
    </div>
  );
};

export default TideList;
