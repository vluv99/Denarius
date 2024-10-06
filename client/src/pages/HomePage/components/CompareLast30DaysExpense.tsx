import { Transaction } from "../../../models/Transaction";
import { User, users } from "../../../models/UserModel";
import { useGetUserBrowserTheme } from "../../../theme/themeHooks";
import { MonoStackerBar } from "../../../components/charts/stackedBar/MonoStackerBar";
import { Container, Typography, useTheme } from "@mui/material";
import { formatToCurrency, isDateIn30Days } from "../../../utils/utils";
import { useTranslation } from "react-i18next";

export function CompareLast30DaysExpense({
  transactions,
  currentUser,
}: {
  transactions: Transaction[];
  currentUser: User;
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const homeGridPrefix = "view.dasboard.grid_5.";

  const expense = Math.abs(
    transactions
      .filter((t) => t.amount < 0 && isDateIn30Days(t.date))
      .map((t) => t.amount)
      .reduce((sum, num) => sum + num, 0),
  );
  const income = transactions
    .filter((t) => t.amount > 0 && isDateIn30Days(t.date))
    .map((t) => t.amount)
    .reduce((sum, num) => sum + num, 0);

  const a = { amount: expense, color: "", caption: "", percentage: 0 };
  const b = { amount: income, color: "", caption: "", percentage: 0 };
  let sum = 0;

  if (expense < income) {
    a.color = theme.palette.secondary.dark;
    b.color = theme.palette.secondary.light;

    a.percentage = 0.09; //Math.round((expense / income) * 100) / 100;
    b.percentage = 1 - a.percentage;
    a.caption = t(`${homeGridPrefix}expenseCaption`);
    b.caption = t(`${homeGridPrefix}incomeCaption`);
  } else {
    b.color = theme.palette.secondary.dark;
    a.color = theme.palette.secondary.light;
    b.percentage = expense - income;
    sum = expense;

    a.caption = t(`${homeGridPrefix}incomeCaption`);
    b.caption = t(`${homeGridPrefix}expenseCaption`);
  }

  return (
    <span className="stackBarData--container">
      <MonoStackerBar
        data={[
          {
            value: a.percentage * 100,
            color: a.color,
            caption: a.caption,
          },
          {
            value: b.percentage * 100,
            color: b.color,
            caption: b.caption,
          },
        ]}
        radius={4}
        height={30}
        unit={"%"}
        labelColor={theme.palette.text.primary}
      />
      <Container>
        {/*<Typography variant="body1" component="div">*/}
        {/*  {a.user + ": " + formatToCurrency(a.amount)}*/}
        {/*</Typography>*/}
        {/*<Typography variant="body1" component="div">*/}
        {/*  {b.user + ": " + formatToCurrency(b.amount)}*/}
        {/*</Typography>*/}
        {/*<Typography variant="body1" component="div">*/}
        {/*  Difference:{" "}*/}
        {/*  {Math.abs(a.diff) > 0*/}
        {/*    ? b.user + " owns " + formatToCurrency(a.diff) + " to " + a.user*/}
        {/*    : a.user +*/}
        {/*      " owns " +*/}
        {/*      formatToCurrency(b.diff) +*/}
        {/*      " to " +*/}
        {/*      b.user}{" "}*/}
        {/*</Typography>*/}
      </Container>
    </span>
  );
}
