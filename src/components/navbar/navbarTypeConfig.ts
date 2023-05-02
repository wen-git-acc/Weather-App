export type menuList = [];

export type submenuItem = {
  name: string;
  link: string;
};

export type submenu = {
  headerName: string;
  submenuList: submenuItem[];
};

export type menuItem = {
  name: string;
  subMenu: boolean;
  link: string;
  subLink: submenu[];
};
