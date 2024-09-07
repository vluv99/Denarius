import { Transaction } from "../../../models/Transaction";
import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
  formatToCurrency,
  isDateFromLastMonth,
  isDateIn30Days,
} from "../../../utils/utils";

export function LastMonthIncome({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [sum, setSum] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setSum(0);
    if (transactions.length === 0) {
      return;
    }

    const filtered = transactions.filter(
      (t) => t.amount > 0 && isDateFromLastMonth(t.date),
    );

    if (filtered.length === 0) {
      return;
    }

    const result = filtered
      .map((t) => t.amount)
      .reduce((sum, num) => sum + num);
    setSum(result);
  }, [transactions]);

  return (
    <Box display={"flex"}>
      <Typography
        color={theme.palette.success.main}
        component="div"
        sx={{ typography: { xs: "h6", sm: "h5", lg: "h4", xl: "h4" } }}
      >
        +{formatToCurrency(sum)}
      </Typography>
    </Box>
  );
}
