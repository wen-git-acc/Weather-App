import styled from 'styled-components';
import { MobileListDivProps } from './navbarTypeConfig';
const HamBurger = styled.button`
  position: absolute;
  top: 3em;
  right: 20%;
  margin-left: -2em;
  margin-top: -45px;
  width: 2em;
  height: 45px;

  div {
    position: relative;
    width: 3em;
    height: 7px;
    border-radius: 3px;
    background-color: #94a3b8;
    margin-top: 8px;
    transition: all 0.3s ease-in-out;
  }
`;
const TopBun = styled.div<MobileListDivProps>`
  transform: ${(props) =>
    props.isMenuTriggered ? 'rotate(-45deg)' : 'rotate(0deg)'};
  top: ${(props) => (props.isMenuTriggered ? '20px' : '0px')};
`;
const Meat = styled.div<MobileListDivProps>`
  transform: ${(props) =>
    props.isMenuTriggered ? 'rotate(45deg)' : 'rotate(0deg)'};
  opacity: ${(props) => (props.isMenuTriggered ? '0' : '1')};
`;
const BottomBun = styled.div<MobileListDivProps>`
  transform: ${(props) =>
    props.isMenuTriggered ? 'rotate(45deg)' : 'rotate(0deg)'};
  bottom: ${(props) => (props.isMenuTriggered ? '9px' : '0px')};
`;

type HamBurgerButtonProps = {
  isMenuTrigger: boolean;
};

export default function HamburgerButton({
  isMenuTrigger,
}: HamBurgerButtonProps) {
  return (
    <HamBurger>
      <TopBun isMenuTriggered={isMenuTrigger} />
      <Meat isMenuTriggered={isMenuTrigger} />
      <BottomBun isMenuTriggered={isMenuTrigger} />
    </HamBurger>
  );
}
