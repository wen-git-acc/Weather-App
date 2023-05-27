import styled from 'styled-components';
import { dashBoardElementBorderRadius } from './dashboard';

const SearcBarDiv = styled.div`
  background-color: grey;
  opacity: 0.5;
  height: 5%;
  width: 100%;
  border-radius: ${() => dashBoardElementBorderRadius};
`;

export function SearchBar() {
  return <SearcBarDiv></SearcBarDiv>;
}
