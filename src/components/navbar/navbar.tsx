import NavbarLogo from './navbarlogo';
import styled from 'styled-components';

const LogoDiv = styled.div`
  height: 100%;
  width: 5%;
  margin: 0px;
  padding: 10px;
  display: inline-block
  padding: 10px;
  text-align: center;
  justify-content: center;
  cursor: crosshair;
  background-color: blue;
`;

const ParentDiv = styled.div`
  background-color: white;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px;
`;

const ListDiv = styled.div`
  text-align: center;
  justify-content: center;
  align-item: center;
`;

export default function Navbar() {
  return (
    <nav>
      <ParentDiv>
        <LogoDiv>
          <NavbarLogo />
        </LogoDiv>
        <ListDiv>
          <ul>
            <li>hi</li>
            <li>as</li>
          </ul>
          <div>to dispaly menu</div>
        </ListDiv>
      </ParentDiv>
    </nav>
  );
}
