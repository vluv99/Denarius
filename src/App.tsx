import { useGetUserBrowserTheme } from "./theme/consts";
import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Navbar } from "./components/Navbar";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { AuthPage } from "./pages/authPages/AuthPage";
import React, { Suspense, useContext } from "react";
import { AppContexts } from "./contexts/AppContexts";
import {
  useFullUserContext,
  UserContextProvider,
  useUserContext,
} from "./contexts/DBContexts";

function HandleUserLoading() {
  const user = useFullUserContext();
  const theme = useGetUserBrowserTheme();

  if (user.loading) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <AppContexts>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <InnerPage />
      </ThemeProvider>
    </AppContexts>
  );
}

export default function App() {
  return (
    <UserContextProvider>
      <HandleUserLoading />
    </UserContextProvider>
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
