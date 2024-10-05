import { Box, Container, Typography, useTheme } from "@mui/material";
import { ReactElement } from "react";

export function GridNumberItem({
  value,
  title,
  color,
  icon,
}: {
  value: string;
  title: string;
  color: string;
  icon: ReactElement<any, any>;
}) {
  const theme = useTheme();
  return (
    <Container sx={{ padding: { xs: "10px", sm: "10px" } }}>
      <Box
        display={"flex"}
        sx={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <Typography
          color={color}
          component="div"
          sx={{ typography: { xs: "h6", sm: "h5", lg: "h4", xl: "h4" } }}
        >
          {value}
        </Typography>
        <Typography
          color={theme.palette.text.disabled}
          component="div"
          sx={{ typography: "subtitle2", textAlign: "start" }}
        >
          {/*{icon}*/}
          {title}
        </Typography>
      </Box>
    </Container>
  );
}
