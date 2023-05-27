import { useContext, useEffect, useState } from 'react';
import { locationType } from './typeConfig';
import { getUserLocation } from './locationHandler';
import styled from 'styled-components';
import skycloud from './picture/skycloud.gif';
import { WeatherDashboard } from '@/components/weatherDashboard/dashboard';
import { weatherDataType, weatherForecastData } from './weatherDataType';
import { WeatherContext } from '@/context/weatherContext/weatherContext';

const MainDiv = styled.div`
  position: relative;
  height: 100%;
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

const TestButton = styled.button`
  position: absolute;
  top: 70px;
  left: 50%;
  height: 100px;
  width: 100px;
  background-color: red;
  cursor: crosshair;
  z-index: 1;
`;
export default function WeatherHome() {
  // const [location, setLocation] = useState<locationType>({
  //   lat: 0,
  //   long: 0,
  // });
  // const [weatherData, setWeatherData] = useState({} as weatherDataType);

  const { forLocation, forWeatherData } = useContext(WeatherContext);
  const { location, setLocation } = forLocation;
  const { weatherData, setWeatherData } = forWeatherData;
  // const [nice, setNice] = useState(0);
  // const [testing, setTesting] = useState<weatherDataType>({});
  // async function Testing2(
  //   data: GeolocationPosition,
  // ): Promise<GeolocationCoordinates> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const tryingdata: GeolocationCoordinates = data.coords;
  //       resolve(tryingdata);
  //     }, 5000);
  //   });
  // }
  // async function Testing() {
  //   try {
  //     const positionTest: GeolocationPosition = await getUserLocation();
  //     console.log('Hiaaa00');
  //     const test2data = await Testing2(positionTest);
  //     console.log(test2data);
  //   } catch (err) {}
  // }

  // function forTestButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  //   e.preventDefault();
  //   console.log('TestButton');
  //   setNice((prev: number) => prev + 1);
  //   setLocation((prevLocation) => {
  //     return {
  //       ...prevLocation,
  //       lat: prevLocation.lat + 1,
  //     };
  //   });
  // }

  useEffect(() => {
    async function displayUserLocationData() {
      try {
        const position: GeolocationPosition = await getUserLocation();
        const coordinate: GeolocationCoordinates = position.coords;
        //TODO: pass coordinate to weather api to get weather data, for now use dummy data
        setLocation((prevLocation) => ({
          ...prevLocation,
          lat: coordinate.latitude,
          long: coordinate.longitude,
        }));
        const weatherDataReceived = weatherForecastData as weatherDataType;
        setWeatherData((prevWeatherData) => ({
          ...prevWeatherData,
          ...weatherDataReceived,
        }));
      } catch (error: unknown) {
        let message = 'Unknown Error';
        if (error instanceof Error) message = error.message;
        else message = String(error);
      }
    }

    if (navigator.geolocation) {
      displayUserLocationData();
      // getUserLocation()
      //   .then((position: GeolocationPosition) => {
      //     const coordinate = position.coords;
      //     setLocation((prevLocation) => {
      //       return {
      //         ...prevLocation,
      //         lat: coordinate.latitude,
      //         long: coordinate.longitude,
      //       };
      //     });
      //   })
      //   .catch((err: GeolocationPositionError) => {
      //     console.warn(`ERROR(${err.code}): ${err.message}`);
      //   });
    } else {
      console.warn('Browser does not support geolocation api');
    }
  }, []);

  return (
    <MainDiv>
      <BackgroundDiv />
      <div className="absolute top-24">{location.lat}</div>
      {/* <TestButton onClick={forTestButton}>asd</TestButton> */}
      <ContentDiv>
        {Object.entries(weatherData).length != 0 && <WeatherDashboard />}
      </ContentDiv>
    </MainDiv>
  );
}
