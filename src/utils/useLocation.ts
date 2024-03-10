import React from "react";

/**
 * A custom React hook that returns the current latitude and longitude of the user’s device.
 * @returns An object with two properties: lat and lng, which are numbers or null if the geolocation is not available or not yet retrieved.
 */
export function useLocation() {
  const [lat, setLat] = React.useState<number | null>(null);
  const [lng, setLng] = React.useState<number | null>(null);

  function getLocation() {
    // Check if geolocation is available
    if (navigator.geolocation) {
      // Get the current position and update the state variables
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }
    // Geolocation is not supported by this browser
    else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // Call the getLocation function when the component mounts
  React.useEffect(() => {
    getLocation();
  }, []);

  // Return null if the location wasn't provided
  if (lat == null || lng == null) {
    return null;
  }

  // Return the latitude and longitude as an object
  return { lat, lng };
}
