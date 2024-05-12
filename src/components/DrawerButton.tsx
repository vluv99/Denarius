import React, { ReactElement } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  icon: ReactElement;
  label: string;
  to: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export function DrawerButton({ icon, label, to, onClick }: Props) {
  const navigate = useNavigate();
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(e);
    navigate(to);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickHandler}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
