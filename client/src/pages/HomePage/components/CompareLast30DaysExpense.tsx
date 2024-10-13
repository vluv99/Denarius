import { Transaction } from "../../../models/Transaction";
import { User, users } from "../../../models/UserModel";
import { useGetUserBrowserTheme } from "../../../theme/themeHooks";
import { MonoStackerBar } from "../../../components/charts/stackedBar/MonoStackerBar";
import { Box, Container, Typography, useTheme } from "@mui/material";
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
  const {
    t,
    i18n: { language },
  } = useTranslation();
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

  let subText = "";
  const from = new Date(
    new Date().setDate(new Date().getDate() - 30),
  ).toLocaleDateString(language.includes("hu") ? "hu-HU" : "en-US", {
    day: "2-digit",
    month: "short",
  });
  const till = new Date().toLocaleDateString(
    language.includes("hu") ? "hu-HU" : "en-US",
    {
      day: "2-digit",
      month: "short",
    },
  );
  if (expense < income) {
    a.color = theme.palette.secondary.dark;
    b.color = theme.palette.secondary.light;

    a.percentage = Math.round((expense / income) * 100) / 100;
    b.percentage = 1 - a.percentage;
    a.caption = t(`${homeGridPrefix}expenseCaption`);
    b.caption = t(`${homeGridPrefix}incomeCaption`);
    subText = t(`${homeGridPrefix}subtext_moreIncome`, {
      from: from,
      till: till,
      spentPercentage: a.percentage * 100,
      incomePercentage: b.percentage * 100,
    });
  } else {
    b.color = theme.palette.secondary.dark;
    a.color = theme.palette.secondary.light;
    b.percentage = Math.round((income / expense) * 100) / 100;
    a.percentage = 1 - b.percentage;
    sum = expense;

    a.caption = t(`${homeGridPrefix}incomeCaption`);
    b.caption = t(`${homeGridPrefix}expenseCaption`);
    subText = t(`${homeGridPrefix}subtext_moreExpense`, {
      from: from,
      till: till,
      differencePercentage: (b.percentage - a.percentage) * 100,
    });
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: { xs: "10px", sm: "10px" },
      }}
    >
      <Typography variant="h6" component="div">
        {t(`${homeGridPrefix}label`)}
      </Typography>
      <Box
        className="stackBarData--container"
        sx={{ width: "100%", paddingY: "2%" }}
      >
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
      </Box>
      <Typography
        variant="caption"
        component="div"
        color={theme.palette.text.disabled}
      >
        {subText}
      </Typography>
    </Container>
  );
}
