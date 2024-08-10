import { SxProps, TextField, Theme } from "@mui/material";
import React, { HTMLInputAutoCompleteAttribute } from "react";

type Params = {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  helperText?: string | undefined;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  multiline?: boolean;
  fullWidth: boolean;
  sx?: SxProps<Theme> | undefined;
  autoComplete: HTMLInputAutoCompleteAttribute;
};

export const CustomTextField = (params: Params) => {
  return (
    <TextField
      //id={params.id + "-textField"}
      label={params.label}
      name={params.id}
      variant="outlined"
      type={params.type}
      helperText={params.helperText}
      value={params.value}
      onChange={params.onChange}
      //sx={{ marginBottom: "4%" }}
      error={params.error}
      multiline={params.multiline}
      minRows={params.multiline ? 2 : 0}
      fullWidth={params.fullWidth}
      sx={params.sx}
      inputProps={{
        autoComplete: params.autoComplete,
      }}
    />
  );
};
