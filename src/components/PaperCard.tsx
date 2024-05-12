import { Container, /*createTheme,*/ Paper, Typography } from "@mui/material";
import { ReactElement } from "react";

import "../App.css";

interface DashboardCardProps {
  label: string;
  children: ReactElement;
}

export const PaperCard = ({ label, children }: DashboardCardProps) => {
  return (
    <>
      <Paper elevation={4} className="paper-card">
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
