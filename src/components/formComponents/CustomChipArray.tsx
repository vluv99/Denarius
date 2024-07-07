import { Avatar, Box, Chip, InputLabel, ListItem } from "@mui/material";
import React, { MouseEventHandler } from "react";

type Params = {
  id: string;
  label: string;
  helperText?: string | undefined;
  value: string | undefined;
  modelsArray: { username: string; key: string }[];
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
        component="ul"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
        }}
      >
        {params.modelsArray.map((data, index) => {
          let icon;
          let avatar = data.username
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .toUpperCase()
            .substring(0, 2);

          // TODO: add profilePic to user and check if exists, otherwise return name letters
          // if (data.profilePic) {
          //   //icon = <AccountCircle />;
          // }

          return (
            <ListItem key={index}>
              <Chip
                //icon={icon}
                label={data.username}
                variant={data.key === params.value ? "filled" : "outlined"}
                avatar={<Avatar>{avatar}</Avatar>}
                onClick={() => params.onChange(data.key)}
                // onDelete={
                //   data.name === "React" ? undefined : handleDelete(data)
                // }
              />
            </ListItem>
          );
        })}
      </Box>
    </Box>
  );
};
