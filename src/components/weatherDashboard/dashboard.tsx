import styled from 'styled-components';
import { SearchBar } from './searchBar';
import { useContext } from 'react';
import { WeatherContext } from '@/context/weatherContext/weatherContext';
import CurrentDaySummaryDisplay from './currentDaySummaryDisplay';
import HourlySummaryDisplay from './hourlySummaryDisplay';
import DaySummaryDisplay from './daySummaryDisplay';
import { forecastDayDataType } from '@/helper/weatherDataType';
import { weatherDataSorting } from './weatherHandler';
const positionOfDashboardFromTop = '20vh';

export const dashBoardElementBorderRadius = '30px';
const currentDaySection = '70%';

const DashBoardDiv = styled.div`
  top: ${positionOfDashboardFromTop};
  margin: 10px;
  padding: 10px;
  height: 1200px;
  min-width: 350px;
  width: 1500px;

  border-radius: ${dashBoardElementBorderRadius};
  position: relative;
  @media (max-width: 640px) {
    background-color: transparent;
  }
`;

const ContentSectionDiv = styled.div`
  padding: 5px;
  position: relative;
  top: 1%;
  height: 94%;
  width: 100%;
  border-radius: ${dashBoardElementBorderRadius};
  display: flex;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const CurrentDaySectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: ${currentDaySection};
  gap: 1%;
  padding: 1%;
  @media (max-width: 640px) {
    width: 100%;
  }
`;
const ForecastDaySectionDiv = styled.div`
  height: 100%;
  width: calc(100% - ${currentDaySection});
  padding: 1%;
  @media (max-width: 640px) {
    width: 100%;
  }
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
