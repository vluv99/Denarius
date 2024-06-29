import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { Category } from "../../models/CategoryModel";

type Params = {
  id: string;
  label: string;
  helperText?: string | undefined;
  value: string | undefined;
  modelsArray: { name: string; id: string }[];
  onChange: (e: SelectChangeEvent<string>) => void;
  error?: boolean | undefined;
};

export const CustomSelect = (params: Params) => {
  return (
    <FormControl sx={{ width: "25ch" }} variant="outlined">
      <InputLabel id={`${params.id}-label`}>{params.label}</InputLabel>
      <Select
        labelId={`${params.id}-label`}
        id={`${params.id}-select`}
        value={params.value}
        label={params.label}
        onChange={params.onChange}
      >
        {params.modelsArray.map((model, index) => (
          <MenuItem key={"category-select-" + index} value={model.id}>
            {model.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
