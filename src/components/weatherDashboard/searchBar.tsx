import styled from 'styled-components';
import { dashBoardElementBorderRadius } from './dashboard';
import { useContext, useEffect, useRef, useState } from 'react';
import { WeatherContext } from '@/context/weatherContext/weatherContext';
import {
  keyEventObjType,
  keyEventType,
  sortedCitiesCountriesDataType,
} from '@/helper/typeConfig';
import { locationSearchRequest } from '@/HttpClient/apicall';

const SearcBarDiv = styled.div`
  height: 5%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  justify-content: center;
  z-index: 1;
  border-radius: ${() => dashBoardElementBorderRadius};
`;

const SearchInputDiv = styled.div`
  height: 100%;

  padding-left: 20px;
  text-align: center;
`;

const SearchInput = styled.input`
  outline: none;
  height: 100%;
  width: 200px;
  position: relative;
  background-color: white;
  padding-left: 20px;
  border-radius: ${() => dashBoardElementBorderRadius};
  transition: width 0.5s linear;
  @media (min-width: 640px) {
    &:focus {
      width: 500px;
    }
  }
`;

const AutoSuggestionDiv = styled.div`
  position: relative;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.9);
  border-radius: 15px;
`;

type searchResultDivProp = {
  isHighlight: boolean;
};
const SearchResultDiv = styled.div<searchResultDivProp>`
  position: relative;
  padding: 10px;
  width: 90%;
  background-color: ${(props) => (props.isHighlight ? 'grey' : '')};
  margin: 5px;
  border-radius: 10px;
  &:hover {
    background-color: grey;
  }
`;

const keyEventObj: keyEventObjType = {
  Up: 'ArrowUp',
  Down: 'ArrowDown',
  Enter: 'Enter',
};

type handleOnClickType = {
  e: React.MouseEvent<HTMLElement>;
  lat: number;
  long: number;
  name: string;
};
export function SearchBar() {
  const { forSetWeatherDataNewLocation } = useContext(WeatherContext);
  const { setNewWeatherData } = forSetWeatherDataNewLocation;
  const [search, setSearch] = useState<string>('');
  const [filteredCitiesCountriesData, setFilteredData] = useState<
    sortedCitiesCountriesDataType[]
  >([] as sortedCitiesCountriesDataType[]);
  const [upDownKeyboardActionIndex, setUpDownKeyboardActionIndex] =
    useState<number>(-1);
  const isUpdateFilter = useRef(false);
  function handleTypingChange(e: React.ChangeEvent<HTMLInputElement>) {
    // const filteredData = citiesCountriesData
    //   .filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
    //   .slice(0, returnArraySize);

    // if (e.target.value) {
    //   setFilteredData([...filteredData]);
    // } else {
    //   setFilteredData([]);
    // }
    isUpdateFilter.current = true;
    setSearch(e.target.value);
  }

  useEffect(() => {
    async function getLocationDetail() {
      if (search && isUpdateFilter.current) {
        const locationDataArr = await locationSearchRequest(search);

        setFilteredData(
          locationDataArr.map((data) => {
            const name: string =
              typeof data.name !== 'undefined' ? data.name + ', ' : '';
            const state: string =
              typeof data.state !== 'undefined' ? data.state + ', ' : '';
            const country: string =
              typeof data.country !== 'undefined' ? data.country : '';
            return {
              country: data.country,
              lat: data.lat,
              long: data.lng,
              name: name + state + country,
              state: data.state,
            };
          }),
        );
      }
      if (!search) {
        setFilteredData([]);
      }
    }
    const userTypingTimeoutID = setTimeout(() => {
      getLocationDetail();
    }, 500);
    return () => clearTimeout(userTypingTimeoutID);
  }, [search]);

  function handleOnBlurEvent() {
    isUpdateFilter.current = false;
    setFilteredData([]);
    setUpDownKeyboardActionIndex(-1);
  }

  function handleOnKeyDownEvent(e: React.KeyboardEvent<HTMLInputElement>) {
    isUpdateFilter.current = false;
    const eventTriggered = e.key as keyEventType;
    if (
      keyEventObj.Up === eventTriggered &&
      upDownKeyboardActionIndex - 1 >= 0
    ) {
      setUpDownKeyboardActionIndex((prevIndex) => --prevIndex);
      let currentIndex = upDownKeyboardActionIndex;
      const newIndex = --currentIndex;
      const newSearchValue = filteredCitiesCountriesData[newIndex].name;
      setSearch(newSearchValue);
    }
    if (
      keyEventObj.Down === eventTriggered &&
      filteredCitiesCountriesData.length > 0 &&
      upDownKeyboardActionIndex < filteredCitiesCountriesData.length - 1
    ) {
      setUpDownKeyboardActionIndex((prevIndex) => ++prevIndex);
      let currentIndex = upDownKeyboardActionIndex;
      const newIndex = ++currentIndex;
      const newSearchValue = filteredCitiesCountriesData[newIndex].name;
      setSearch(newSearchValue);
    }
    if (
      keyEventObj.Enter === eventTriggered &&
      filteredCitiesCountriesData.length > 0
    ) {
      if (upDownKeyboardActionIndex === -1) {
        const newSearchVaLue = filteredCitiesCountriesData[0].name;
        const latValue = filteredCitiesCountriesData[0].lat;
        const longValue = filteredCitiesCountriesData[0].long;
        setNewWeatherData(latValue, longValue);
        setSearch(newSearchVaLue);
        setFilteredData([]);
        setUpDownKeyboardActionIndex(-1);
      } else {
        const newSearchValue =
          filteredCitiesCountriesData[upDownKeyboardActionIndex].name;
        const latValue =
          filteredCitiesCountriesData[upDownKeyboardActionIndex].lat;
        const longValue =
          filteredCitiesCountriesData[upDownKeyboardActionIndex].long;
        setNewWeatherData(latValue, longValue);
        setSearch(newSearchValue);
        setFilteredData([]);
        setUpDownKeyboardActionIndex(-1);
      }
    }
  }

  function handleOnClickEvent({ e, lat, long, name }: handleOnClickType) {
    e.preventDefault();
    isUpdateFilter.current = false;
    setNewWeatherData(lat, long);
    setSearch(name);
    setFilteredData([]);
    setUpDownKeyboardActionIndex(-1);
  }

  return (
    <SearcBarDiv>
      <SearchInputDiv>
        <SearchInput
          type="text"
          autoComplete="off"
          placeholder="Search your city..."
          onChange={handleTypingChange}
          value={search}
          onBlur={handleOnBlurEvent}
          onKeyDown={handleOnKeyDownEvent}
        />
      </SearchInputDiv>
      <AutoSuggestionDiv>
        {filteredCitiesCountriesData.map((data, index) => {
          let boxHighlight = false;
          if (index === upDownKeyboardActionIndex) {
            boxHighlight = !boxHighlight;
          }

          const onClickEventData = {
            lat: data.lat,
            long: data.long,
            name: data.name,
          };
          return (
            <SearchResultDiv
              key={index}
              isHighlight={boxHighlight}
              onMouseDown={(e) =>
                handleOnClickEvent({ e, ...onClickEventData })
              }
            >
              {data.name}
            </SearchResultDiv>
          );
        })}
      </AutoSuggestionDiv>
    </SearcBarDiv>
  );
}
