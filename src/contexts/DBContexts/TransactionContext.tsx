import { createContext, useContext, useEffect, useState } from "react";
import { Transaction } from "../../models/Transaction";
import { ChildrenProp } from "../../utils/types";
import { getTransactionsOfUser } from "../../services/transactionService";
import { User } from "../../models/UserModel";
import { onUserStateChanged } from "../../services/userService";
import { useUserContext } from "./UserContext";

// create context
const TransactionsContext = createContext<Transaction[]>([]);

/**
 * Function body of the React context provider element
 * @param children
 * @constructor
 */
export function TransactionContextProvider({ children }: ChildrenProp) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const currentUser = useUserContext();

  useEffect(() => {
    if (currentUser !== undefined) {
      getTransactionsOfUser(currentUser, setTransactions);
    }
  }, [currentUser]);

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}

/**
 * Return categories collected from DB with a simplified function
 */
export const useTransactionContext = (): Transaction[] => {
  return useContext(TransactionsContext);
};
