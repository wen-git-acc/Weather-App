import { favouritesSubMenu } from './navbarMenuConfig';
import styled from 'styled-components';
import { ListLi } from './menu';
import Link from 'next/link';
type submenuType = typeof favouritesSubMenu;

type PropsType = {
  submenu: submenuType;
};

const SubmenuParentDiv = styled.div`
  ${() => ListLi}:hover & {
    opacity: 1;
    visibility: visible;
  }
  opacity: 0;
  display: hiddem;
  transition: opacity 0.6s ease-in-out;
`;

const SubmenuPointerToMain = styled.div`
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
`;

const SubmenuItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const Heading = styled.h1``;
export default function Submenu({ submenu }: PropsType) {
  return (
    <SubmenuParentDiv>
      <div className="absolute left-1/2 -translate-x-1/2 w-28 items-center">
        <SubmenuPointerToMain />
      </div>
      <div className="fixed flex flex-wrap top-20 gap-6 p-2 rounded-md w-[31rem] float-left -translate-x-1/2 left-1/2 bg-white">
        {submenu.map((item) => {
          return (
            <SubmenuItem>
              <Heading>
                <b>
                  <u>{item.headerName}</u>
                </b>
              </Heading>
              {item.submenuList.map((item) => {
                return (
                  <Link
                    href={item.link}
                    className="hover:bg-slate-200 rounded-md p-1 "
                  >
                    {item.name}
                  </Link>
                );
              })}
            </SubmenuItem>
          );
        })}
      </div>
    </SubmenuParentDiv>
  );
}
