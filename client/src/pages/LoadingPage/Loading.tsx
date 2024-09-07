import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useGetUserBrowserTheme } from "../../theme/themeHooks";

export function Loading() {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress
        size={50}
        sx={{ display: { xs: "block", sm: "none" } }}
      />
      <CircularProgress
        size={80}
        sx={{ display: { xs: "none", sm: "block" } }}
      />
    </Box>
  );
}
