import { useGetUserBrowserTheme } from "./theme/consts";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Navbar } from "./components/Navbar";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { ContextProvider } from "./contexts/Context";

export default function App() {
  const theme = useGetUserBrowserTheme();
  const isLoggedIn = true; //this.state.isLoggedIn;

  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          isLoggedIn ? (
            <RouterProvider router={router} />
          ) : (
            <div>not logged in :(</div>
          ) /*TODO: create login page*/
        }
      </ThemeProvider>
    </ContextProvider>
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
