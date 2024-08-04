import { darkTheme, lightTheme } from "./Palette";

export const useGetUserBrowserTheme = () => {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? darkTheme
    : lightTheme;
};

export const baseURL = "https://localhost:3000";
