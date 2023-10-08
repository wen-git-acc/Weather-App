import { selectedCurrentDayInformationType } from '@/helper/weatherDataType';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { dashBoardElementBorderRadius } from './dashboard';
import { epochTimeToDateTime } from './weatherHandler';
import { McLaren } from 'next/font/google';
type PropType = {
  selectedDayData: selectedCurrentDayInformationType;
};

const mcLarenFont = McLaren({
  subsets: ['latin'],
  weight: '400',
});
const weatherImageSize = 300;

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
  align-items: center;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
const IconDiv = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-top: 15%;
  width: 50%;
  position: relative;
  align-items: center;
  animation: ${IconAnimation} 4s linear infinite;
  @media (max-width: 640px) {
    width: 95%;
    height: 45%;
  }
`;

const ContentDiv = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2%;
  background-color: rgb(255, 255, 255, 0.6);
  border-top-right-radius: ${() => dashBoardElementBorderRadius};
  border-radius: ${() => dashBoardElementBorderRadius};
  @media (max-width: 640px) {
    width: 95%;
    height: 50%;
    background-color: transparent;
  }
`;

const WeatherDescriptionDiv = styled.div`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  heigth: 10%;
  @media (max-width: 640px) {
    font-size: 15px;
  }
`;
const TemperatureDiv = styled.div`
  position: relative;
  font-size: 30px;
  color: black;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  @media (max-width: 1200px) and (min-width: 640px) {
    font-size: 30px;
  }
  @media (max-width: 640px) {
    font-size: 20px;
    left: 0%;
    top: 0%;
  }
`;

const LocationNameDiv = styled.div`
  font-size: 15px;
  position: relative;
  top: -2%;
  font-weight: bold;
  color: grey;
  @media (max-width: 640px) {
    top: 0%;
  }
`;
const TimeDateDiv = styled.div`
  font-size: 25px;
  position: relative;
  font-weight: bold;
  color: black;
  @media (max-width: 640px) {
    font-size: 20px;
    margin-top: 0%;
    top: 0%;
  }
`;

const WeatherIconDiv = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  @media (max-width: 640px) {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 30%;
  }
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
        <WeatherIconDiv>
          <Image src={'https:' + imageUrl} alt="Image" fill object-fit />
        </WeatherIconDiv>
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
