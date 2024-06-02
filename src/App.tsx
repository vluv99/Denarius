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

export default function App() {
  const theme = useGetUserBrowserTheme();
  const auth = getAuth();

  // const isLoggedIn = false; //this.state.isLoggedIn;

  const [loggedIn, setLoggedIn] = useState(false);
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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //TODO: Question: set context data fro user info to be available everywhere or nah just call the func?

      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setLoggedIn(true);
      //setSnackbarOpen(true);
    } else {
      // User is signed out
      setLoggedIn(false);
      //setSnackbarOpen(true);
    }
  });

  return (
    <AppContexts>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loggedIn ? <RouterProvider router={router} /> : <AuthPage />}
        {/*<Snackbar*/}
        {/*  open={snackbarOpen}*/}
        {/*  autoHideDuration={3000}*/}
        {/*  onClose={handleClose}*/}
        {/*>*/}
        {/*  <Alert*/}
        {/*    onClose={handleClose}*/}
        {/*    severity="success"*/}
        {/*    variant="filled"*/}
        {/*    sx={{ width: "100%" }}*/}
        {/*  >*/}
        {/*    Successful event!*/}
        {/*  </Alert>*/}
        {/*</Snackbar>*/}
      </ThemeProvider>
    </AppContexts>
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
