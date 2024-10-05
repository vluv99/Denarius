import { Transaction } from "../../../models/Transaction";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { formatToCurrency, isDateFromLastMonth } from "../../../utils/utils";
import { GridNumberItem } from "../../../components/dashboard/gridNumberItem";
import { useTranslation } from "react-i18next";
import { Savings } from "@mui/icons-material";

export function LastMonthIncome({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { t } = useTranslation();
  const homePrefix = "view.dasboard.";
  const theme = useTheme();

  const [sum, setSum] = useState(0);

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
    <GridNumberItem
      value={`+${formatToCurrency(sum)}`}
      title={t(`${homePrefix}grid_2.label`)}
      color={theme.palette.success.main}
      icon={<Savings />}
    />
  );
}
