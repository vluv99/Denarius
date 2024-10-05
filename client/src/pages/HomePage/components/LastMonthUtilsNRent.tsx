import { Transaction } from "../../../models/Transaction";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { formatToCurrency, isDateFromLastMonth } from "../../../utils/utils";
import { Category } from "../../../models/CategoryModel";
import { GridNumberItem } from "../../../components/dashboard/gridNumberItem";
import { useTranslation } from "react-i18next";
import { House } from "@mui/icons-material";

export function LastMonthUtilsNRent({
  transactions,
  categories,
}: {
  transactions: Transaction[];
  categories: Category[];
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
    <GridNumberItem
      value={formatToCurrency(sum)}
      title={t(`${homePrefix}grid_3.label`)}
      color={theme.palette.warning}
      icon={<House />}
    />
  );
}
