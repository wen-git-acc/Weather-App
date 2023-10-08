import {
  forecastDayDataType,
  selectedCurrentDayInformationType,
  weatherHourlyDataType,
} from '@/helper/weatherDataType';

export function epochTimeToDateTime(epochTime: number): {
  date: string;
  time: string;
} {
  const dateObject: Date = new Date(0);
  dateObject.setUTCSeconds(epochTime);

  const date = dateObject.toLocaleDateString('sv-SE');
  const time = dateObject.toLocaleTimeString();
  const getMeridiem = time.split(' ').pop();
  const getTimeValue = time.split(':').slice(0, 2).join(':');
  const modifiedTime = [getTimeValue, getMeridiem].join(' ');

  return {
    date: date,
    time: modifiedTime,
  };
}

export type sortedForecastDayDataType = {
  date: string;
  temperature_C: number;
  temperature_F: number;
  timeEpoch: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  selectedDate: string;
};

export function weatherDataSorting(
  selectedWeatherData: selectedCurrentDayInformationType,
  forecastData: forecastDayDataType,
): {
  forecastDayDataArr: sortedForecastDayDataType[];
  forecastHourlyDataArr: weatherHourlyDataType;
} {
  const selectedTimeEpoch = selectedWeatherData.epochTime;
  const selectedDateTime = epochTimeToDateTime(selectedTimeEpoch);

  let sortedForecastHourlyData = [] as weatherHourlyDataType;

  const sortedForecastDayData: sortedForecastDayDataType[] =
    forecastData.forecastday.map((individualDay) => {
      const date = individualDay.date;
      const temperature_C = individualDay.day.maxtemp_c;
      const temperature_F = individualDay.day.maxtemp_f;
      const timeEpoch = individualDay.date_epoch;
      const condition = individualDay.day.condition;

      if (date == selectedDateTime.date) {
        sortedForecastHourlyData = [...individualDay.hour];
      }

      return {
        date: date,
        temperature_C: temperature_C,
        temperature_F: temperature_F,
        timeEpoch: timeEpoch,
        condition: condition,
        selectedDate: selectedDateTime.date,
      };
    });

  return {
    forecastDayDataArr: sortedForecastDayData,
    forecastHourlyDataArr: sortedForecastHourlyData,
  };
}

export function timeFilterHandler(
  dataArr: weatherHourlyDataType,
  currentTimeEpoch: number,
): weatherHourlyDataType {
  return dataArr.filter((data) => data.time_epoch > currentTimeEpoch);
}
export function dayFilterHandler(
  dataArr: sortedForecastDayDataType[],
  currentDate: string,
): sortedForecastDayDataType[] {
  return dataArr.filter((data) => data.date !== currentDate);
}
