import { useContext, useEffect } from 'react';
import { getUserLocation } from '../../helper/locationHandler';
import styled from 'styled-components';
import skycloud from '../../helper/picture/blackpicture.webp';
import { WeatherDashboard } from '@/components/weatherDashboard/dashboard';
import { initialWeatherDataType } from '../../helper/weatherDataType';
import { WeatherContext } from '@/context/weatherContext/weatherContext';
import axios from 'axios';

const MainDiv = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const BackgroundDiv = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  background-image: url(${skycloud.src});
  background-repeat: repeat;
  background-position: center;
  background-size: cover;
  filter: blur(0.5px);
`;

const ContentDiv = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function WeatherHome() {
  const weatherApiUrl: string = process.env
    .NEXT_PUBLIC_WEATHER_API_URL as string;

  // const [location, setLocation] = useState<locationType>({
  //   lat: 0,
  //   long: 0,
  // });
  // const [weatherData, setWeatherData] = useState({} as weatherDataType);

  const { forLocation, forWeatherData } = useContext(WeatherContext);
  const { location, setLocation } = forLocation;
  const { weatherData, setWeatherData } = forWeatherData;

  useEffect(() => {
    async function weatherDataInitialization() {
      try {
        const position: GeolocationPosition = await getUserLocation();
        const coordinate: GeolocationCoordinates = position.coords;
        //TODO: pass coordinate to weather api to get weather data, for now use dummy data
        setLocation((prevLocation) => ({
          ...prevLocation,
          lat: coordinate.latitude,
          long: coordinate.longitude,
        }));

        const res = await axios.get(
          `${weatherApiUrl}&q=${coordinate.latitude},${coordinate.longitude}`,
        );
        const weatherDataReceived = res.data as initialWeatherDataType;

        // const weatherDataReceived =
        //   weatherForecastData as initialWeatherDataType;

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
    }

    if (navigator.geolocation) {
      weatherDataInitialization();
      getUserLocation()
        .then((position: GeolocationPosition) => {
          const coordinate = position.coords;
          setLocation((prevLocation) => {
            return {
              ...prevLocation,
              lat: coordinate.latitude,
              long: coordinate.longitude,
            };
          });
        })
        .catch((err: GeolocationPositionError) => {
          // eslint-disable-next-line no-console
          console.warn(`ERROR(${err.code}): ${err.message}`);
        });
    } else {
      // eslint-disable-next-line no-console
      console.warn('Browser does not support geolocation api');
    }
  }, []);

  return (
    <MainDiv>
      <BackgroundDiv />
      <div className="absolute top-24">{location.lat}</div>
      {/* <TestButton onClick={forTestButton}>asd</TestButton> */}
      <ContentDiv>
        {weatherData.isWeatherDataReceived && <WeatherDashboard />}
      </ContentDiv>
    </MainDiv>
  );
}
