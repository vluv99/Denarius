import { useGetUserBrowserTheme } from "./theme/consts";
import {
  Alert,
  Box,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Navbar } from "./components/Navbar";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { AuthPage } from "./pages/authPages/AuthPage";
import React, {useEffect, useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContexts } from "./contexts/AppContexts";
import {UserContextProvider, useUserContext} from "./contexts/DBContexts";
import { User } from "./models/UserModel";
import { getLoggedInUser } from "./services/userService";

export default function App() {
  const theme = useGetUserBrowserTheme();

  return (
    <UserContextProvider>
      <AppContexts>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <InnerPage />
        </ThemeProvider>
      </AppContexts>
    </UserContextProvider>
  );
}

function InnerPage() {
  const user = useUserContext();
  return(
    <>
      {user ? <RouterProvider router={router} /> : <AuthPage />}
    </>
  )
}

export function Shell() {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "calc(100% - 65px)",
          overflow: "auto",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Outlet />
        </LocalizationProvider>
      </Box>
    </>
  );
}
