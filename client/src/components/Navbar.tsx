import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerComponent } from "./DrawerComponent";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { routeAddresses } from "../routes/Routes";
import { AccountCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { LanguageSwitch } from "./LanguageSwitch";
import { ThemeSwitch } from "./ThemeSwitch";

export function Navbar() {
  const { t } = useTranslation();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" component="div">
            <Typography variant="h6">
              <Link to={routeAddresses.home.to}>{t("websiteName")}</Link>
            </Typography>
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
              <DrawerComponent setOpenDrawer={setOpenDrawer}></DrawerComponent>
            </Drawer>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <ThemeSwitch />

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <LanguageSwitch />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
