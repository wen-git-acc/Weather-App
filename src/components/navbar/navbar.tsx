import { menuList } from './navbarMenuConfig';
import NavbarLogo from './navbarlogo';
import Menu from './menu';
import styled from 'styled-components';
import { useState } from 'react';
import { MobileListDivProps } from './navbarTypeConfig';
import HamburgerButton from './hamburgerButton';

const LogoDiv = styled.div`
  height: 54px;
  width: 64px;
  margin: 0px;
  padding: 10px;
  display: inline-block;
  position: relative;
  padding: 10px;
  left: 10px;
  top: 5px;
  text-align: center;
  justify-content: center;
  cursor: crosshair;
  background-color: transperant;
  z-index: 50;
`;

const ListDiv = styled.div`
  height: 64px;
  text-align: center;
  justify-content: center;
  align-item: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  background-color: white;
  @media (max-width: 640px) {
    height: 100%;
    width: 100%;
    top: 64px;
    display: none;
  }
`;

const MenuIconDiv = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
    width: 64px;
  }
`;

const MobileListDiv = styled.div<MobileListDivProps>`
  text-align: center;
  justify-content: center;
  align-item: center;
  position: absolute;
  z-index: 50;
  transition: transform 0.5s linear;
  display: none;
  transform: ${(props) =>
    props.isMenuTriggered ? 'translateX(0vw)' : 'translateX(-150vw)'};

  background-color: white;
  @media (max-width: 640px) {
    display: block;
    height: 1000px;
    width: 100%;
    top: 64px;
  }
`;

const NavBar = styled.nav`
  position: fixed;
  background-color: white;
  height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px;
  z-index: 50;
  @media (max-width: 640px) {
    justify-content: space-between;
  }
`;

// left: ${(props) => (props.isMenuTriggered ? '50%' : '-100%')};
export default function Navbar() {
  const [isMenuTrigger, setMenuTrigger] = useState<boolean>(false);

  function menuTriggerClick(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    setMenuTrigger((prev) => !prev);
  }
  return (
    <NavBar>
      <LogoDiv>
        <NavbarLogo />
      </LogoDiv>
      <ListDiv>
        <Menu menu={menuList} />
      </ListDiv>
      <MobileListDiv isMenuTriggered={isMenuTrigger}>
        <Menu menu={menuList} />
      </MobileListDiv>
      <MenuIconDiv onClick={menuTriggerClick}>
        <HamburgerButton isMenuTrigger={isMenuTrigger} />
      </MenuIconDiv>
    </NavBar>
  );
}
