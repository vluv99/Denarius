import React from "react";
import { ChildrenProp } from "../utils/types";
import { CategoryContextProvider, UserContextProvider } from "./DBContexts";
import { PaymentMethodContextProvider } from "./DBContexts";
import { TransactionContextProvider } from "./DBContexts/TransactionContext";

/**
 *
 * @param children
 * @constructor
 */
export function AppContexts({ children }: ChildrenProp) {
  return (
    <TransactionContextProvider>
      <CategoryContextProvider>
        <PaymentMethodContextProvider>{children}</PaymentMethodContextProvider>
      </CategoryContextProvider>
    </TransactionContextProvider>
  );
}
