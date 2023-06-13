import styled from 'styled-components';
import { SearchBar } from './searchBar';
import { useContext } from 'react';
import { WeatherContext } from '@/context/weatherContext/weatherContext';
import CurrentDaySummaryDisplay from './currentDaySummaryDisplay';
import HourlySummaryDisplay from './hourlySummaryDisplay';
import DaySummaryDisplay from './daySummaryDisplay';
import {
  currentDayDataType,
  forecastDayDataType,
  weatherLocationType,
} from '@/pages/weather/weatherDataType';
import { epochTimeToDateTime, weatherDataSorting } from './weatherHandler';
const positionOfDashboardFromTop: string = '20vh';

export const dashBoardElementBorderRadius: string = '30px';
const currentDaySection: string = '70%';

const DashBoardDiv = styled.div`
  top: ${positionOfDashboardFromTop};
  margin: 10px;
  padding: 10px;
  height: 1000px;
  min-width: 1500px;
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

  const selectedWeatherData = weatherData.selectedCurrentDayInformation;
  const forecastData: forecastDayDataType = weatherData.forecastDayInformation;
  const currentTimeEpoch: number =
    weatherData.selectedCurrentDayInformation.epochTime;
  const sortedWeatherData = weatherDataSorting(
    selectedWeatherData,
    forecastData,
  );

  return (
    <DashBoardDiv>
      <SearchBar />
      {weatherData.isWeatherDataReceived && (
        <ContentSectionDiv>
          <CurrentDaySectionDiv>
            <CurrentDaySummaryDisplay selectedDayData={selectedWeatherData} />
            <HourlySummaryDisplay
              hourlyDataArr={sortedWeatherData.forecastHourlyDataArr}
              currentTimeEpoch={currentTimeEpoch}
            />
          </CurrentDaySectionDiv>
          <ForecastDaySectionDiv>
            <DaySummaryDisplay
              forecastDayDataArr={sortedWeatherData.forecastDayDataArr}
              currentTimeEpoch={currentTimeEpoch}
              currentDayInformation={weatherData.currentDayInformation}
              locationData={weatherData.locationInformation}
            />
          </ForecastDaySectionDiv>
        </ContentSectionDiv>
      )}
    </DashBoardDiv>
  );
}
