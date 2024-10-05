import {
  Box,
  Container,
  PaletteColor,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactElement } from "react";

export function GridNumberItem({
  value,
  title,
  color,
  icon,
}: {
  value: string;
  title: string;
  color: PaletteColor;
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
          component="div"
          sx={{
            typography: { xs: "h6", sm: "h5", lg: "h4", xl: "h4" },
            background: `-webkit-linear-gradient(45deg, ${color.light} 20%, ${color.main} 45%, ${color.dark} 85%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold!important",
          }}
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
