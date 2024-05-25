import { createBrowserRouter } from "react-router-dom";
import App, { Shell } from "../App";
import { Home } from "../pages/HomePage/Home";
import { AddTransaction } from "../pages/AddTransactionPage/AddTransaction";
import { ListTransactions } from "../pages/ListTransactionsPage/ListTransactions";

export const routeAddresses = {
  home: {
    to: "/",
    label: "Dashboard",
  },
  addTransaction: {
    to: "/add-transaction",
    label: "New Transaction",
  },
  listTransactions: {
    to: "/list-transactions",
    label: "List Transactions",
  },
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { path: routeAddresses.home.to, element: <Home /> },
      { path: routeAddresses.addTransaction.to, element: <AddTransaction /> },
      {
        path: routeAddresses.listTransactions.to,
        element: <ListTransactions />,
      },
    ],
  },
]);
