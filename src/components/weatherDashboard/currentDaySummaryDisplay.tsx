import {
  currentDayDataType,
  weatherLocationType,
} from '@/pages/weather/weatherDataType';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { dashBoardElementBorderRadius } from './dashboard';
import { epochTimeToDateTime } from './weatherHandler';
type PropType = {
  currentDayData: currentDayDataType;
  weatherLocation: weatherLocationType;
};

const weatherImageSize: number = 400;

const IconAnimation = keyframes`
0% {
  transform: scale(1.0) ; 
}
25% {
  transform: scale(1.05) ;
}
50% {
  transform: scale(0.95) ;
}
75% {
  transform: scale(1.05) ;
}
100%{
  transform: scale(1.0) ;
}
`;
const MainDiv = styled.div`
  height: 50%;
  width: 100%;
  background-color: rgb(237, 228, 227, 0.5);
  border-radius: ${() => dashBoardElementBorderRadius};
  display: flex;
`;
const IconDiv = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
  animation: ${IconAnimation} 4s linear infinite;
`;

const ContentDiv = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TemperatureDiv = styled.div`
  position: relative;
  font-size: 100px;
  top: 5%;
  color: #dcd9cd;
`;

const WeatherDescriptionDiv = styled.div`
  font-size: 20px;
`;

const LocationNameDiv = styled.div`
  font-size: 25px;
  position: relative;
  top: 5%;
`;
const TimeDateDiv = styled.div`
  font-size: 30px;
  position: relative;
  top: 10%;
`;
export default function CurrentDaySummaryDisplay({
  currentDayData,
  weatherLocation,
}: PropType) {
  console.log(currentDayData);
  const imageTestingUrl = currentDayData.condition.icon;
  console.log(imageTestingUrl);
  const cityName = weatherLocation.name;
  const countryName = weatherLocation.country;
  const weatherDescription = currentDayData.condition.text;
  const currentTemperatureCelsius = currentDayData.temp_c;
  const currentTimeEpoch = currentDayData.last_updated_epoch;
  const conventionalTime = epochTimeToDateTime(currentTimeEpoch);
  const currentDate = conventionalTime.date;
  const currentTime = conventionalTime.time;

  return (
    <MainDiv>
      <IconDiv>
        <Image
          src={'https:' + imageTestingUrl}
          alt="Image"
          height={weatherImageSize}
          width={weatherImageSize}
        />
      </IconDiv>
      <ContentDiv>
        <TemperatureDiv>{currentTemperatureCelsius}&deg;</TemperatureDiv>
        <WeatherDescriptionDiv>{weatherDescription}</WeatherDescriptionDiv>
        <LocationNameDiv>{cityName + ', ' + countryName}</LocationNameDiv>
        <TimeDateDiv>{currentDate + ' ' + currentTime}</TimeDateDiv>
      </ContentDiv>
    </MainDiv>
  );
}
