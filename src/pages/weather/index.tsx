import { useEffect, useState } from 'react';
import { locationType } from './typeConfig';
import { getUserLocation } from './locationHandler';

export default function WeatherHome() {
  const [location, setLocation] = useState<locationType>({
    lat: 0,
    long: 0,
  });

  async function Testing2(
    data: GeolocationPosition,
  ): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tryingdata: GeolocationCoordinates = data.coords;
        resolve(tryingdata);
      }, 5000);
    });
  }
  async function Testing() {
    try {
      const positionTest: GeolocationPosition = await getUserLocation();
      console.log('Hiaaa00');
      const test2data = await Testing2(positionTest);
      console.log(test2data);
    } catch (err) {}
  }

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     getUserLocation()
  //       .then((position: GeolocationPosition) => {
  //         const coordinate = position.coords;
  //         setLocation((prevLocation) => {
  //           return {
  //             ...prevLocation,
  //             lat: coordinate.latitude,
  //             long: coordinate.longitude,
  //           };
  //         });
  //       })
  //       .catch((err: GeolocationPositionError) => {
  //         console.warn(`ERROR(${err.code}): ${err.message}`);
  //       });
  //   } else {
  //     console.warn('Browser does not support geolocation api');
  //   }
  // }, []);
  Testing();
  const testing = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  console.log(testing);
  return (
    <div>
      <div>{location.lat}</div>
      <div>{location.long}</div>
    </div>
  );
}
