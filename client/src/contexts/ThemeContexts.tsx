import React, { createContext, useEffect, useState } from "react";
import {
  CssBaseline,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { ChildrenProp } from "../utils/types";
import { darkTheme, lightTheme } from "../theme/Palette";

// Most certainly this context exists at all time, so init can be null!
export const AppThemeContext = createContext<{ toggleColorMode: () => void }>(
  null!,
);

export function AppThemeContextProvider({ children }: ChildrenProp) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "dark" || "light";
  const storedTheme = localStorage.getItem("theme");
  const initState = storedTheme
    ? storedTheme === "dark"
      ? "dark"
      : "light"
    : prefersDarkMode;

  const [mode, setMode] = useState<"light" | "dark">(initState);
  const [theme, setTheme] = useState<Theme>(
    initState === "dark" ? darkTheme : lightTheme,
  );

  useEffect(() => {
    if (mode === "dark") {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    } else {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <AppThemeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
