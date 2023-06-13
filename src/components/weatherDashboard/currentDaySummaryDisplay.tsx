import {
  currentDayDataType,
  selectedCurrentDayInformationType,
  weatherLocationType,
} from '@/pages/weather/weatherDataType';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { dashBoardElementBorderRadius } from './dashboard';
import { epochTimeToDateTime } from './weatherHandler';
import { McLaren, Playfair_Display } from 'next/font/google';
type PropType = {
  selectedDayData: selectedCurrentDayInformationType;
};

const playfairfont = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
});

const mcLarenFont = McLaren({
  subsets: ['latin'],
  weight: '400',
});
const weatherImageSize: number = 300;

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
  flex-direction: column;
  padding-top: ;
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
  padding-top: 2%;
  // background-color: rgb(5, 10, 48, 0.9);
  background-color: rgb(255, 255, 255, 0.6);
  border-top-right-radius: ${() => dashBoardElementBorderRadius};
  border-radius: ${() => dashBoardElementBorderRadius};
`;

const TemperatureDiv = styled.div`
  position: relative;
  font-size: 70px;
  margin-top: 15%;
  color: black;
  margin-left: auto;
  margin-right: auto;
  left: 3%;
  font-weight: bold;
`;

const WeatherDescriptionDiv = styled.div`
  position: relative;
  font-size: 20px;

  font-weight: bold;
`;

const LocationNameDiv = styled.div`
  font-size: 15px;
  position: relative;
  top: -2%;
  font-weight: bold;
  color: grey;
`;
const TimeDateDiv = styled.div`
  font-size: 25px;
  position: relative;
  font-weight: bold;
  color: black;
  top: 5%;
`;
export default function CurrentDaySummaryDisplay({
  selectedDayData,
}: PropType) {
  const imageUrl = selectedDayData.imageIconUrl;
  const cityName = selectedDayData.cityName;
  const countryName = selectedDayData.countryName;
  const weatherDescription = selectedDayData.weatherDescription;
  const currentTemperatureCelsius = selectedDayData.temperature_C;
  const currentTemperatureF = selectedDayData.temperature_F;
  const currentTimeEpoch = selectedDayData.epochTime;
  const { date, time } = epochTimeToDateTime(currentTimeEpoch);
  selectedDayData.conventionalTime = {
    date: date,
    time: time,
  };

  return (
    <MainDiv>
      <IconDiv>
        <WeatherDescriptionDiv className={mcLarenFont.className}>
          {weatherDescription}
        </WeatherDescriptionDiv>
        <Image
          src={'https:' + imageUrl}
          alt="Image"
          height={weatherImageSize}
          width={weatherImageSize}
        />
      </IconDiv>
      <ContentDiv>
        <TemperatureDiv className={mcLarenFont.className}>
          {currentTemperatureCelsius}&deg;C/{currentTemperatureF}&deg;F
        </TemperatureDiv>
        <LocationNameDiv className={mcLarenFont.className}>
          {cityName + ', ' + countryName}
        </LocationNameDiv>
        <TimeDateDiv className={mcLarenFont.className}>
          {date + ' ' + time}
        </TimeDateDiv>
      </ContentDiv>
    </MainDiv>
  );
}
