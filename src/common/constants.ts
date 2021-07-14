export const SIDE_MENU = {
  Login: "/",
  Home: "/dashboard",
  Add: "/add",
} as const;

export const SUGGESTION_TEXT = `It is a long established fact that a reader will be
          distracted by the readable content of a page when
          looking at its layout. The point of using Lorem Ipsum
          is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content
          here', making it look like readable English. Many
          desktop publishing packages and web page editors now
          use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites
          still in their infancy. Various versions have evolved
          over the years, sometimes by accident, sometimes on
          purpose (injected humour and the like).`;

export const TRIM_LENGTH = 300;

export const LOGO_URL =
  "https://gracemethodistchurch.com/wp-content/uploads/2020/12/favicon.png";

export const BG_URL =
  "https://gracemethodistchurch.com/wp-content/uploads/2020/12/zmain-slider-3.jpg";

export enum Roles {
  USER = "user",
  ADMIN = "admin",
}

export const LOGIN_CREDENTIALS = "LOGIN_CREDENTIALS";

export const FORM_LABELS = [
  "Categories",
  "Admins",
  "Organisations",
] as const;
