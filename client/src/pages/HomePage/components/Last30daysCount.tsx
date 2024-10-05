import { Transaction } from "../../../models/Transaction";
import { useEffect, useState } from "react";
import { isDateIn30Days } from "../../../utils/utils";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { GridNumberItem } from "../../../components/dashboard/gridNumberItem";
import { Addchart } from "@mui/icons-material";

export function Last30daysCount({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const { t } = useTranslation();
  const homeGridPrefix = "view.dasboard.grid_4.";
  const theme = useTheme();

  const [sum, setSum] = useState(0);

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
    <GridNumberItem
      value={sum + " " + t(`${homeGridPrefix}countSuffix`)}
      title={t(`${homeGridPrefix}label`)}
      color={theme.palette.info.main}
      icon={<Addchart />}
    />
  );
}
