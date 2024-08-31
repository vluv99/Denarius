import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";

type Params = {
  id: string;
  label: string;
  helperText?: string | undefined;
  value: string | undefined;
  moneySign: "Ft" | "$" | "€" | undefined;
  autoComplete: "on" | "off";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  fullWidth: boolean;
  sx?: SxProps<Theme> | undefined;
};

export const CustomMoneyNumberFiled = (params: Params) => {
  const error = params.error ?? false;
  return (
    <FormControl fullWidth={params.fullWidth} sx={params.sx}>
      <InputLabel htmlFor={`${params.id}-id`} error={error}>
        Amount
      </InputLabel>
      <OutlinedInput
        id={`${params.id}-id`}
        name={`${params.id}-id`}
        inputMode="numeric"
        autoComplete={params.autoComplete}
        value={params.value}
        onChange={params.onChange}
        startAdornment={
          params.moneySign ? (
            <InputAdornment position="start">Ft</InputAdornment>
          ) : (
            <></>
          )
        }
        label={params.label}
        error={error}
      />
      {params.helperText ? (
        <FormHelperText error={error}>{params.helperText}</FormHelperText>
      ) : (
        <></>
      )}
    </FormControl>
  );
};
