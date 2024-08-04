import { IconButton, ThemeProvider, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { AppThemeContext } from "../contexts/ThemeContexts";

export function ThemeSwitch() {
  const theme = useTheme();
  const toggle = useContext(AppThemeContext);

  const toggleTheme = () => {
    toggle.toggleColorMode();
  };

  return (
    <>
      <IconButton onClick={toggleTheme}>
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </>
  );
}
