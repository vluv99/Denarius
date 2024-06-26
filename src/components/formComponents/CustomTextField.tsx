import { TextField } from "@mui/material";
import React from "react";

type Params = {
  //id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  helperText?: string | undefined;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  multiline?: boolean;
};

export const CustomTextField = (params: Params) => {
  return (
    <TextField
      //id={params.id + "-textField"}
      label={params.label}
      variant="outlined"
      type={params.type}
      helperText={params.helperText}
      value={params.value}
      onChange={params.onChange}
      sx={{ marginBottom: "4%" }}
      error={params.error}
      multiline={params.multiline}
    />
  );
};
