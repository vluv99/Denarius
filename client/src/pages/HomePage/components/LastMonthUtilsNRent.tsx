import { Transaction } from "../../../models/Transaction";
import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { formatToCurrency, isDateFromLastMonth } from "../../../utils/utils";
import { Category } from "../../../models/CategoryModel";

export function LastMonthUtilsNRent({
  transactions,
  categories,
}: {
  transactions: Transaction[];
  categories: Category[];
}) {
  const [sum, setSum] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    setSum(0);
    if (transactions.length === 0) {
      return;
    }

    const catIDs = categories.filter((c) => c.name === "rent").map((c) => c.id);
    const filtered = transactions.filter(
      (t) => catIDs.includes(t.category) && isDateFromLastMonth(t.date),
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
        color={theme.palette.warning.main}
        component="div"
        sx={{ typography: { xs: "h6", sm: "h5", lg: "h4", xl: "h4" } }}
      >
        {formatToCurrency(sum)}
      </Typography>
    </Box>
  );
}
