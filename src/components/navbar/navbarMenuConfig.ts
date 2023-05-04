import { submenu, menuItem } from './navbarTypeConfig';

export const favouritesSubMenu: submenu[] = [
  {
    headerName: 'Location',
    submenuList: [
      {
        name: 'Malaysia',
        link: '/',
      },
      {
        name: 'Malaysia',
        link: '/',
      },
    ],
  },
  {
    headerName: 'Weather',
    submenuList: [
      {
        name: 'Malaysia',
        link: '/',
      },
      {
        name: 'Malaysia',
        link: '/',
      },
    ],
  },
];

export const menuList: menuItem[] = [
  {
    name: 'Home',
    subMenu: false,
    link: '/',
    subLink: [],
  },
  {
    name: 'About',
    subMenu: true,
    link: '/about',
    subLink: favouritesSubMenu,
  },
  {
    name: 'Weather',
    subMenu: false,
    link: '/weather',
    subLink: [],
  },
  {
    name: 'Favourites',
    subMenu: true,
    link: '',
    subLink: favouritesSubMenu,
  },
];
