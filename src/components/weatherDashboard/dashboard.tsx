import styled from 'styled-components';
import { SearchBar } from './searchBar';
import { useContext } from 'react';
import { WeatherContext } from '@/context/weatherContext/weatherContext';
import CurrentDaySummaryDisplay from './currentDaySummaryDisplay';
import HourlySummaryDisplay from './hourlySummaryDisplay';
import DaySummaryDisplay from './daySummaryDisplay';
import {
  currentDayDataType,
  weatherLocationType,
} from '@/pages/weather/weatherDataType';
const positionOfDashboardFromTop: string = '20vh';

export const dashBoardElementBorderRadius: string = '30px';
const currentDaySection: string = '70%';

const DashBoardDiv = styled.div`
  top: ${positionOfDashboardFromTop};
  margin: 10px;
  padding: 10px;
  min-height: 1000px;
  min-width: 1000px;
  width: 1500px;
  background-color: rgb(255, 255, 255, 0.5);
  border-radius: ${dashBoardElementBorderRadius};
  position: relative;
`;

const ContentSectionDiv = styled.div`
  padding: 5px;
  position: relative;
  top: 1%;
  height: 94%;
  weight: 100%;
  border-radius: ${dashBoardElementBorderRadius};
  display: flex;
`;

const CurrentDaySectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: ${currentDaySection};
  gap: 1%;
  padding: 1%;
`;
const ForecastDaySectionDiv = styled.div`
  height: 100%;
  width: calc(100% - ${currentDaySection});
  padding: 1%;
`;

export function WeatherDashboard() {
  const { forWeatherData } = useContext(WeatherContext);
  const { weatherData } = forWeatherData;

  const weatherLocation: weatherLocationType = weatherData.location;
  const currentDayData: currentDayDataType = weatherData.current;
  const currentDayTime: number = currentDayData.last_updated_epoch;

  return (
    <DashBoardDiv>
      <SearchBar />
      {Object.entries(weatherData).length != 0 && (
        <ContentSectionDiv>
          <CurrentDaySectionDiv>
            <CurrentDaySummaryDisplay
              currentDayData={currentDayData}
              weatherLocation={weatherLocation}
            />
            <HourlySummaryDisplay />
          </CurrentDaySectionDiv>
          <ForecastDaySectionDiv>
            <DaySummaryDisplay />
          </ForecastDaySectionDiv>
        </ContentSectionDiv>
      )}
    </DashBoardDiv>
  );
}
