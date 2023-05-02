import { submenu, menuItem } from './navbarTypeConfig';

const favouritesSubMenu: submenu[] = [
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
    subMenu: false,
    link: '/about',
    subLink: [],
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
