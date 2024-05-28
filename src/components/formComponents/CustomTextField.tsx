import { TextField } from "@mui/material";
import React from "react";

type Params = {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CustomTextField = (params: Params) => {
  return (
    <TextField
      id={params.id + "-textField"}
      label={params.label}
      variant="outlined"
      type={params.type}
      value={params.value}
      onChange={params.onChange}
      sx={{ marginBottom: "4%" }}
    />
  );
};

export const textfieldType = {
  text: "text",
};
