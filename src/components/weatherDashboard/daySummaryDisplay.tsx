import styled from 'styled-components';
import { dashBoardElementBorderRadius } from './dashboard';

const MainDiv = styled.div`
  height: 100%;
  weight: 100%;
  background-color: rgb(237, 228, 227, 0.5);
  border-radius: ${() => dashBoardElementBorderRadius};
`;

export default function DaySummaryDisplay() {
  return <MainDiv></MainDiv>;
}
