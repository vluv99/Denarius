import React from "react";
import { ChildrenProp } from "../utils/types";
import { CategoryContextProvider, UserContextProvider } from "./DBContexts";
import { PaymentMethodContextProvider } from "./DBContexts";

/**
 *
 * @param children
 * @constructor
 */
export function AppContexts({ children }: ChildrenProp) {
  return (
    <CategoryContextProvider>
      <PaymentMethodContextProvider>{children}</PaymentMethodContextProvider>
    </CategoryContextProvider>
  );
}
