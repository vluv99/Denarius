import { Avatar, Box, Chip, InputLabel, ListItem } from "@mui/material";
import React, { ReactElement } from "react";

type Params = {
  id: string;
  label: string;
  helperText?: string | undefined;
  value: string | undefined;
  modelsArray: {
    chipLabel: string;
    key: string;
    avatar: string | undefined;
    icon: ReactElement<any, any> | undefined;
  }[];
  onChange: (usernamme: string) => void;
  error?: boolean | undefined;
};

export const CustomChipArray = (params: Params) => {
  const error = params.error ?? false;
  return (
    <Box>
      <InputLabel id={`${params.id}-label`} error={error}>
        {params.label}
      </InputLabel>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        {params.modelsArray.map((data, index) => {
          const avatar = data.avatar ? (
            <Avatar>{data.avatar}</Avatar>
          ) : undefined;
          const isSelected = data.key === params.value;
          return (
            <Box key={index} sx={{ margin: "0.2em" }}>
              <Chip
                icon={data.icon}
                label={data.chipLabel}
                variant={isSelected ? "filled" : "outlined"}
                color={isSelected ? "secondary" : "default"}
                avatar={avatar}
                onClick={() => params.onChange(data.key)}
                // onDelete={
                //   data.name === "React" ? undefined : handleDelete(data)
                // }
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
