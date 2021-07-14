import { SideMenuType, Suggestion } from "../@types";
import { SIDE_MENU, TRIM_LENGTH } from "../common/constants";
import moment from "moment";

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

export const validateEmail = (val: string) => {
  const format =
    /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  return !format.test(val);
};

export const validatePassword = () => {};

export const getTime = (timestamp: Suggestion["timestamp"]) => {
  const time = timestamp.seconds * 1000;
  const diff = moment().diff(moment(time), "days");
  if (diff <= 7) {
    return moment(time).fromNow();
  }
  return moment(time).format("D/MMM/YY");
};
