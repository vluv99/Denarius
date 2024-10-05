import { Container, /*createTheme,*/ Paper, Typography } from "@mui/material";
import { ReactElement } from "react";

import "../App.css";
import { Padding } from "@mui/icons-material";

interface DashboardCardProps {
  label?: string;
  children: ReactElement;
}

export const PaperCard = ({ label, children }: DashboardCardProps) => {
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          padding: { xs: "10px", sm: "10px", lg: "20px" },
          height: "100%",
        }}
      >
        <Container sx={{ padding: { xs: "10px", sm: "10px" } }}>
          {!label ? (
            <></>
          ) : (
            <Typography
              className="card-label"
              gutterBottom
              //variant="h5"
              component="div"
              sx={{ typography: { xs: "h6", sm: "h6", lg: "h5" } }}
            >
              {label}
            </Typography>
          )}
          <div className="card-content">{children}</div>
        </Container>
      </Paper>
    </>
  );
};
