import { menuList } from './navbarMenuConfig';
import styled from 'styled-components';
import Link from 'next/link';
import Submenu, { SubmenuPointerToMain } from './submenu';

type menuitemType = typeof menuList;

type PropsType = {
  menu: menuitemType;
};

const menuItemColorOnHover = '#e2e8f0';

const ListUL = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  flex-direction: row;
  @media (max-width: 640px) {
    border-top: 5px solid black;
    flex-direction: column;
    background-color: white;
  }
`;

const ReverseTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 9px solid black;
  margin-top: 15px;
`;

export const ListLi = styled.li`
  font-size: 14px;
  position: relative;
  padding: 6px;
  border-radius: 6px;
  transition: background-color 0.5s linear;
  &:hover {
    background-color: ${menuItemColorOnHover};
  }

  &:hover ${ReverseTriangle} {
    margin-top: 10px;
  }

  @media (max-width: 640px) {
    font-size: 25px;
  }
`;

const MenuItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
  margin: auto;
  text-align: center;
`;

const PartitionBar = styled.div`
  background-color: rgb(210, 210, 210);
  height: 25px;
  width: 1px;
  margin-left: 5px;
  margin-right: 5px;
  @media (max-width: 640px) {
    display: none;
  }
`;

export const ListDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SubMenuPointerDiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 7rem;
  align-items: center;
  @media (max-width: 640px) {
    display: none;
  }
`;

export default function Menu({ menu }: PropsType) {
  return (
    <ListUL>
      {menu.map((item, index) => {
        return (
          <ListDiv key={index}>
            {index !== 0 && <PartitionBar />}
            <ListLi>
              {!item.subMenu && <Link href={item.link}>{item.name}</Link>}
              <MenuItemDiv>
                {item.subMenu && <div>{item.name}</div>}
                {item.subMenu && <ReverseTriangle />}
              </MenuItemDiv>
              {item.subMenu && (
                <SubMenuPointerDiv>
                  <SubmenuPointerToMain />
                </SubMenuPointerDiv>
              )}
            </ListLi>
            {item.subMenu && <Submenu submenu={item.subLink} />}
          </ListDiv>
        );
      })}
    </ListUL>
  );
}
