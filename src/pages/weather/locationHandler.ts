import { geolocationOptionsType } from './typeConfig';

const geolocationOptions: geolocationOptionsType = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export function getUserLocation() {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      geolocationOptions,
    );
  });
}

// export function getUserLocation() {
//   return geoLocationTrigger()
//     ?.then((position) => successGeolocation(position))
//     .catch((error: GeolocationPositionError): locationType => {
//       errorGeolocation(error);
//       return {
//         lat: 0,
//         long: 0,
//       };
//     });
// }
