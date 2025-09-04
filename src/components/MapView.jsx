import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ tides }) => {
  if (!tides || tides.length === 0) {
    return <p className="text-gray-500">No tide data available for map.</p>;
  }

  // Use first tide point for initial center
  const center = [tides[0].lat, tides[0].lng];

  return (
    <div
      className="w-full rounded-xl shadow-md"
      style={{ height: "400px", touchAction: "manipulation" }} // Fixed height
    >
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}    // Zoom with mouse wheel
        dragging={true}           // Enable mouse/touch drag (panning)
        touchZoom={true}          // Enable pinch zoom
        doubleClickZoom={true}    // Enable double click zoom
        keyboard={true}           // ✅ Enable arrow key panning
        style={{ height: "100%", width: "100%" }}
        tabIndex={0}              // ✅ Make map focusable to receive keyboard input
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {tides.map((tide, idx) =>
          tide.lat !== undefined && tide.lng !== undefined ? (
            <Marker key={idx} position={[tide.lat, tide.lng]}>
              <Popup>
                <strong>{tide.name}</strong>
                <br />
                Lat: {tide.lat}, Lng: {tide.lng}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
