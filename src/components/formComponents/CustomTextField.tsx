import { TextField } from "@mui/material";
import React from "react";
import firebase from "firebase/compat";
import functions = firebase.functions;

export const CustomTextField = (
  id: string,
  label: string,
  type: string,
  value: string,
  setFunction: React.SetStateAction<any>,
) => {
  return (
    <TextField
      id={id + "-textField"}
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={(e) => setFunction(e.target.value)}
    />
  );
};

export const textfieldType = {
  text: "text",
};
