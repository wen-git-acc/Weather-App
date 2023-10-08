import styled from 'styled-components';
import { dashBoardElementBorderRadius } from './dashboard';
import {
  dayFilterHandler,
  epochTimeToDateTime,
  sortedForecastDayDataType,
} from './weatherHandler';
import { McLaren } from 'next/font/google';
import Image from 'next/image';
import { WeatherContext } from '@/context/weatherContext/weatherContext';
import { useContext } from 'react';
import {
  currentDayDataType,
  weatherLocationType,
} from '@/pages/weather/weatherDataType';

type PropType = {
  forecastDayDataArr: sortedForecastDayDataType[];
  currentTimeEpoch: number;
  currentDayInformation: currentDayDataType;
  locationData: weatherLocationType;
};

const weatherImageSize = 150;
const mcLarenFont = McLaren({
  subsets: ['latin'],
  weight: '400',
});

const MainDiv = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(237, 228, 227, 0.5);
  display: flex;
  flex-direction: column;
  border-radius: ${() => dashBoardElementBorderRadius};
  padding: 1%;
`;

const DisplayDiv = styled.div`
  position: relative;
  height: 175px;
  width: 90%;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  // // background-color: rgb(5, 10, 48, 0.9);
  background-color: rgb(255, 255, 255, 0.6);
  border-top-right-radius: ${() => dashBoardElementBorderRadius};
  border-radius: ${() => dashBoardElementBorderRadius};
  &:hover {
    top: 5px;
    left: 5px;
    margin-bottom: 10px;
  }
`;

const TemperatureDiv = styled.div`
  position: relative;
  font-size: 20px;
  color: black;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  text-align: center;
`;

const WeatherDescriptionDiv = styled.div`
  position: relative;
  font-size: 15px;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  text-align: center;
  width: 100%;
`;

const TimeDateDiv = styled.div`
  font-size: 25px;
  position: relative;
  width: 100%;
  color: black;
  text-align: center;
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
  height: 95%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: relative;
  align-items: center;
  border-radius: ${() => dashBoardElementBorderRadius};
  gap: 20px;
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

const IconDiv = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
`;

const InnerDisplayDiv = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
`;

export default function DaySummaryDisplay({
  forecastDayDataArr,
  currentTimeEpoch,
  currentDayInformation,
  locationData,
}: PropType) {
  const { forWeatherData } = useContext(WeatherContext);
  const { setWeatherData } = forWeatherData;
  const { date } = epochTimeToDateTime(currentTimeEpoch);
  forecastDayDataArr = dayFilterHandler(forecastDayDataArr, date);
  return (
    <MainDiv className={mcLarenFont.className}>
      <HeadingDiv>Days Forecast</HeadingDiv>
      <ContentDiv>
        {forecastDayDataArr.map((forecastDayData, id) => {
          const weatherDescription = forecastDayData.condition.text;
          const imageUrl = forecastDayData.condition.icon;
          const temperatureC = forecastDayData.temperature_C;
          const temperatureF = forecastDayData.temperature_F;
          const forecastDate = forecastDayData.date;

          function selectionHandler(event: React.MouseEvent<HTMLDivElement>) {
            event.preventDefault();
            const { date } = epochTimeToDateTime(
              currentDayInformation.last_updated_epoch,
            );
            const todaysDate = date;
            const isToday = forecastDate === todaysDate;
            setWeatherData((prevWeatherData) => ({
              ...prevWeatherData,
              selectedCurrentDayInformation: {
                ...prevWeatherData.selectedCurrentDayInformation,
                imageIconUrl: isToday
                  ? currentDayInformation.condition.icon
                  : forecastDayData.condition.icon,
                weatherDescription: isToday
                  ? currentDayInformation.condition.text
                  : forecastDayData.condition.text,
                temperature_C: isToday
                  ? currentDayInformation.temp_c
                  : forecastDayData.temperature_C,
                temperature_F: isToday
                  ? currentDayInformation.temp_f
                  : forecastDayData.temperature_F,
                epochTime: isToday
                  ? locationData.localtime_epoch
                  : forecastDayData.timeEpoch,
              },
              isWeatherDataReceived: true,
            }));
          }

          return (
            <DisplayDiv key={id} onClick={selectionHandler}>
              <IconDiv>
                <Image
                  src={'https:' + imageUrl}
                  alt="Image"
                  height={weatherImageSize}
                  width={weatherImageSize}
                />
              </IconDiv>
              <InnerDisplayDiv>
                <TimeDateDiv>{forecastDate}</TimeDateDiv>
                <WeatherDescriptionDiv>
                  {weatherDescription}
                </WeatherDescriptionDiv>
                <TemperatureDiv>
                  {temperatureC}&deg;C/{temperatureF}&deg;F
                </TemperatureDiv>
              </InnerDisplayDiv>
            </DisplayDiv>
          );
        })}
      </ContentDiv>
    </MainDiv>
  );
}
