import styled, { keyframes } from 'styled-components';
import { dashBoardElementBorderRadius } from './dashboard';
import {
  forecastDayDataType,
  weatherHourlyDataType,
} from '@/pages/weather/weatherDataType';
import { epochTimeToDateTime, timeFilterHandler } from './weatherHandler';
import Image from 'next/image';
import { McLaren } from 'next/font/google';

type PropType = {
  hourlyDataArr: weatherHourlyDataType;
  currentTimeEpoch: number;
};

const weatherImageSize: number = 200;
const mcLarenFont = McLaren({
  subsets: ['latin'],
  weight: '400',
});
const MainDiv = styled.div`
  height: 50%;
  width: 100%;
  background-color: rgb(237, 228, 227, 0.5);
  display: flex;
  flex-direction: column;
  border-radius: ${() => dashBoardElementBorderRadius};
  padding: 1%;
`;

const DisplayDiv = styled.div`
  height: 100%;
  width: 180px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // // background-color: rgb(5, 10, 48, 0.9);
  // background-color: rgb(255, 255, 255, 0.6);
  border-top-right-radius: ${() => dashBoardElementBorderRadius};
  border-radius: ${() => dashBoardElementBorderRadius};
`;

const TemperatureDiv = styled.div`
  position: relative;
  font-size: 20px;

  color: black;
  margin-left: auto;
  margin-right: auto;
  left: 3%;
`;

const WeatherDescriptionDiv = styled.div`
  position: relative;
  font-size: 15px;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  top: 5px;
  text-align: center;
`;

const TimeDateDiv = styled.div`
  font-size: 25px;
  position: relative;
  color: black;
`;
const HeadingDiv = styled.h1`
  height: 5%;
  margin: 1%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  font-size: 25px;
`;

const ContentDiv = styled.div`
  height: 95%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  overflow-x: scroll;
  gap: 30px;
  border-radius: ${() => dashBoardElementBorderRadius};
`;
export default function HourlySummaryDisplay({
  hourlyDataArr,
  currentTimeEpoch,
}: PropType) {
  hourlyDataArr = timeFilterHandler(hourlyDataArr, currentTimeEpoch);
  return (
    <MainDiv className={mcLarenFont.className}>
      <HeadingDiv>Hourly's Forecast</HeadingDiv>
      <ContentDiv>
        {hourlyDataArr.map((hourlyData) => {
          const weatherDescription = hourlyData.condition.text;
          const imageUrl = hourlyData.condition.icon;
          const temperatureC = hourlyData.temp_c;
          const temperatureF = hourlyData.temp_f;
          const { time } = epochTimeToDateTime(hourlyData.time_epoch);
          return (
            <DisplayDiv>
              <TimeDateDiv>{time}</TimeDateDiv>
              <WeatherDescriptionDiv>
                {weatherDescription}
              </WeatherDescriptionDiv>
              <Image
                src={'https:' + imageUrl}
                alt="Image"
                height={weatherImageSize}
                width={weatherImageSize}
              />

              <TemperatureDiv>
                {temperatureC}&deg;C/{temperatureF}&deg;F
              </TemperatureDiv>
            </DisplayDiv>
          );
        })}
      </ContentDiv>
    </MainDiv>
  );
}
