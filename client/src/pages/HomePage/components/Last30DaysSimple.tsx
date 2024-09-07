import { useEffect, useState } from "react";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import firebase from "firebase/compat";
import { Transaction } from "../../../models/Transaction";
import { useTranslation } from "react-i18next";

export function Last30DaysSimple({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [filteredSum, setFilteredSum] = useState(0);

  useEffect(() => {
    setFilteredSum(0);
    const result = transactions
      .map((t) => t.amount)
      .reduce((sum, num) => sum + num);
    setFilteredSum(result);
  }, [transactions]);

  return (
    <Box display={"flex"}>
      <Typography
        color="error"
        component="div"
        sx={{ typography: { xs: "h6", sm: "h5", lg: "h4", xl: "h4" } }}
      >
        {filteredSum}
      </Typography>
    </Box>
  );
}
