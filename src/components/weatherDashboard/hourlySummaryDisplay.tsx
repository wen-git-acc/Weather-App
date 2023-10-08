import styled from 'styled-components';
import { dashBoardElementBorderRadius } from './dashboard';
import { weatherHourlyDataType } from '@/pages/weather/weatherDataType';
import { epochTimeToDateTime, timeFilterHandler } from './weatherHandler';
import Image from 'next/image';
import { McLaren } from 'next/font/google';

type PropType = {
  hourlyDataArr: weatherHourlyDataType;
  currentTimeEpoch: number;
};

const weatherImageSize = 200;
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
  width: 90%;
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // // background-color: rgb(5, 10, 48, 0.9);
  // background-color: rgb(255, 255, 255, 0.6);
  border-top-right-radius: ${() => dashBoardElementBorderRadius};
  border-radius: ${() => dashBoardElementBorderRadius};
  @media (max-width: 640px) {
    background-color: rgb(255, 255, 255, 0.6);
    flex-shrink: 1;
  }
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
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const ContentDiv = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  overflow-x: scroll;
  align-items: center;
  gap: 30px;
  border-radius: ${() => dashBoardElementBorderRadius};
  &::-webkit-scrollbar {
    height: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ede4e3;
    border-radius: 5px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    overflow-x: hidden;
  }
`;
export default function HourlySummaryDisplay({
  hourlyDataArr,
  currentTimeEpoch,
}: PropType) {
  hourlyDataArr = timeFilterHandler(hourlyDataArr, currentTimeEpoch);
  return (
    <MainDiv className={mcLarenFont.className}>
      <HeadingDiv>Hourly&apos;s Forecast</HeadingDiv>
      <ContentDiv>
        {hourlyDataArr.map((hourlyData, id) => {
          const weatherDescription = hourlyData.condition.text;
          const imageUrl = hourlyData.condition.icon;
          const temperatureC = hourlyData.temp_c;
          const temperatureF = hourlyData.temp_f;
          const { time } = epochTimeToDateTime(hourlyData.time_epoch);
          return (
            <DisplayDiv key={id}>
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
