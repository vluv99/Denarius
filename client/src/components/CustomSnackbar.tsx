import React, { MouseEventHandler } from "react";
import { Alert, Snackbar, SnackbarCloseReason, useTheme } from "@mui/material";

type Params = {
  severity: "success" | "info" | "warning" | "error" | undefined;
  infoText: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CustomSnackbar(params: Params) {
  const theme = useTheme();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    params.setOpen(false);
  };
  return (
    <Snackbar open={params.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={params.severity}
        variant="filled"
        sx={{ width: "100%", color: theme.palette.text.primary }}
      >
        {params.infoText}
      </Alert>
    </Snackbar>
  );
}
