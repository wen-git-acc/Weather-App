import { favouritesSubMenu } from './navbarMenuConfig';
import styled from 'styled-components';
import { ListDiv } from './menu';
import Link from 'next/link';
type submenuType = typeof favouritesSubMenu;

type PropsType = {
  submenu: submenuType;
};

export const SubmenuParentDiv = styled.div`
  opacity: 0;
  visibility: hidden;
  transition: max-height 0.1s linear, opacity 0.2s ease-in-out;

  ${() => ListDiv}:hover & {
    visibility: visible;
    opacity: 1;
  }
  @media (max-width: 640px) {
    max-height: 0;

    ${() => ListDiv}:hover & {
      max-height: 1000px;
    }
  }
`;

// example if want hover based on parent component
// ${()=> ListLi}:hover &{

// }

export const SubmenuPointerToMain = styled.div`
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s ease-in-out;
  ${() => ListDiv}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const SubmenuItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;
const MobileSubMenuPartition = styled.div`
  display: none;
  height: 5px;
  width: 400px;
  margin: auto;
  background-color: white;

  @media (max-width: 640px) {
    display: block;
  }
`;

const SubMenuList = styled.div`
  background-color: white;
  top: 80px;
  gap: 24px;
  padding: 8px;
  border-radius: 0.375rem;
  width: 100%;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  width: 31rem;
  float: left;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 640px) {
    flex-direction: column;
    float: none;
    position: static;
    background-color: transparent;
    left: 0%;
    gap: 0;
    transform: translateX(0%);
  }
`;
const Heading = styled.h1``;
export default function Submenu({ submenu }: PropsType) {
  return (
    <SubmenuParentDiv>
      {/* <div className="absolute left-1/2 -translate-x-1/2 w-28 items-center hidden sm:block">
        <SubmenuPointerToMain />
      </div> */}
      {/* <div className="sm:fixed sm:flex sm:flex-wrap top-20 gap-6 p-2 rounded-md w-full sm:w-[31rem] sm:float-left sm:-translate-x-1/2 sm:left-1/2 sm:bg-white"> */}
      <SubMenuList>
        {/* <div className="sm:hidden h-1 w-80 m-auto bg-white"></div> */}
        <MobileSubMenuPartition />
        {submenu.map((item, index) => {
          return (
            <SubmenuItem key={index}>
              <Heading>
                <b>
                  <u>{item.headerName}</u>
                </b>
              </Heading>
              {item.submenuList.map((item, index) => {
                return (
                  <Link
                    href={item.link}
                    className="hover:bg-slate-200 rounded-md p-1 "
                    key={index}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </SubmenuItem>
          );
        })}
      </SubMenuList>
      {/* </div> */}
    </SubmenuParentDiv>
  );
}
