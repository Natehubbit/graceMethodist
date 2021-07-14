import {
  SIDE_MENU,
  Roles,
  FORM_LABELS,
} from "../common/constants";

export interface Menu {}
export type SideMenuType = keyof typeof SIDE_MENU;
export interface OptionsType {
  categories: string[];
  organisations: string[];
}

export interface Suggestion {
  age: string;
  organisation: string;
  category: string;
  suggestion: string;
  timestamp: { seconds: number; nanoseconds: number };
}

export interface LoginForm {
  email: string | null;
  password: string | null;
  remember?: boolean;
}

export interface UserType {
  id?: string;
  email: string;
  username: string;
  role: "user" | "admin";
  timestamp: string;
}

export interface IModal {
  data: any[];
  header?: typeof FORM_LABELS[number];
  show: boolean;
  loading?: boolean;
  error?: string;
}
