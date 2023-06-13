export type geolocationOptionsType = {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
};

export type locationType = {
  lat: number;
  long: number;
};

export type citiesCountriesDataType = {
  admin_name?: string;
  city: string;
  country: string;
  id?: number;
  iso2?: string;
  iso3?: string;
  lat: number;
  lng: number;
  populatom?: number;
}[];

export type sortedCitiesCountriesDataType = {
  city: string;
  country: string;
  lat: number;
  long: number;
  name: string;
};

export const keyEventArr = ['ArrowUp', 'ArrowDown', 'Enter'] as const;
export type keyEventType = (typeof keyEventArr)[number];

export type keyEventObjType = {
  Up: keyEventType;
  Down: keyEventType;
  Enter: keyEventType;
};
