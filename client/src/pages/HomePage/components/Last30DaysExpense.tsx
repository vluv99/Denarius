import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { Transaction } from "../../../models/Transaction";
import { useTranslation } from "react-i18next";
import { formatToCurrency, isDateIn30Days } from "../../../utils/utils";
import { GridNumberItem } from "../../../components/dashboard/gridNumberItem";
import { AttachMoney } from "@mui/icons-material";

export function Last30DaysExpense({
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
    <GridNumberItem
      value={formatToCurrency(sum)}
      title={t(`${homePrefix}grid_1.label`)}
      color={theme.palette.error}
      icon={<AttachMoney />}
    />
  );
}
