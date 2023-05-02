import { menuList } from './navbarMenuConfig';
import styled from 'styled-components';
import Link from 'next/link';
type menuitemType = typeof menuList;

type PropsType = {
  menu: menuitemType;
};

const Button = styled.button``;

export default function Navlink({ menu }: PropsType) {
  return (
    <ul className="flex gap-5 w-full h-full p-5 items-center">
      {menu.map((item) => {
        return (
          <li className="group relative py-2 px-2 rounded-lg hover:bg-slate-200">
            {!item.subMenu ? (
              <Link href={item.link}>{item.name}</Link>
            ) : (
              <>
                <Button>{item.name}</Button>
                <div className="absolute py-5 invisible group-hover:visible hover:visible">
                  <div>
                    <div className="bg-white left-2 absolute py-1 mt-1 h-2 w-2 rotate-45"></div>
                  </div>
                  <div className="p-3 mt-2 flex rounded-md bg-white">
                    {item.subLink.map((subItem) => {
                      return (
                        <div>
                          <h1>{subItem.headerName}</h1>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
