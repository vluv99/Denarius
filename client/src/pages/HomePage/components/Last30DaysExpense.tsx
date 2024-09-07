import { useEffect, useState } from "react";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import firebase from "firebase/compat";
import { Transaction } from "../../../models/Transaction";
import { useTranslation } from "react-i18next";
import { formatToCurrency, isDateIn30Days } from "../../../utils/utils";

export function Last30DaysExpense({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(0);
    if (transactions.length === 0) {
      return;
    }

    const filtered = transactions.filter(
      (t) => t.amount < 0 && isDateIn30Days(t.date),
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
        color="error"
        component="div"
        sx={{ typography: { xs: "h6", sm: "h5", lg: "h4", xl: "h4" } }}
      >
        {formatToCurrency(sum)}
      </Typography>
    </Box>
  );
}
