import { Transaction } from "../../../models/Transaction";
import { useEffect, useState } from "react";
import { formatToCurrency, isDateIn30Days } from "../../../utils/utils";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Last30daysCount({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { t } = useTranslation();
  const homeGridPrefix = "view.dasboard.grid_4.";

  const [sum, setSum] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setSum(0);
    if (transactions.length === 0) {
      return;
    }

    const filtered = transactions.filter((t) => isDateIn30Days(t.date));

    if (filtered.length === 0) {
      return;
    }

    const result = filtered.length;
    setSum(result);
  }, [transactions]);

  return (
    <Box display={"flex"}>
      <Typography
        color={theme.palette.info.main}
        component="div"
        sx={{ typography: { xs: "h6", sm: "h5", lg: "h4", xl: "h4" } }}
      >
        {sum + " " + t(`${homeGridPrefix}countSuffix`)}
      </Typography>
    </Box>
  );
}
