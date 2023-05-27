import { locationType } from '@/pages/weather/typeConfig';
import { weatherDataType } from '@/pages/weather/weatherDataType';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type weatherContextType = {
  forLocation: {
    location: locationType;
    setLocation: Dispatch<SetStateAction<locationType>>;
  };
  forWeatherData: {
    weatherData: weatherDataType;
    setWeatherData: Dispatch<SetStateAction<weatherDataType>>;
  };
};

export const WeatherContext = createContext<weatherContextType>(
  {} as weatherContextType,
);

export default function WeatherContextProvider({
  children,
}: PropsWithChildren) {
  const [location, setLocation] = useState<locationType>({} as locationType);
  const [weatherData, setWeatherData] = useState<weatherDataType>(
    {} as weatherDataType,
  );

  const contextValue: weatherContextType = {
    forLocation: {
      location: location,
      setLocation: setLocation,
    },
    forWeatherData: {
      weatherData: weatherData,
      setWeatherData: setWeatherData,
    },
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}
