import { useContext, useEffect, useState } from 'react';
import {
  locationType,
  sortedCitiesCountriesDataType,
  citiesCountriesDataType,
} from './typeConfig';
import { getUserLocation, locationExcelReader } from './locationHandler';
import styled from 'styled-components';
import skycloud from './picture/skycloud.gif';
import { WeatherDashboard } from '@/components/weatherDashboard/dashboard';
import { initialWeatherDataType, weatherForecastData } from './weatherDataType';
import { WeatherContext } from '@/context/weatherContext/weatherContext';
import axios from 'axios';
import { comment } from 'postcss';
import * as XLSX from 'xlsx';
import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import path from 'path';

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

const citiesCountriesExcelFilePath = './countriesandcities.xlsx';
export const getStaticProps: GetStaticProps<{
  countriesCitiesDataArr: citiesCountriesDataType;
}> = async () => {
  const dir = 'countriesandcities.xlsx';
  const dirCom = path.resolve('./public');

  const absolute = path.join(dirCom, 'countriesandcities.xlsx');
  const res = XLSX.readFile(absolute);
  const wsName = res.SheetNames[0];
  const ws = res.Sheets[wsName];
  const data: citiesCountriesDataType = XLSX.utils.sheet_to_json(
    ws,
  ) as citiesCountriesDataType;

  // console.log(res);

  let countriesCitiesDataArr = data.map((info) => {
    let newObject = {
      country: info.country,
      city: info.city,
      lat: info.lat,
      lng: info.lng,
    };
    return newObject;
  });

  countriesCitiesDataArr = [
    {
      country: 'asdsa',
      city: 'asd',
      lat: 12,
      lng: 12,
    },
  ];

  return { props: { countriesCitiesDataArr } };
};

export default function WeatherHome({
  countriesCitiesDataArr,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  console.log(countriesCitiesDataArr);
  const weatherApiUrl: string = process.env
    .NEXT_PUBLIC_WEATHER_API_URL as string;

  // const [location, setLocation] = useState<locationType>({
  //   lat: 0,
  //   long: 0,
  // });
  // const [weatherData, setWeatherData] = useState({} as weatherDataType);

  const { forLocation, forWeatherData, forCityCountryData } =
    useContext(WeatherContext);
  const { location, setLocation } = forLocation;
  const { weatherData, setWeatherData } = forWeatherData;
  const { setCitiesCountriesData } = forCityCountryData;
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
    async function weatherDataInitialization() {
      try {
        const citiesCountriesDataArr = await locationExcelReader(
          citiesCountriesExcelFilePath,
        );
        const position: GeolocationPosition = await getUserLocation();
        const coordinate: GeolocationCoordinates = position.coords;
        //TODO: pass coordinate to weather api to get weather data, for now use dummy data
        setLocation((prevLocation) => ({
          ...prevLocation,
          lat: coordinate.latitude,
          long: coordinate.longitude,
        }));
        setCitiesCountriesData((prevData) => [
          ...prevData,
          ...citiesCountriesDataArr,
        ]);

        // const res = await axios.get(
        //   `${weatherApiUrl}&q=${coordinate.latitude},${coordinate.longitude}`,
        // );
        // const weatherDataReceived = res.data as initialWeatherDataType;

        const weatherDataReceived =
          weatherForecastData as initialWeatherDataType;

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
        if (error instanceof Error) message = error.message;
        else message = String(error);
      }
    }

    if (navigator.geolocation) {
      weatherDataInitialization();
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
        {weatherData.isWeatherDataReceived && <WeatherDashboard />}
      </ContentDiv>
    </MainDiv>
  );
}
