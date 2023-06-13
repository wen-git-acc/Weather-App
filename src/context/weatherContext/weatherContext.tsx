import {
  locationType,
  sortedCitiesCountriesDataType,
} from '@/pages/weather/typeConfig';
import {
  initialWeatherDataType,
  weatherDataType,
} from '@/pages/weather/weatherDataType';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import axios from 'axios';
type weatherContextType = {
  forLocation: {
    location: locationType;
    setLocation: Dispatch<SetStateAction<locationType>>;
  };
  forWeatherData: {
    weatherData: weatherDataType;
    setWeatherData: Dispatch<SetStateAction<weatherDataType>>;
  };
  forCityCountryData: {
    citiesCountriesData: sortedCitiesCountriesDataType[];
    setCitiesCountriesData: Dispatch<
      SetStateAction<sortedCitiesCountriesDataType[]>
    >;
  };
  forSetWeatherDataNewLocation: {
    setNewWeatherData: (lat: number, long: number) => void;
  };
};

export const WeatherContext = createContext<weatherContextType>(
  {} as weatherContextType,
);

export default function WeatherContextProvider({
  children,
}: PropsWithChildren) {
  const [location, setLocation] = useState<locationType>({} as locationType);
  const [weatherData, setWeatherData] = useState<weatherDataType>({
    isWeatherDataReceived: false,
  } as weatherDataType);
  const weatherApiUrl: string = process.env
    .NEXT_PUBLIC_WEATHER_API_URL as string;

  const [citiesCountriesData, setCitiesCountriesData] = useState<
    sortedCitiesCountriesDataType[]
  >([] as sortedCitiesCountriesDataType[]);

  async function newLocationDataHandler(lat: number, long: number) {
    setLocation((prevLocation) => ({
      ...prevLocation,
      lat: lat,
      long: long,
    }));

    const res = await axios.get(`${weatherApiUrl}&q=${lat},${long}`);
    const weatherDataReceived = res.data as initialWeatherDataType;

    setWeatherData((prevWeatherData) => ({
      ...prevWeatherData,
      locationInformation: weatherDataReceived.location,
      currentDayInformation: weatherDataReceived.current,
      forecastDayInformation: weatherDataReceived.forecast,
      selectedCurrentDayInformation: {
        imageIconUrl: weatherDataReceived.current.condition.icon,
        cityName: weatherDataReceived.location.name,
        countryName: weatherDataReceived.location.country,
        weatherDescription: weatherDataReceived.current.condition.text,
        temperature_C: weatherDataReceived.current.temp_c,
        temperature_F: weatherDataReceived.current.temp_f,
        epochTime: weatherDataReceived.location.localtime_epoch,
        conventionalTime: {
          date: '',
          time: '',
        },
      },
      isWeatherDataReceived: true,
    }));
  }

  const contextValue: weatherContextType = {
    forLocation: {
      location: location,
      setLocation: setLocation,
    },
    forWeatherData: {
      weatherData: weatherData,
      setWeatherData: setWeatherData,
    },
    forCityCountryData: {
      citiesCountriesData: citiesCountriesData,
      setCitiesCountriesData: setCitiesCountriesData,
    },
    forSetWeatherDataNewLocation: {
      setNewWeatherData: newLocationDataHandler,
    },
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}
