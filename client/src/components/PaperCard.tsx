import { Container, /*createTheme,*/ Paper, Typography } from "@mui/material";
import { ReactElement } from "react";

import "../App.css";
import { Padding } from "@mui/icons-material";

interface DashboardCardProps {
  label: string;
  children: ReactElement;
}

export const PaperCard = ({ label, children }: DashboardCardProps) => {
  return (
    <>
      <Paper elevation={4} sx={{ padding: { xs: "20px 5px", sm: "20px" } }}>
        <Container>
          <Typography
            className="card-label"
            gutterBottom
            variant="h5"
            component="div"
          >
            {label}
          </Typography>
          <div className="card-content">{children}</div>
        </Container>
      </Paper>
    </>
  );
};
