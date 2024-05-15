import { List, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import { DrawerButton } from "./DrawerButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { routeAddresses } from "../routes/Routes";
import { projectName, websiteName } from "../theme/consts";
import Divider from "@mui/material/Divider";

interface Props {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  staysOpenOnClick?: boolean;
}
export const DrawerComponent = ({
  setOpenDrawer,
  staysOpenOnClick = false,
}: Props) => {
  const onClick = () => setOpenDrawer(staysOpenOnClick);
  return (
    <>
      <Link to={routeAddresses.home.to} onClick={onClick}>
        <Paper elevation={3} square={true}>
          <div
            className="drawerLogoContainer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "18px 10px 8px 10px",
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 100 }} />
            <Typography gutterBottom variant="h6" component="div">
              {websiteName}
            </Typography>
            <Divider orientation="horizontal" variant="middle" flexItem />
            <div>
              <Typography gutterBottom variant="caption" component="i">
                of {projectName} Production
              </Typography>
            </div>
          </div>
        </Paper>
      </Link>

      <List>
        <DrawerButton
          icon={<DashboardIcon />}
          label={routeAddresses.home.label}
          to={routeAddresses.home.to}
          onClick={onClick}
        />

        <DrawerButton
          icon={<PlaylistAddIcon />}
          label={routeAddresses.addTransaction.label}
          to={routeAddresses.addTransaction.to}
          onClick={onClick}
        />

        <DrawerButton
          icon={<ViewListIcon />}
          label={routeAddresses.listTransactions.label}
          to={routeAddresses.listTransactions.to}
          onClick={onClick}
        />
      </List>
    </>
  );
};
