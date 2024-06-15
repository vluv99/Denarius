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
import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContexts } from "./contexts/AppContexts";
import { UserContextProvider } from "./contexts/DBContexts";
import { User } from "./models/UserModel";
import { getLoggedInUser } from "./services/userService";

export default function App() {
  const theme = useGetUserBrowserTheme();
  const auth = getAuth();

  // const isLoggedIn = false; //this.state.isLoggedIn;

  const [userLoggedIn, setUserLoggedIn] = useState<User | undefined>(undefined);
  // const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  //
  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string,
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //
  //   setSnackbarOpen(false);
  // }; // TODO: Question: figure out how to give back statuses of successful logins etc actions

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let newVar = await getLoggedInUser();
      if (userLoggedIn?.userId !== newVar?.userId) {
        setUserLoggedIn(newVar);
      }
    } else {
      // User is signed out
      setUserLoggedIn(undefined);
    }
  });

  return (
    <UserContextProvider user={userLoggedIn}>
      <AppContexts>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {userLoggedIn ? <RouterProvider router={router} /> : <AuthPage />}
        </ThemeProvider>
      </AppContexts>
    </UserContextProvider>
  );
}

export function Shell() {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          //backgroundColor: (theme) => theme.palette.background.paper,
          flexGrow: 1,
          height: "calc(100% - 65px)",
          // "-o-calc(100% - 65px)" ||
          // "-webkit-calc(100% - 65px)" ||
          // "-moz-calc(100% - 65px)",
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
