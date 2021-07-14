import { SideMenuType } from "../@types";
import { SIDE_MENU, TRIM_LENGTH } from "../common/constants";

export const trimText = (text: string) => {
  if (text.length > TRIM_LENGTH) {
    return { trimmed: true, text: text.slice(0, TRIM_LENGTH) };
  }
  return { trimmed: false, text };
};

export const getActiveByRoute = (route: string) => {
  let activeRoute: SideMenuType = "Home";
  Object.keys(SIDE_MENU).forEach((key) => {
    if (SIDE_MENU[key as SideMenuType] === route) {
      activeRoute = key as SideMenuType;
    }
  });
  return activeRoute;
};

export const storeItem = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const deleteStoredItem = (key: string) => {
  localStorage.removeItem(key);
};

export const getStoredItem = (key: string) => {
  return localStorage.getItem(key);
};

export const validateEmail = () => {};

export const validatePassword = () => {};
