import { MonoStackerBar } from "../charts/stackedBar/MonoStackerBar";
import { useGetUserBrowserTheme } from "../../theme/consts";
import { Container, Typography } from "@mui/material";
import { useContext } from "react";
//import { TransactionContext } from "../../contex/GlobalState";
import { Transaction } from "../../models/Transaction";
import { users } from "../../models/UserModel";
import { testTransactions } from "../../pages/ListTransactionsPage/TestTransactions";

export function MultiUserBarChartWithData() {
  //const { transactions } = useContext(TransactionContext);
  const transactions = testTransactions;

  const a = summTransactionDataPerUser(transactions, users.user2);
  const b = summTransactionDataPerUser(transactions, users.user1);

  const sum = a.number + b.number;

  const theme = useGetUserBrowserTheme();

  if (a.number < b.number) {
    a.color = theme.palette.secondary.dark;
    b.color = theme.palette.secondary.light;
    a.diff = a.number - sum / 2;
  } else {
    b.color = theme.palette.secondary.dark;
    a.color = theme.palette.secondary.light;
    b.diff = b.number - sum / 2;
  }

  return (
    <span className="stackBarData--container">
      <MonoStackerBar
        data={[
          { value: (a.number / sum) * 100, color: a.color, caption: a.user },
          { value: (b.number / sum) * 100, color: b.color, caption: b.user },
        ]}
        radius={4}
        height={30}
        unit={"%"}
      />
      <Container>
        <Typography variant="body1" component="div">
          {a.user + ": " + currencyFormat(a.number)}
        </Typography>
        <Typography variant="body1" component="div">
          {b.user + ": " + currencyFormat(b.number)}
        </Typography>
        <Typography variant="body1" component="div">
          Difference:{" "}
          {Math.abs(a.diff) > 0
            ? b.user + " owns " + currencyFormat(a.diff) + " to " + a.user
            : a.user + " owns " + currencyFormat(b.diff) + " to " + b.user}{" "}
        </Typography>
      </Container>
    </span>
  );
}

function summTransactionDataPerUser(
  transactions: Transaction[],
  user: string,
): { number: number; color: string; user: string; diff: number } {
  const userTrans = transactions.filter(
    (t: Transaction) => t.user === user && t.amount < 0 && t.isCommon,
  );

  if (userTrans.length > 0) {
    let spent = 0;
    userTrans.map((t: Transaction) => (spent += t.amount));
    return { number: spent, color: "", user: user, diff: 0 };
  }
  return { number: 0, color: "", user: user, diff: 0 };
}

function currencyFormat(num: number) {
  return (
    num
      //.toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Ft"
  );
}
