import { useEffect, useState } from 'react';
import { geolocationOptionsType, locationType } from './typeConfig';

const geolocationOptions: geolocationOptionsType = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function WeatherHome() {
  const [location, setLocation] = useState<locationType>({
    lat: 0,
    long: 0,
  });

  function successGeolocation(pos: GeolocationPosition) {
    const crd = pos.coords;
    console.log(pos);

    setLocation((prevLocation) => ({
      ...prevLocation,
      lat: crd.latitude,
      long: crd.longitude,
    }));
  }

  function errorGeolocation(err: GeolocationPositionError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(
        successGeolocation,
        errorGeolocation,
        geolocationOptions,
      );
    }
  }, []);

  return (
    <div>
      <div>{location.lat}</div>
      <div>{location.long}</div>
    </div>
  );
}
