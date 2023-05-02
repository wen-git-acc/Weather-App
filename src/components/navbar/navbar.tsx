import { menuList } from './navbarMenuConfig';
import NavbarLogo from './navbarlogo';
import Navlink from './navlink';
import styled from 'styled-components';

const LogoDiv = styled.div`
  height: 100%;
  width: 64px;
  margin: 0px;
  padding: 10px;
  display: inline-block;
  position: relative;
  padding: 10px;
  text-align: center;
  justify-content: center;
  cursor: crosshair;
  background-color: blue;
`;

const ParentDiv = styled.div`
  background-color: white;
  height: 64px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px;
`;

const ListDiv = styled.div`
  height: 100%;
  text-align: center;
  justify-content: center;
  align-item: center;
`;

const RightDiv = styled.div`
  height: 100%;
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
          <Navlink menu={menuList} />
        </ListDiv>
        <RightDiv></RightDiv>
      </ParentDiv>
    </nav>
  );
}
