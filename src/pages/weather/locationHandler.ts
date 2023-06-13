import {
  geolocationOptionsType,
  sortedCitiesCountriesDataType,
  citiesCountriesDataType,
} from './typeConfig';
import * as XLSX from 'xlsx';

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

export async function locationExcelReader(
  file: string,
): Promise<sortedCitiesCountriesDataType[]> {
  return fetch(file)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const wb = XLSX.read(buffer, { type: 'buffer' });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const data = XLSX.utils.sheet_to_json(ws) as citiesCountriesDataType;
      return data.map((info) => {
        return {
          lat: info.lat,
          long: info.lng,
          country: info.country,
          city: info.city,
          name: info.city + ', ' + info.country,
        } as sortedCitiesCountriesDataType;
      });
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
