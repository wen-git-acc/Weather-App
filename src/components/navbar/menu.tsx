import { menuList } from './navbarMenuConfig';
import styled from 'styled-components';
import Link from 'next/link';
import Submenu from './submenu';
type menuitemType = typeof menuList;

type PropsType = {
  menu: menuitemType;
};

const menuItemColorOnHover: string = '#e2e8f0';

const Button = styled.button``;

const ListUL = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 5;
  align-items: center;
  gap: 15px;
`;

const ReverseTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid black;
  margin-top: 9px;
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
`;

const MenuItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;
// const Example = styled.div`
//   ${ListLi}:hover & {
//     background-color: yellow;
//   }
// `;

const PartitionBar = styled.div`
  background-color: rgb(210, 210, 210);
  height: 25px;
  width: 1px;
`;
export default function Menu({ menu }: PropsType) {
  return (
    <ListUL>
      {menu.map((item, index) => {
        return (
          <>
            {index !== 0 && <PartitionBar></PartitionBar>}
            <ListLi>
              {!item.subMenu && <Link href={item.link}>{item.name}</Link>}
              <MenuItemDiv>
                {item.subMenu && <div>{item.name}</div>}
                {item.subMenu && <ReverseTriangle />}
              </MenuItemDiv>
              {item.subMenu && <Submenu submenu={item.subLink} />}
            </ListLi>
          </>
        );
      })}
    </ListUL>
  );
}

// <ul className="flex gap-5 w-full h-full p-5 items-center">
//   {menu.map((item) => {
//     return (
//       <li className="group relative py-2 px-2 rounded-lg hover:bg-slate-200">
//         {!item.subMenu ? (
//           <Link href={item.link}>{item.name}</Link>
//         ) : (
//           <>
//             <Button>{item.name}</Button>
//             <div className="absolute py-5 invisible group-hover:visible hover:visible">
//               <div>
//                 <div className="bg-white left-2 absolute py-1 mt-1 h-2 w-2 rotate-45"></div>
//               </div>
//               <div className="p-3 mt-2 flex rounded-md bg-white">
//                 {item.subLink.map((subItem) => {
//                   return (
//                     <div>
//                       <h1>{subItem.headerName}</h1>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </>
//         )}
//       </li>
//     );
//   })}
// </ul>
