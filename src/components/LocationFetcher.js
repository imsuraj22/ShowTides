import { useEffect } from "react";

function LocationFetcher({ onLocationFetched, onError, setLoading }) {
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocationFetched({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          onError("Failed to get location: " + err.message);
          setLoading(false);
        }
      );
    } else {
      onError("Geolocation not supported in this browser.");
    }
  }, [onLocationFetched, onError, setLoading]);

  return null; // no UI, just fetches location
}

export default LocationFetcher;
