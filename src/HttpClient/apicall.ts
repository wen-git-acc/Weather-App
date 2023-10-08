import { reqeustedLocationDataType } from '../helper/typeConfig';
import axios from 'axios';

export async function locationSearchRequest(
  locationName: string,
): Promise<reqeustedLocationDataType> {
  const locationApiKey: string = process.env
    .NEXT_PUBLIC_LOCATION_API_KEY as string;
  const limitParams = 5;
  const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=${limitParams}&appid=${locationApiKey}`;

  let locationDataReceived = [] as reqeustedLocationDataType;

  try {
    const res = await axios.get(requestUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locationDataReceived = res.data.map((data: any) => {
      return {
        name: data.name,
        local_names: data.local_names,
        lat: data.lat,
        lng: data.lon,
        country: data.country,
        state: data.state,
      };
    }) as reqeustedLocationDataType;
  } catch (error: unknown) {
    let message = 'Unknown Error';
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    // eslint-disable-next-line no-console
    console.warn(message);
  }
  return locationDataReceived;
}
