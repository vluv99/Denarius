import { useGetUserBrowserTheme } from "./theme/themeHooks";
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Navbar } from "./components/Navbar";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { AuthPage } from "./pages/authPages/AuthPage";
import React from "react";
import { AppContexts } from "./contexts/AppContexts";
import {
  useFullUserContext,
  UserContextProvider,
  useUserContext,
} from "./contexts/DBContexts";
import { Loading } from "./pages/LoadingPage/Loading";
import { AppThemeContextProvider } from "./contexts/ThemeContexts";

export default function App() {
  return (
    <AppThemeContextProvider>
      <UserContextProvider>
        <HandleUserLoading />
      </UserContextProvider>
    </AppThemeContextProvider>
  );
}

function HandleUserLoading() {
  const user = useFullUserContext();
  if (user.loading) {
    return <Loading />;
  }

  return (
    <AppContexts>
      <InnerPage />
    </AppContexts>
  );
}

function InnerPage() {
  const user = useUserContext();
  return <>{user ? <RouterProvider router={router} /> : <AuthPage />}</>;
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
