import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import React, { MouseEventHandler } from "react";

type Params = {
  label: string;
  helperText?: string | undefined;
  value: boolean;
  onChange: MouseEventHandler<HTMLButtonElement>;
  error?: boolean | undefined;
};

export const CustomCheckbox = (params: Params) => {
  return (
    <FormControlLabel
      label="Is common expense?"
      control={
        <Checkbox
          color="secondary"
          checked={params.value}
          onClick={params.onChange}
        />
      }
    />
  );
};
